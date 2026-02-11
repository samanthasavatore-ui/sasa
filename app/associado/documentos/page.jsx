'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function DocumentosAssociadoPage() {
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, 'documentos'), (snap) => {
      setDocumentos(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Documentos Disponíveis</h1>
      <ul className="card text-sm list-disc ml-6 space-y-1">
        {documentos.map((doc) => (
          <li key={doc.id}>
            <a className="text-blue-700 underline" href={doc.url} target="_blank">{doc.titulo}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
