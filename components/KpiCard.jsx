export default function KpiCard({ label, value, helper }) {
  return (
    <div className="card">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {helper && <p className="text-xs text-slate-400 mt-1">{helper}</p>}
    </div>
  );
}
