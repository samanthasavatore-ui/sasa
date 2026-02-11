'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setErro('');
    try {
      const user = await login(email, senha);
      if (user.tipo === 'admin') {
        router.push('/admin');
      } else {
        router.push('/associado');
      }
    } catch (error) {
      setErro(error.message || 'Falha no login');
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="card w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Entrar no Portal</h1>
        <input className="w-full border rounded p-2" type="email" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input className="w-full border rounded p-2" type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)} required />
        {erro && <p className="text-red-600 text-sm">{erro}</p>}
        <button className="w-full bg-atletica-500 text-white rounded py-2">Login</button>
      </form>
    </main>
  );
}
