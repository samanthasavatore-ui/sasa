'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import KpiCard from '@/components/KpiCard';
import { db } from '@/lib/firebase';
import { formatCurrency } from '@/lib/format';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [mensalidades, setMensalidades] = useState([]);

  useEffect(() => {
    if (!db) return;
    const unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
      setUsers(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    const unsubMensalidades = onSnapshot(collection(db, 'mensalidades'), (snap) => {
      setMensalidades(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubUsers();
      unsubMensalidades();
    };
  }, []);

  const kpis = useMemo(() => {
    const associados = users.filter((u) => u.tipo === 'associado');
    const inadimplentes = associados.filter((u) => u.status === 'inadimplente').length;
    const receita = mensalidades
      .filter((m) => m.status_pagamento === 'pago')
      .reduce((total, m) => total + Number(m.valor || 0), 0);

    return {
      totalAssociados: associados.length,
      inadimplentes,
      receita
    };
  }, [users, mensalidades]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard da Diretoria</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <KpiCard label="Total de associados" value={kpis.totalAssociados} />
        <KpiCard label="Inadimplentes" value={kpis.inadimplentes} helper="Status no cadastro" />
        <KpiCard label="Receita acumulada" value={formatCurrency(kpis.receita)} />
      </div>
    </section>
  );
}
