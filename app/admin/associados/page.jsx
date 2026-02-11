'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { statusBadgeClasses } from '@/lib/format';

const initialForm = {
  auth_uid: '',
  nome_completo: '',
  email: '',
  cpf: '',
  data_nascimento: '',
  status: 'ativo',
  tipo: 'associado'
};

export default function AssociadosAdminPage() {
  const [associados, setAssociados] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, 'users'), (snap) => {
      const lista = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((u) => u.tipo === 'associado')
        .sort((a, b) => (a.nome_completo || '').localeCompare(b.nome_completo || ''));
      setAssociados(lista);
    });

    return () => unsub();
  }, []);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  async function salvarAssociado(e) {
    e.preventDefault();
    if (!db) return;
    if (!form.nome_completo || !form.email) return;

    if (isEditing) {
      await updateDoc(doc(db, 'users', editingId), {
        ...form,
        updated_at: serverTimestamp()
      });
    } else {
      await setDoc(doc(db, 'users', form.auth_uid), {
        ...form,
        created_at: serverTimestamp()
      });
    }

    setForm(initialForm);
    setEditingId(null);
  }

  async function alterarStatus(id, status) {
    await updateDoc(doc(db, 'users', id), { status, updated_at: serverTimestamp() });
  }

  function editar(associado) {
    setEditingId(associado.id);
    setForm({
      auth_uid: associado.id,
      nome_completo: associado.nome_completo || '',
      email: associado.email || '',
      cpf: associado.cpf || '',
      data_nascimento: associado.data_nascimento || '',
      status: associado.status || 'ativo',
      tipo: 'associado'
    });
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Gestão de Associados</h1>

      <form onSubmit={salvarAssociado} className="card grid md:grid-cols-2 gap-3">
        <input className="border rounded p-2" placeholder="UID do Auth" value={form.auth_uid} onChange={(e) => setForm({ ...form, auth_uid: e.target.value })} required={!isEditing} disabled={isEditing} />
        <input className="border rounded p-2" placeholder="Nome completo" value={form.nome_completo} onChange={(e) => setForm({ ...form, nome_completo: e.target.value })} required />
        <input className="border rounded p-2" type="email" placeholder="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="border rounded p-2" placeholder="CPF" value={form.cpf} onChange={(e) => setForm({ ...form, cpf: e.target.value })} />
        <input className="border rounded p-2" type="date" value={form.data_nascimento} onChange={(e) => setForm({ ...form, data_nascimento: e.target.value })} />
        <select className="border rounded p-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="ativo">Ativo</option>
          <option value="inadimplente">Inadimplente</option>
          <option value="suspenso">Suspenso</option>
        </select>
        <div className="flex gap-2">
          <button className="bg-atletica-500 text-white rounded px-4 py-2">{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
          {isEditing && (
            <button type="button" className="border rounded px-4 py-2" onClick={() => { setEditingId(null); setForm(initialForm); }}>
              Cancelar edição
            </button>
          )}
        </div>
      </form>

      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Nome</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {associados.map((a) => (
              <tr key={a.id} className="border-b">
                <td className="py-2">{a.nome_completo}</td>
                <td>{a.email}</td>
                <td>
                  <span className={`capitalize px-2 py-1 rounded text-xs ${statusBadgeClasses(a.status)}`}>{a.status || '-'}</span>
                </td>
                <td className="space-x-2">
                  <button className="text-blue-600" onClick={() => editar(a)}>Editar</button>
                  <button className="text-yellow-700" onClick={() => alterarStatus(a.id, 'inadimplente')}>Inadimplente</button>
                  <button className="text-red-600" onClick={() => alterarStatus(a.id, 'suspenso')}>Suspender</button>
                  <button className="text-green-700" onClick={() => alterarStatus(a.id, 'ativo')}>Ativar</button>
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
