import { NextResponse } from 'next/server';

export async function GET() {
  const csv = [
    'nome,email,status',
    'Ana Souza,ana@atletica.com,ativo',
    'Bruno Lima,bruno@atletica.com,inadimplente'
  ].join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="associados.csv"'
    }
  });
}
