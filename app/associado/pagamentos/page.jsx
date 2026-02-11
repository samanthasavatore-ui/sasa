'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { formatCurrency, formatDate } from '@/lib/format';

export default function PagamentosAssociadoPage() {
  const [pagamentos, setPagamentos] = useState([]);

  useEffect(() => {
    if (!auth || !db) return;
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const q = query(
        collection(db, 'mensalidades'),
        where('user_id', '==', user.uid),
        where('status_pagamento', '==', 'pago')
      );
      const snap = await getDocs(q);
      setPagamentos(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Histórico de Pagamentos</h1>
      <ul className="card text-sm space-y-2">
        {pagamentos.map((p) => (
          <li key={p.id} className="border-b pb-2">
            {formatDate(p.vencimento)} - {formatCurrency(p.valor)} - Pago
          </li>
        ))}
        {pagamentos.length === 0 && <li>Nenhum pagamento confirmado até o momento.</li>}
      </ul>
    </section>
  );
}
