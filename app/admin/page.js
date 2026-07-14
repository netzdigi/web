'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');
  const [leads, setLeads] = useState(null);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('adminToken');
    if (saved) {
      setToken(saved);
    }
  }, []);

  async function loadLeads(tokenValue) {
    const t = (tokenValue ?? token).trim();
    if (!t) {
      setStatus('Моля, въведете административния код.');
      return;
    }
    localStorage.setItem('adminToken', t);
    setStatus('Зареждане...');

    try {
      const res = await fetch(`/api/lead?token=${encodeURIComponent(t)}`);
      if (res.status === 401) {
        setStatus('Грешен код.');
        setLeads(null);
        return;
      }
      if (!res.ok) throw new Error('Request failed');

      const data = await res.json();
      setLeads(data.leads);
      setAuthed(true);
      setStatus(data.leads.length ? '' : 'Все още няма постъпили заявки.');
    } catch (err) {
      setStatus('Възникна грешка при зареждането.');
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('adminToken');
    if (saved) loadLeads(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="bg-mesh" aria-hidden="true" />
      <div className="admin-wrap">
        <div className="admin-header">
          <h1 className="section-title" style={{ margin: 0 }}>Постъпили заявки</h1>
          {authed && (
            <button type="button" className="btn btn-ghost" onClick={() => loadLeads()}>Презареди</button>
          )}
        </div>

        {!authed && (
          <div className="admin-auth">
            <div className="form-row">
              <label htmlFor="tokenInput">Административен код</label>
              <input
                id="tokenInput"
                type="password"
                placeholder="Въведете ADMIN_TOKEN"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') loadLeads(); }}
              />
            </div>
            <button type="button" className="btn btn-primary btn-block" onClick={() => loadLeads()}>Зареди заявките</button>
          </div>
        )}

        <p className="admin-status">{status}</p>

        {authed && leads && leads.length > 0 && (
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Език</th>
                  <th>Име</th>
                  <th>Фирма</th>
                  <th>Имейл</th>
                  <th>Телефон</th>
                  <th>На разположение</th>
                  <th>Бизнес</th>
                  <th>Уебсайт</th>
                  <th>Нужда</th>
                  <th>Препоръчан пакет</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{new Date(lead.created_at).toLocaleString('bg-BG')}</td>
                    <td>{(lead.lang || '—').toUpperCase()}</td>
                    <td className="strong">{lead.name}</td>
                    <td>{lead.company || '—'}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone || '—'}</td>
                    <td>{lead.availability || '—'}</td>
                    <td>{lead.business || '—'}</td>
                    <td>{lead.website_status || '—'}</td>
                    <td>{lead.need || '—'}</td>
                    <td className="strong">{lead.recommended_package || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
