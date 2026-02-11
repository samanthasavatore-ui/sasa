import { NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

function getDb() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return getFirestore(app);
}

export async function GET() {
  const db = getDb();
  const q = query(collection(db, 'users'), where('tipo', '==', 'associado'));
  const snap = await getDocs(q);

  const linhas = ['id,nome,email,status,cpf'];
  snap.docs.forEach((doc) => {
    const u = doc.data();
    linhas.push([doc.id, u.nome_completo || '', u.email || '', u.status || '', u.cpf || ''].join(','));
  });

  return new NextResponse(linhas.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="associados.csv"'
    }
  });
}
