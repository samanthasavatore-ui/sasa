export default function MensalidadesAdminPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Gerenciar Mensalidades</h1>
      <div className="card space-y-3">
        <p>Emita boletos e links de pagamento para associados.</p>
        <button className="bg-atletica-500 text-white rounded px-4 py-2">Gerar cobrança em lote</button>
      </div>
      <div className="card">
        <h2 className="font-semibold mb-2">Pagamentos recentes</h2>
        <ul className="text-sm text-slate-600 list-disc ml-5">
          <li>João Neto - R$ 75,00 - Pago em 05/02</li>
          <li>Marina Alves - R$ 75,00 - Pendente</li>
        </ul>
      </div>
    </section>
  );
}
