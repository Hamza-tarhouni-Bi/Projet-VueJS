<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const authors  = ref<any[]>([])
const loading  = ref(true)
const showForm = ref(false)
const editingAuthor = ref<any>(null)
const form     = ref({ prenom: '', nom: '' })

const token = localStorage.getItem('token')
const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

onMounted(async () => {
  await fetchAuthors()
  loading.value = false
})

const fetchAuthors = async () => {
  const res = await fetch('http://localhost:3000/author/all')
  authors.value = await res.json()
}

const openCreate = () => {
  editingAuthor.value = null
  form.value = { prenom: '', nom: '' }
  showForm.value = true
}

const openEdit = (author: any) => {
  editingAuthor.value = author
  form.value = { prenom: author.prenom, nom: author.nom }
  showForm.value = true
}

const submitForm = async () => {
  if (editingAuthor.value) {
    await axios.put(`http://localhost:3000/author/edit/${editingAuthor.value.id}`, {
      id: editingAuthor.value.id,
      prenom: form.value.prenom,
      nom: form.value.nom
    }, { headers })
  } else {
    await fetch('http://localhost:3000/author/add', {
      method: 'POST',
      headers,
      body: JSON.stringify(form.value)
    })
  }
  form.value = { prenom: '', nom: '' }
  showForm.value = false
  await fetchAuthors()
}

const deleteAuthor = async (id: number) => {
  if (!confirm('Delete this author?')) return
  await fetch(`http://localhost:3000/author/delete/${id}`, {
    method: 'DELETE',
    headers
  })
  await fetchAuthors()
}
</script>

<template>
  <div class="page">

    <div class="header">
      <h1>Manage Authors</h1>
      <button @click="openCreate" class="btn-primary">Add Author</button>
    </div>

    <p v-if="loading" class="loading">Loading...</p>

    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="author in authors" :key="author.id">
            <td class="id">{{ author.id }}</td>
            <td class="name">{{ author.prenom }}</td>
            <td>{{ author.nom }}</td>
            <td>
              <button class="icon-btn edit" @click="openEdit(author)">✎</button>
            </td>
            <td>
              <button class="icon-btn delete" @click="deleteAuthor(author.id)">✂</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showForm" class="modal-overlay">
      <div class="modal">

        <h2>{{ editingAuthor ? 'Edit Author' : 'Add Author' }}</h2>

        <div class="inputs">
          <input v-model="form.prenom" placeholder="First Name" />
          <input v-model="form.nom" placeholder="Last Name" />
        </div>

        <div class="actions">
          <button @click="submitForm" class="btn-primary">
            {{ editingAuthor ? 'Save Changes' : 'Create' }}
          </button>
          <button @click="showForm = false" class="btn-secondary">Cancel</button>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.page {
  padding: 2rem;
  background-color: #f3f4f6;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header h1 {
  font-size: 22px;
  font-weight: bold;
  color: #1f2937;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 8px 16px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: 0.25s;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
  padding: 8px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: 0.25s;
}

.btn-secondary:hover {
  background-color: #d1d5db;
}

.loading {
  text-align: center;
  color: #6b7280;
}

.table-container {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

thead {
  background-color: #f9fafb;
  color: #6b7280;
  text-transform: uppercase;
  font-size: 12px;
}

th {
  padding: 12px;
  text-align: left;
}

td {
  padding: 12px;
}

tbody tr {
  border-top: 1px solid #f3f4f6;
}

.id {
  color: #9ca3af;
}

.name {
  font-weight: 600;
  color: #1f2937;
}

/* Boutons icônes */
.icon-btn {
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
  color: white;
}

.icon-btn.edit {
  background-color: #2563eb;
}

.icon-btn.edit:hover {
  background-color: #1d4ed8;
}

.icon-btn.delete {
  background-color: #ef4444;
}

.icon-btn.delete:hover {
  background-color: #dc2626;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
}

.modal h2 {
  margin-bottom: 1rem;
  font-size: 18px;
  font-weight: bold;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.inputs input {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  transition: 0.2s;
}

.inputs input:focus {
  outline: none;
  border-color: #2563eb;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 1.2rem;
}
</style>