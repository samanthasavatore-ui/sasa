'use client';

import { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function EventosAdminPage() {
  const [eventos, setEventos] = useState([]);
  const [form, setForm] = useState({ titulo: '', descricao: '', data: '' });

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, 'eventos'), (snap) => {
      setEventos(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  async function publicarEvento(e) {
    e.preventDefault();
    if (!db) return;
    await addDoc(collection(db, 'eventos'), { ...form, created_at: serverTimestamp() });
    setForm({ titulo: '', descricao: '', data: '' });
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Eventos</h1>
      <form onSubmit={publicarEvento} className="card">
        <input className="w-full border rounded p-2 mb-2" placeholder="Título do evento" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required />
        <input className="w-full border rounded p-2 mb-2" type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} />
        <textarea className="w-full border rounded p-2 mb-2" placeholder="Descrição" rows={4} value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} required />
        <button className="bg-atletica-500 text-white rounded px-4 py-2">Publicar evento</button>
      </form>

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
