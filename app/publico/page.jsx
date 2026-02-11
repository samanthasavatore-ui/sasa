'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function PaginaPublica() {
  const [eventos, setEventos] = useState([]);
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    if (!db) return;
    const unsubEventos = onSnapshot(collection(db, 'eventos'), (snap) => {
      setEventos(snap.docs.slice(0, 2).map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    const unsubNoticias = onSnapshot(collection(db, 'noticias'), (snap) => {
      setNoticias(snap.docs.slice(0, 2).map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubEventos();
      unsubNoticias();
    };
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <section className="card">
        <h1 className="text-2xl font-bold">AAA SOCIAIS UFPI</h1>
        <p className="mt-3 text-slate-600">Portal institucional com principais eventos e comunicados oficiais.</p>
      </section>
      <section className="grid md:grid-cols-2 gap-4">
        <article className="card">
          <h2 className="font-semibold mb-2">Próximos Eventos</h2>
          <ul className="text-sm text-slate-600 space-y-2">
            {eventos.map((evento) => <li key={evento.id}>• {evento.titulo}</li>)}
          </ul>
        </article>
        <article className="card">
          <h2 className="font-semibold mb-2">Últimas Notícias</h2>
          <ul className="text-sm text-slate-600 space-y-2">
            {noticias.map((noticia) => <li key={noticia.id}>• {noticia.titulo}</li>)}
          </ul>
        </article>
      </section>
    </main>
  );
}
