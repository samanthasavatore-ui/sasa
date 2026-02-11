export default function DocumentosAdminPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Documentos Oficiais</h1>
      <div className="card space-y-3">
        <input type="file" className="block" />
        <button className="bg-atletica-500 text-white rounded px-4 py-2">Enviar documento</button>
      </div>
    </section>
  );
}
