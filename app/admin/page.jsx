import KpiCard from '@/components/KpiCard';

export default function AdminDashboard() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard da Diretoria</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <KpiCard label="Total de associados" value="248" />
        <KpiCard label="Inadimplentes" value="37" helper="15% da base" />
        <KpiCard label="Receita mensal" value="R$ 18.420,00" />
      </div>
    </section>
  );
}
