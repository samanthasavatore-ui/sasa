export default function PaginaPublica() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <section className="card">
        <h1 className="text-2xl font-bold">Atlética Universitária</h1>
        <p className="mt-3 text-slate-600">
          Acompanhe eventos esportivos, comunicados oficiais e processos seletivos para novos membros.
        </p>
      </section>
      <section className="grid md:grid-cols-2 gap-4">
        <article className="card">
          <h2 className="font-semibold">Próximos Jogos</h2>
          <p className="text-sm text-slate-500 mt-2">InterAtléticas 2026 - inscrição aberta.</p>
        </article>
        <article className="card">
          <h2 className="font-semibold">Editais</h2>
          <p className="text-sm text-slate-500 mt-2">Processo de captação de patrocinadores.</p>
        </article>
      </section>
    </main>
  );
}
