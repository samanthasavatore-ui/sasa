'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function NoticiasAssociadoPage() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, 'noticias'), (snap) => {
      setNoticias(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Comunicados e Notícias</h1>
      {noticias.map((noticia) => (
        <article key={noticia.id} className="card">
          <h2 className="font-semibold">{noticia.titulo}</h2>
          <p className="text-sm text-slate-600 mt-2">{noticia.conteudo}</p>
        </article>
      ))}
    </section>
  );
}
