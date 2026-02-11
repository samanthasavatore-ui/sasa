'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { statusBadgeClasses } from '@/lib/format';

export default function PerfilAssociadoPage() {
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    if (!auth || !db) return;
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) setPerfil(snap.data());
    });

    return () => unsub();
  }, []);

  if (!perfil) return <p>Carregando perfil...</p>;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Meu Perfil</h1>
      <div className="card space-y-2 text-sm">
        <p><strong>Nome:</strong> {perfil.nome_completo}</p>
        <p><strong>E-mail:</strong> {perfil.email}</p>
        <p>
          <strong>Status:</strong>{' '}
          <span className={`capitalize px-2 py-1 rounded text-xs ${statusBadgeClasses(perfil.status)}`}>{perfil.status}</span>
        </p>
        <p><strong>CPF:</strong> {perfil.cpf || '-'}</p>
        <p><strong>Data de nascimento:</strong> {perfil.data_nascimento || '-'}</p>
      </div>
    </section>
  );
}
