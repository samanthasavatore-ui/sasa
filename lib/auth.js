'use client';

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export async function login(email, senha) {
  const credential = await signInWithEmailAndPassword(auth, email, senha);
  const userRef = doc(db, 'users', credential.user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error('Perfil não encontrado no Firestore.');
  }

  return { uid: credential.user.uid, ...userSnap.data() };
}

export async function logout() {
  await signOut(auth);
}
