export default function PerfilAssociadoPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Meu Perfil</h1>
      <div className="card space-y-2 text-sm">
        <p><strong>Nome:</strong> João da Silva</p>
        <p><strong>E-mail:</strong> joao@universidade.edu</p>
        <p><strong>Status:</strong> <span className="text-green-700">Ativo</span></p>
        <p><strong>Plano:</strong> Mensalidade R$ 75,00</p>
      </div>
    </section>
  );
}
