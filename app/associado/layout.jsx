import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';

const links = [
  { href: '/associado', label: 'Meu Perfil' },
  { href: '/associado/mensalidades', label: 'Mensalidades' },
  { href: '/associado/pagamentos', label: 'Histórico de Pagamentos' },
  { href: '/associado/eventos', label: 'Eventos' },
  { href: '/associado/noticias', label: 'Notícias' },
  { href: '/associado/documentos', label: 'Documentos' },
  { href: '/associado/carteirinha', label: 'Carteirinha QR Code' }
];

export default function AssociadoLayout({ children }) {
  return (
    <ProtectedRoute allowedType="associado">
      <div className="md:flex">
        <Sidebar title="Área do Associado" links={links} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
