'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function ProtectedRoute({ allowedType, children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || !db) {
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }

      const snap = await getDoc(doc(db, 'users', user.uid));
      if (!snap.exists()) {
        router.replace('/login');
        return;
      }

      const data = snap.data();
      if (allowedType && data.tipo !== allowedType) {
        router.replace('/login');
        return;
      }

      setLoading(false);
    });

    return () => unsub();
  }, [allowedType, router]);

  if (loading) {
    return <div className="p-8">Carregando...</div>;
  }

  return children;
}
