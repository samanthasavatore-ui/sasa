'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { formatCurrency, formatDate, statusBadgeClasses } from '@/lib/format';

export default function MensalidadesAssociadoPage() {
  const [mensalidades, setMensalidades] = useState([]);

  useEffect(() => {
    if (!auth || !db) return;
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const q = query(collection(db, 'mensalidades'), where('user_id', '==', user.uid));
      const snap = await getDocs(q);
      setMensalidades(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Minhas Mensalidades</h1>
      <div className="space-y-3">
        {mensalidades.map((m) => (
          <div key={m.id} className="card text-sm space-y-2">
            <p><strong>Valor:</strong> {formatCurrency(m.valor)}</p>
            <p><strong>Vencimento:</strong> {formatDate(m.vencimento)}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`capitalize px-2 py-1 rounded text-xs ${statusBadgeClasses(m.status_pagamento)}`}>{m.status_pagamento}</span>
            </p>
            <div className="flex gap-2">
              <a className="border rounded px-3 py-1" href={m.link_boleto} target="_blank">Baixar boleto</a>
              <button className="bg-atletica-500 text-white rounded px-3 py-1" onClick={() => alert('Solicitação registrada para a tesouraria!')}>
                Solicitar novo boleto
              </button>
            </div>
          </div>
        ))}
        {mensalidades.length === 0 && <p className="text-sm text-slate-500">Nenhuma mensalidade cadastrada.</p>}
      </div>
    </section>
  );
}
