# Portal do Associado – Atlética Universitária

Sistema web completo para gestão de associados de uma Atlética Acadêmica, com área administrativa e área de associado.

## Stack
- **Frontend:** Next.js (React)
- **Backend:** Firebase Authentication + Firestore + Storage
- **Estilo:** Tailwind CSS
- **Pagamentos:** integração preparada para Mercado Pago/Asaas
- **Deploy:** Vercel

## Estrutura de pastas

```bash
.
├── app/
│   ├── admin/                 # Área administrativa
│   ├── associado/             # Área do associado
│   ├── api/exportar-associados/ # Endpoint CSV
│   ├── login/
│   ├── publico/
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── KpiCard.jsx
│   ├── ProtectedRoute.jsx
│   └── Sidebar.jsx
├── firebase/
│   ├── firestore.rules
│   └── storage.rules
├── lib/
│   ├── auth.js
│   ├── firebase.js
│   └── payments.js
├── public/
├── README.md
└── tailwind.config.js
```

## Funcionalidades implementadas

### Administrador
- Login administrativo com Firebase Auth
- Dashboard com KPIs: total associados, inadimplentes e receita mensal
- Gestão de associados (cadastro/edição/desativação via modelos de tela)
- Gestão de mensalidades e visualização de pagamentos
- Publicação de eventos e notícias
- Upload de documentos (modelo de tela)
- Exportação CSV via `/api/exportar-associados`

### Associado
- Login individual
- Visualização de perfil e status
- Consulta de mensalidades, emissão/solicitação de boleto (modelo)
- Histórico de pagamentos
- Eventos, notícias e documentos
- Carteirinha digital com QR Code

### Extras
- Página pública institucional (`/publico`)
- Estrutura para provedores de pagamento em `lib/payments.js`

## Modelo de dados (Firestore)

### `users`
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

### `mensalidades`
```js
{
  user_id: string,
  valor: number,
  vencimento: timestamp,
  status_pagamento: 'pendente' | 'pago' | 'vencido',
  link_boleto: string
}
```

### Coleções adicionais
- `eventos`
- `noticias`
- `documentos`

## Regras de segurança Firebase
- Arquivo Firestore: `firebase/firestore.rules`
- Arquivo Storage: `firebase/storage.rules`

## Como rodar localmente

1. Instale dependências:
```bash
npm install
```

2. Crie o arquivo `.env.local`:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_PAYMENT_PROVIDER=mock # mock | mercadopago | asaas
```

3. Execute:
```bash
npm run dev
```

4. Acesse:
- `http://localhost:3000`

## Deploy na Vercel

1. Suba o projeto para GitHub.
2. Na Vercel, importe o repositório.
3. Configure as mesmas variáveis de ambiente do `.env.local`.
4. Faça deploy.

## Integração de pagamentos (Mercado Pago / Asaas)

Implementação inicial está no arquivo `lib/payments.js`. Para produção:
1. Criar API routes seguras no Next.js para geração de cobrança.
2. Usar token secreto no servidor (não no frontend).
3. Salvar link de boleto/preferência na coleção `mensalidades`.
4. Configurar webhook para atualizar `status_pagamento` automaticamente.

## Notificações por e-mail (opcional)

Sugestão:
- Firebase Cloud Functions + SendGrid/Resend.
- Disparos em criação de mensalidade, lembrete de vencimento e publicação de comunicado.
