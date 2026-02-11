import './globals.css';

export const metadata = {
  title: 'Portal do Associado – Atlética Universitária',
  description: 'Portal para gestão de associados, mensalidades e comunicados.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
