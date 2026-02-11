export function formatCurrency(value = 0) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value));
}

export function formatDate(dateLike) {
  if (!dateLike) return '-';
  const date = typeof dateLike?.toDate === 'function' ? dateLike.toDate() : new Date(dateLike);
  return date.toLocaleDateString('pt-BR');
}

export function statusBadgeClasses(status) {
  const map = {
    ativo: 'bg-green-100 text-green-800',
    inadimplente: 'bg-yellow-100 text-yellow-800',
    suspenso: 'bg-red-100 text-red-800',
    pago: 'bg-green-100 text-green-800',
    pendente: 'bg-yellow-100 text-yellow-800',
    vencido: 'bg-red-100 text-red-800'
  };
  return map[status] || 'bg-slate-100 text-slate-700';
}
