<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const books   = ref<any[]>([])
const authors = ref<any[]>([])
const loading = ref(true)
const showForm = ref(false)
const editingBook = ref<any>(null)

const token = localStorage.getItem('token')
const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

const emptyForm = () => ({ title: '', year: '', editor: '', image: '', authorId: null as number | null })
const form = ref(emptyForm())

onMounted(async () => {
  await Promise.all([fetchBooks(), fetchAuthors()])
  loading.value = false
})

const fetchBooks = async () => {
  const res = await fetch('http://localhost:3000/books/all')
  const data = await res.json()
  books.value = data.listeBooks ?? data
  console.log('📚 books sample:', JSON.stringify(books.value[0], null, 2)) // 👈
}

const fetchAuthors = async () => {
  const res = await fetch('http://localhost:3000/author/all')
  authors.value = await res.json()
  console.log('👤 authors sample:', JSON.stringify(authors.value[0], null, 2)) // 👈
}



const getAuthorName = (authorId: any) => {
  if (!authorId) return 'Unknown'
  const found = authors.value.find(a => a.id === Number(authorId))
  return found ? `${found.prenom} ${found.nom}` : 'Unknown'
}

const openCreate = () => {
  editingBook.value = null
  form.value = emptyForm()
  showForm.value = true
}

const openEdit = (book: any) => {
  editingBook.value = book
  form.value = {
    title: book.title,
    year: book.year,
    editor: book.editor,
    image: book.image,
    // ✅ Récupère l'id que book.author soit un objet ou un simple id
    authorId: book.author?.id ?? book.author
  }
  showForm.value = true
}

// ✅ FIX : envoie authorId au lieu de author dans le POST et PUT
const submitForm = async () => {
 console.log('📤 form envoyé:', JSON.stringify({
    title: form.value.title,
    year: Number(form.value.year),
    editor: form.value.editor,
    image: form.value.image,
    authorId: Number(form.value.authorId)
  }, null, 2))
  if (editingBook.value) {
    await axios.put(`http://localhost:3000/books/edit/${editingBook.value.id}`, {
      id: editingBook.value.id,
      title: form.value.title,
      year: Number(form.value.year),
      editor: form.value.editor,
      image: form.value.image,
      authorId: Number(form.value.authorId) // ✅ authorId
    }, { headers })
  } else {
    await fetch('http://localhost:3000/books/new', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: form.value.title,
        year: Number(form.value.year),
        editor: form.value.editor,
        image: form.value.image,
        authorId: Number(form.value.authorId) // ✅ authorId
      })
    })
  }

  showForm.value = false
  await fetchBooks()
}

const deleteBook = async (id: number) => {
  if (!confirm('Delete this book?')) return
  await fetch(`http://localhost:3000/books/delete/${id}`, { method: 'DELETE' })
  await fetchBooks()
}
</script>

<template>
  <div class="page">

    <div class="header">
      <h1>Books</h1>
      <button class="add-btn" @click="openCreate">Add Book</button>
    </div>

    <p v-if="loading" class="loading">Loading...</p>

    <table v-else class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Editor</th>
          <th>Year</th>
          <th>Author</th>
          <th>Image</th>
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.editor }}</td>
          <td>{{ book.year }}</td>
          <td>{{ getAuthorName(book.authorId) }}</td>
          <td class="image-url">{{ book.image }}</td>
          <td>
            <button class="icon-btn" @click="deleteBook(book.id)">✂</button>
          </td>
          <td>
            <button class="icon-btn" @click="openEdit(book)">✎</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showForm" class="modal">
      <div class="modal-content">

        <h2 class="modal-title">
          {{ editingBook ? 'Edit Book' : 'Add Book' }}
        </h2>

        <div class="form-group">
          <label>Title</label>
          <input v-model="form.title" placeholder="Enter title" />
        </div>

        <div class="form-group">
          <label>Year</label>
          <input v-model="form.year" type="number" placeholder="2026" />
        </div>

        <div class="form-group">
          <label>Editor</label>
          <input v-model="form.editor" placeholder="Editor name" />
        </div>

        <div class="form-group">
          <label>Image URL</label>
          <input v-model="form.image" placeholder="https://..." />
        </div>

        <!-- ✅ MODIFIÉ : retiré v-if="!editingBook" → visible en création ET édition -->
        <div class="form-group">
          <label>Author</label>
          <select v-model="form.authorId">
            <option :value="null" disabled>Select Author</option>
            <option v-for="a in authors" :key="a.id" :value="a.id">
              {{ a.prenom }} {{ a.nom }}
            </option>
          </select>
        </div>

        <div class="modal-actions">
          <button class="btn save" @click="submitForm">
            {{ editingBook ? 'Save Changes' : 'Create Book' }}
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

.add-btn {
  background-color: #2b6cb0;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: #f5f5f5;
}

.table th {
  background: #e0e0e0;
  padding: 10px;
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

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 5px;
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

.form-group input,
.form-group select {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  transition: 0.2s;
}

.form-group input:focus,
.form-group select:focus {
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
</style>