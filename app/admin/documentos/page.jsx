'use client';

import { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

export default function DocumentosAdminPage() {
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, 'documentos'), (snap) => {
      setDocumentos(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, []);

  async function enviarDocumento(e) {
    e.preventDefault();
    if (!storage || !db || !file || !titulo) return;

    const fileRef = ref(storage, `documentos/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    await addDoc(collection(db, 'documentos'), {
      titulo,
      url,
      nome_arquivo: file.name,
      created_at: serverTimestamp()
    });

    setFile(null);
    setTitulo('');
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Documentos Oficiais</h1>
      <form onSubmit={enviarDocumento} className="card space-y-3">
        <input className="w-full border rounded p-2" placeholder="Título do documento" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        <input type="file" className="block" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
        <button className="bg-atletica-500 text-white rounded px-4 py-2">Enviar documento</button>
      </form>

      <ul className="card text-sm list-disc ml-6">
        {documentos.map((doc) => (
          <li key={doc.id}>
            <a className="text-blue-700 underline" href={doc.url} target="_blank">{doc.titulo}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
