'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function CarteirinhaPage() {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');

  useEffect(() => {
    QRCode.toDataURL('associado:joao@universidade.edu;status:ativo').then(setQrCodeDataUrl);
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Carteirinha Digital</h1>
      <div className="card w-full max-w-sm">
        <p className="font-semibold">João da Silva</p>
        <p className="text-sm text-slate-500 mb-3">Matrícula: 202600123</p>
        {qrCodeDataUrl && <img src={qrCodeDataUrl} alt="QR Code da carteirinha" className="w-40 h-40" />}
      </div>
    </section>
  );
}
