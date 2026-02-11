export default function EventosAdminPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Eventos</h1>
      <div className="card">
        <input className="w-full border rounded p-2 mb-2" placeholder="Título do evento" />
        <textarea className="w-full border rounded p-2 mb-2" placeholder="Descrição" rows={4} />
        <button className="bg-atletica-500 text-white rounded px-4 py-2">Publicar evento</button>
      </div>
    </section>
  );
}
