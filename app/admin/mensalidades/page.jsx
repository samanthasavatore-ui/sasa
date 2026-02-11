'use client';

import { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { gerarLinkPagamento } from '@/lib/payments';
import { formatCurrency, formatDate, statusBadgeClasses } from '@/lib/format';

export default function MensalidadesAdminPage() {
  const [mensalidades, setMensalidades] = useState([]);
  const [form, setForm] = useState({ user_id: '', valor: 75, vencimento: '', status_pagamento: 'pendente' });

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, 'mensalidades'), (snap) => {
      const dados = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMensalidades(dados);
    });

    return () => unsub();
  }, []);

  async function criarMensalidade(e) {
    e.preventDefault();
    if (!db) return;
    if (!form.user_id || !form.vencimento) return;

    const link = await gerarLinkPagamento({
      userId: form.user_id,
      valor: Number(form.valor),
      referencia: form.vencimento
    });

    await addDoc(collection(db, 'mensalidades'), {
      ...form,
      valor: Number(form.valor),
      link_boleto: link,
      created_at: serverTimestamp()
    });

    setForm({ user_id: '', valor: 75, vencimento: '', status_pagamento: 'pendente' });
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Gerenciar Mensalidades</h1>

      <form onSubmit={criarMensalidade} className="card grid md:grid-cols-2 gap-3">
        <input className="border rounded p-2" placeholder="ID do associado (user_id)" value={form.user_id} onChange={(e) => setForm({ ...form, user_id: e.target.value })} required />
        <input className="border rounded p-2" type="number" min="1" step="0.01" placeholder="Valor" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} required />
        <input className="border rounded p-2" type="date" value={form.vencimento} onChange={(e) => setForm({ ...form, vencimento: e.target.value })} required />
        <button className="bg-atletica-500 text-white rounded px-4 py-2">Gerar boleto/link</button>
      </form>

      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Associado</th>
              <th>Valor</th>
              <th>Vencimento</th>
              <th>Status</th>
              <th>Boleto</th>
            </tr>
          </thead>
          <tbody>
            {mensalidades.map((m) => (
              <tr key={m.id} className="border-b">
                <td className="py-2">{m.user_id}</td>
                <td>{formatCurrency(m.valor)}</td>
                <td>{formatDate(m.vencimento)}</td>
                <td><span className={`capitalize px-2 py-1 rounded text-xs ${statusBadgeClasses(m.status_pagamento)}`}>{m.status_pagamento}</span></td>
                <td><a className="text-blue-700 underline" href={m.link_boleto} target="_blank">Abrir</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
