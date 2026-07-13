const { sql } = require('@vercel/postgres');

async function ensureTable() {
  await sql`
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
      const { name, company, email, business, website, need, recommendedPackage } = req.body || {};

      if (!name || !email) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      await ensureTable();
      await sql`
        INSERT INTO leads (name, company, email, business, website_status, need, recommended_package)
        VALUES (${name}, ${company || null}, ${email}, ${business || null}, ${website || null}, ${need || null}, ${recommendedPackage || null})
      `;

      res.status(200).json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
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
      await ensureTable();
      const { rows } = await sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT 200`;
      res.status(200).json({ leads: rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
    return;
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end('Method Not Allowed');
};
