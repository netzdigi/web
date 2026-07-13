const { Pool } = require('pg');

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING;

let pool;
function getPool() {
  if (!pool) {
    if (!connectionString) {
      throw new Error('No database connection string found in environment variables');
    }
    pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  }
  return pool;
}

async function ensureTable(client) {
  await client.query(`
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
  `);
}

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    let client;
    try {
      const { name, company, email, business, website, need, recommendedPackage } = req.body || {};

      if (!name || !email) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      client = await getPool().connect();
      await ensureTable(client);
      await client.query(
        `INSERT INTO leads (name, company, email, business, website_status, need, recommended_package)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [name, company || null, email, business || null, website || null, need || null, recommendedPackage || null]
      );

      res.status(200).json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error', detail: err.message });
    } finally {
      if (client) client.release();
    }
    return;
  }

  if (req.method === 'GET') {
    const token = req.query.token;
    if (!token || token !== process.env.ADMIN_TOKEN) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    let client;
    try {
      client = await getPool().connect();
      await ensureTable(client);
      const { rows } = await client.query('SELECT * FROM leads ORDER BY created_at DESC LIMIT 200');
      res.status(200).json({ leads: rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error', detail: err.message });
    } finally {
      if (client) client.release();
    }
    return;
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end('Method Not Allowed');
};
