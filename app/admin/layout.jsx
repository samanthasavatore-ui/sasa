import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import LogoutButton from '@/components/LogoutButton';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/associados', label: 'Associados' },
  { href: '/admin/mensalidades', label: 'Mensalidades' },
  { href: '/admin/eventos', label: 'Eventos' },
  { href: '/admin/noticias', label: 'Notícias' },
  { href: '/admin/documentos', label: 'Documentos' }
];

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute allowedType="admin">
      <div className="md:flex">
        <Sidebar title="AAA SOCIAIS UFPI • Admin" links={links} />
        <main className="flex-1 p-6 space-y-4">
          <header className="flex justify-end">
            <LogoutButton />
          </header>
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
