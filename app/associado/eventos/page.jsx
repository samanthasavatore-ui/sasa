export default function EventosAssociadoPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Eventos da Atlética</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <article className="card"><h2 className="font-semibold">Treino Aberto</h2><p className="text-sm mt-2">Sexta às 18h no ginásio.</p></article>
        <article className="card"><h2 className="font-semibold">Churrasco de Integração</h2><p className="text-sm mt-2">Sábado às 12h na sede.</p></article>
      </div>
    </section>
  );
}
