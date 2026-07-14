import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING;

let sql;
function getSql() {
  if (!sql) {
    if (!connectionString) {
      throw new Error('No database connection string found in environment variables');
    }
    sql = neon(connectionString);
  }
  return sql;
}

async function ensureTable(sqlClient) {
  await sqlClient`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT now(),
      name TEXT NOT NULL,
      company TEXT,
      email TEXT NOT NULL,
      phone TEXT,
      availability TEXT,
      business TEXT,
      website_status TEXT,
      need TEXT,
      recommended_package TEXT,
      lang TEXT,
      message TEXT,
      source TEXT
    )
  `;
  await sqlClient`ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone TEXT`;
  await sqlClient`ALTER TABLE leads ADD COLUMN IF NOT EXISTS availability TEXT`;
  await sqlClient`ALTER TABLE leads ADD COLUMN IF NOT EXISTS lang TEXT`;
  await sqlClient`ALTER TABLE leads ADD COLUMN IF NOT EXISTS message TEXT`;
  await sqlClient`ALTER TABLE leads ADD COLUMN IF NOT EXISTS source TEXT`;
}

export async function POST(request) {
  try {
    const sqlClient = getSql();
    const body = await request.json();
    const { name, company, email, phone, availability, business, website, need, recommendedPackage, lang, message, source } = body || {};

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await ensureTable(sqlClient);
    await sqlClient`
      INSERT INTO leads (name, company, email, phone, availability, business, website_status, need, recommended_package, lang, message, source)
      VALUES (${name}, ${company || null}, ${email}, ${phone || null}, ${availability || null}, ${business || null}, ${website || null}, ${need || null}, ${recommendedPackage || null}, ${lang || null}, ${message || null}, ${source || null})
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error', detail: err.message }, { status: 500 });
  }
}

export async function GET(request) {
  const token = request.nextUrl.searchParams.get('token');
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sqlClient = getSql();
    await ensureTable(sqlClient);
    const rows = await sqlClient`SELECT * FROM leads ORDER BY created_at DESC LIMIT 200`;
    return NextResponse.json({ leads: rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error', detail: err.message }, { status: 500 });
  }
}
