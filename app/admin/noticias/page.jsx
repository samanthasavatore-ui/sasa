'use client';

import { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function NoticiasAdminPage() {
  const [noticias, setNoticias] = useState([]);
  const [form, setForm] = useState({ titulo: '', conteudo: '' });

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, 'noticias'), (snap) => {
      setNoticias(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  async function publicarNoticia(e) {
    e.preventDefault();
    if (!db) return;
    await addDoc(collection(db, 'noticias'), { ...form, created_at: serverTimestamp() });
    setForm({ titulo: '', conteudo: '' });
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Notícias e Comunicados</h1>
      <form onSubmit={publicarNoticia} className="card">
        <input className="w-full border rounded p-2 mb-2" placeholder="Título da notícia" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required />
        <textarea className="w-full border rounded p-2 mb-2" placeholder="Conteúdo" rows={4} value={form.conteudo} onChange={(e) => setForm({ ...form, conteudo: e.target.value })} required />
        <button className="bg-atletica-500 text-white rounded px-4 py-2">Publicar</button>
      </form>

      {noticias.map((noticia) => (
        <article key={noticia.id} className="card">
          <h2 className="font-semibold">{noticia.titulo}</h2>
          <p className="text-sm mt-2 text-slate-600">{noticia.conteudo}</p>
        </article>
      ))}
    </section>
  );
}
