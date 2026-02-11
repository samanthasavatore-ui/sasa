const associados = [
  { nome: 'Ana Souza', status: 'ativo', email: 'ana@atletica.com' },
  { nome: 'Bruno Lima', status: 'inadimplente', email: 'bruno@atletica.com' }
];

export default function AssociadosAdminPage() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestão de Associados</h1>
        <button className="bg-atletica-500 text-white rounded px-4 py-2">Cadastrar associado</button>
      </div>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Nome</th><th>Email</th><th>Status</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {associados.map((a) => (
              <tr key={a.email} className="border-b">
                <td className="py-2">{a.nome}</td>
                <td>{a.email}</td>
                <td className="capitalize">{a.status}</td>
                <td className="space-x-2">
                  <button className="text-blue-600">Editar</button>
                  <button className="text-red-600">Desativar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a className="inline-block border rounded px-4 py-2" href="/api/exportar-associados">Exportar CSV</a>
    </section>
  );
}
