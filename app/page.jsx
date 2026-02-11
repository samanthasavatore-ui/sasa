import Link from 'next/link';

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <section className="card">
        <h1 className="text-3xl font-bold text-atletica-700">Portal do Associado – AAA SOCIAIS UFPI</h1>
        <p className="mt-3 text-slate-600">
          Plataforma completa para gestão de associados, mensalidades, documentos e comunicação oficial.
        </p>
        <div className="mt-5 flex gap-3">
          <Link href="/login" className="bg-atletica-500 text-white px-4 py-2 rounded">Entrar</Link>
          <Link href="/publico" className="border border-slate-300 px-4 py-2 rounded">Página pública</Link>
        </div>
      </section>
    </main>
  );
}
