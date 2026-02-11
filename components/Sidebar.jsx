'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ title, links }) {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-white p-4 min-h-screen">
      <h1 className="text-lg font-bold mb-5">{title}</h1>
      <nav className="space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded px-3 py-2 transition ${
                active ? 'bg-atletica-500' : 'hover:bg-slate-700'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
