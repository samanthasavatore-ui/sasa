# Portal do Associado – AAA SOCIAIS UFPI

Sistema web para gestão de associados da Atlética Acadêmica, com área administrativa e área do associado.

## 1) Tecnologias
- **Frontend:** React + Next.js (App Router)
- **Backend:** Firebase Authentication + Firestore + Storage
- **Estilização:** Tailwind CSS
- **Pagamentos:** camada preparada para **Mercado Pago** ou **Asaas** (`lib/payments.js`)
- **Hospedagem:** Vercel

## 2) Estrutura de pastas

```bash
.
├── app/
│   ├── admin/                     # Painel da diretoria/tesouraria
│   ├── associado/                 # Área autenticada do associado
│   ├── api/exportar-associados/   # Exportação CSV
│   ├── login/
│   ├── publico/
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── KpiCard.jsx
│   ├── LogoutButton.jsx
│   ├── ProtectedRoute.jsx
│   └── Sidebar.jsx
├── firebase/
│   ├── firestore.rules
│   └── storage.rules
├── lib/
│   ├── auth.js
│   ├── firebase.js
│   ├── format.js
│   └── payments.js
└── README.md
```

## 3) Funcionalidades

### Administrador
- Login administrativo (e-mail/senha)
- Dashboard com total de associados, inadimplentes e receita
- Cadastro e edição de associado (vinculado ao `uid` do Firebase Auth)
- Ativação/suspensão/inadimplência
- Criação e publicação de eventos
- Publicação de notícias/comunicados
- Upload e listagem de documentos (Firebase Storage)
- Gestão de mensalidades e geração de link de pagamento
- Exportação da lista de associados em CSV

### Associado
- Login individual
- Visualização de perfil e status
- Consulta de mensalidades
- Download de boletos/links de pagamento
- Solicitação de novo boleto (placeholder de UX)
- Histórico de pagamentos
- Eventos e notícias
- Download de documentos
- Carteirinha digital com QR Code

### Extras
- Página pública institucional (`/publico`)
- Estrutura para notificação por e-mail (documentada para evolução)

## 4) Modelo de dados (Firestore)

### `users/{uid}`
```js
{
  nome_completo: string,
  cpf: string,
  email: string,
  data_nascimento: string,
  status: 'ativo' | 'inadimplente' | 'suspenso',
  tipo: 'admin' | 'associado'
}
```

### `mensalidades/{id}`
```js
{
  user_id: string, // uid do associado
  valor: number,
  vencimento: string | timestamp,
  status_pagamento: 'pendente' | 'pago' | 'vencido',
  link_boleto: string
}
```

### Outras coleções
- `eventos`
- `noticias`
- `documentos`

## 5) Regras de segurança Firebase
- **Firestore:** `firebase/firestore.rules`
- **Storage:** `firebase/storage.rules`

Resumo:
- Admin pode gerenciar dados de todo o sistema.
- Associado acessa apenas seus próprios dados de perfil/mensalidade.
- Eventos e notícias são públicos para leitura.
- Documentos exigem usuário autenticado para leitura.

## 6) Como rodar localmente

1. Instalar dependências:
```bash
npm install
```

2. Criar `.env.local`:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_PAYMENT_PROVIDER=mock # mock | mercadopago | asaas
```

3. Executar:
```bash
npm run dev
```

4. Acessar: `http://localhost:3000`

## 7) Deploy na Vercel
1. Subir o projeto para GitHub.
2. Importar o repositório na Vercel.
3. Configurar as variáveis de ambiente iguais ao `.env.local`.
4. Fazer deploy.
5. Após deploy, validar login e regras do Firestore.

## 8) Próximos passos recomendados
- Migrar integração de pagamento para API Routes seguras com tokens secretos.
- Implementar webhook para baixa automática de pagamento.
- Adicionar Cloud Functions + Resend/SendGrid para e-mails automáticos.
- Adicionar trilha de auditoria para ações de admin.
