'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/login');
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-sm border border-slate-300 rounded px-3 py-1 hover:bg-slate-100"
    >
      Sair
    </button>
  );
}
