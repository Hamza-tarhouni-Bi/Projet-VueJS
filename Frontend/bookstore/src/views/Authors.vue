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
  await fetch(`http://localhost:3000/author/delete/${id}`, { method: 'DELETE', headers })
  await fetchAuthors()
}
</script>

<template>
  <div class="page">

    <div class="header">
      <h1>Manage Authors</h1>
      <button @click="openCreate" class="add-btn">Add Author</button>
    </div>

    <p v-if="loading" class="loading">Loading...</p>

    <div v-else class="table-wrapper">
      <table class="table">
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
            <td>{{ author.id }}</td>
            <td>{{ author.prenom }}</td>
            <td>{{ author.nom }}</td>
            <td>
              <button class="icon-btn" @click="openEdit(author)">✎</button>
            </td>
            <td>
              <button class="icon-btn delete" @click="deleteAuthor(author.id)">✂</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showForm" class="modal">
      <div class="modal-content">
        <h2 class="modal-title">{{ editingAuthor ? 'Edit Author' : 'Add Author' }}</h2>

        <div class="form-group">
          <label>First Name</label>
          <input v-model="form.prenom" placeholder="First Name" />
        </div>

        <div class="form-group">
          <label>Last Name</label>
          <input v-model="form.nom" placeholder="Last Name" />
        </div>

        <div class="modal-actions">
          <button class="btn save" @click="submitForm">
            {{ editingAuthor ? 'Save Changes' : 'Create' }}
          </button>
          <button class="btn cancel" @click="showForm = false">Cancel</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.page {
  padding: 20px;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.header h1 {
  font-size: 22px;
  font-weight: bold;
  color: #1f2937;
}

.add-btn {
  background-color: #2b6cb0;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #1e4e8c;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: #f5f5f5;
  min-width: 400px;
}

.table th {
  background: #e0e0e0;
  padding: 10px;
  text-align: left;
}

.table td {
  padding: 10px;
  border-top: 1px solid #ccc;
}

.icon-btn {
  background: #2b6cb0;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.icon-btn:hover {
  background: #1e4e8c;
}

.icon-btn.delete {
  background: #e53e3e;
}

.icon-btn.delete:hover {
  background: #c53030;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  padding: 1rem;
}

.modal-content {
  background: white;
  padding: 25px;
  width: 100%;
  max-width: 380px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 13px;
  color: #374151;
}

.form-group input {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  transition: 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
}

.save {
  background: #2563eb;
  color: white;
}

.save:hover {
  background: #1d4ed8;
}

.cancel {
  background: #e5e7eb;
  color: #374151;
}

.cancel:hover {
  background: #d1d5db;
}

@media (max-width: 640px) {
  .header h1 { font-size: 18px; }
  .page { padding: 12px; }
}
</style>