const { neon } = require('@neondatabase/serverless');

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
      business TEXT,
      website_status TEXT,
      need TEXT,
      recommended_package TEXT
    )
  `;
}

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const sqlClient = getSql();
      const { name, company, email, business, website, need, recommendedPackage } = req.body || {};

      if (!name || !email) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      await ensureTable(sqlClient);
      await sqlClient`
        INSERT INTO leads (name, company, email, business, website_status, need, recommended_package)
        VALUES (${name}, ${company || null}, ${email}, ${business || null}, ${website || null}, ${need || null}, ${recommendedPackage || null})
      `;

      res.status(200).json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error', detail: err.message });
    }
    return;
  }

  if (req.method === 'GET') {
    const token = req.query.token;
    if (!token || token !== process.env.ADMIN_TOKEN) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    try {
      const sqlClient = getSql();
      await ensureTable(sqlClient);
      const rows = await sqlClient`SELECT * FROM leads ORDER BY created_at DESC LIMIT 200`;
      res.status(200).json({ leads: rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error', detail: err.message });
    }
    return;
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end('Method Not Allowed');
};
