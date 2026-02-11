import './globals.css';

export const metadata = {
  title: 'Portal do Associado – AAA SOCIAIS UFPI',
  description: 'Portal para gestão de associados, mensalidades, eventos e comunicados.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
