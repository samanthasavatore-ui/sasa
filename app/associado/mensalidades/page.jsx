export default function MensalidadesAssociadoPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Minhas Mensalidades</h1>
      <div className="card text-sm space-y-2">
        <p>Fevereiro/2026 - <span className="text-red-600">Pendente</span> - vencimento: 10/02</p>
        <div className="flex gap-2">
          <button className="border rounded px-3 py-1">Baixar boleto</button>
          <button className="bg-atletica-500 text-white rounded px-3 py-1">Solicitar novo boleto</button>
        </div>
      </div>
    </section>
  );
}
