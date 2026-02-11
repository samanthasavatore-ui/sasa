'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import QRCode from 'qrcode';
import { auth, db } from '@/lib/firebase';

export default function CarteirinhaPage() {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    if (!auth || !db) return;
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (!snap.exists()) return;

      const dados = snap.data();
      setPerfil(dados);
      const payload = `associado:${user.uid};email:${dados.email};status:${dados.status}`;
      const qr = await QRCode.toDataURL(payload);
      setQrCodeDataUrl(qr);
    });

    return () => unsub();
  }, []);

  if (!perfil) return <p>Carregando carteirinha...</p>;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Carteirinha Digital</h1>
      <div className="card w-full max-w-sm">
        <p className="font-semibold">{perfil.nome_completo}</p>
        <p className="text-sm text-slate-500 mb-3">Status: {perfil.status}</p>
        {qrCodeDataUrl && <img src={qrCodeDataUrl} alt="QR Code da carteirinha" className="w-40 h-40" />}
      </div>
    </section>
  );
}
