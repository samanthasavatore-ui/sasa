/**
 * Ponto único para integrar provedores de cobrança.
 * Implementação atual gera URL mock para desenvolvimento.
 */
export async function gerarLinkPagamento({ userId, valor, referencia }) {
  const provider = process.env.NEXT_PUBLIC_PAYMENT_PROVIDER || 'mock';

  if (provider === 'mercadopago') {
    return `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${userId}-${referencia}`;
  }

  if (provider === 'asaas') {
    return `https://www.asaas.com/i/${userId}-${referencia}`;
  }

  return `https://pagamento.local/${userId}/${referencia}?valor=${valor}`;
}
