'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function EventosAssociadoPage() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, 'eventos'), (snap) => {
      setEventos(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Eventos da Atlética</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {eventos.map((evento) => (
          <article key={evento.id} className="card">
            <h2 className="font-semibold">{evento.titulo}</h2>
            <p className="text-xs text-slate-500">{evento.data || 'Data a definir'}</p>
            <p className="text-sm mt-2">{evento.descricao}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
