import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';

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
        <Sidebar title="Painel Administrativo" links={links} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
