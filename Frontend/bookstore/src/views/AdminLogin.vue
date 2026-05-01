<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const message = ref('')
const isError = ref(false)
const showPassword = ref(false)

const form = reactive({ identifiant: '', password: '' })

const handleLogin = async () => {
  loading.value = true
  message.value = ''
  isError.value = false

  try {
    const res = await axios.post('http://localhost:3000/auth/signin', form)

    if (res.data.role !== 'admin') {
      message.value = 'Access denied: Administrators only'
      isError.value = true
      return
    }

    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('username', res.data.username)
    localStorage.setItem('role', res.data.role)
    localStorage.setItem('userId', res.data.id)

    router.push('/admin/books')
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Admin login failed'
    isError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">

    <!-- Left Panel -->
    <div class="left">
      <div class="brand">
        <div class="logo">📚</div>
        <h1>BookShop</h1>
        <p>Admin Management Portal</p>
      </div>
      <div class="decoration">
        <div class="circle c1"></div>
        <div class="circle c2"></div>
        <div class="circle c3"></div>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="right">
      <div class="card">

        <div class="card-header">
          <div class="shield">🛡️</div>
          <h2>Admin Sign In</h2>
          <p>Enter your credentials to access the dashboard</p>
        </div>

        <form @submit.prevent="handleLogin" class="form">

          <div class="field">
            <label>Username</label>
            <div class="input-wrapper">
              <span class="icon">👤</span>
              <input v-model="form.identifiant" type="text" placeholder="Enter your username" />
            </div>
          </div>

          <div class="field">
            <label>Password</label>
            <div class="input-wrapper">
              <span class="icon">🔒</span>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                placeholder="Enter your password"
              />
              <span class="toggle" @click="showPassword = !showPassword">
                {{ showPassword ? '🙈' : '👁️' }}
              </span>
            </div>
          </div>

          <button type="submit" :disabled="loading" class="btn">
            <span v-if="loading" class="spinner"></span>
            {{ loading ? 'Authenticating...' : 'Sign In' }}
          </button>

          <div v-if="message" :class="['message', isError ? 'error' : 'success']">
            {{ message }}
          </div>

        </form>

        <div class="card-footer">
          <router-link to="/login">← Return to User Login</router-link>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
}

/* ===== LEFT PANEL ===== */
.left {
  width: 45%;
  background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.brand {
  text-align: center;
  color: white;
  z-index: 1;
}

.logo {
  font-size: 64px;
  margin-bottom: 16px;
}

.brand h1 {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.brand p {
  font-size: 15px;
  opacity: 0.75;
  letter-spacing: 0.5px;
}

/* Decorative circles */
.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
}
.c1 { width: 300px; height: 300px; top: -80px; left: -80px; }
.c2 { width: 200px; height: 200px; bottom: 40px; right: -60px; }
.c3 { width: 150px; height: 150px; bottom: 200px; left: 20px; }

/* ===== RIGHT PANEL ===== */
.right {
  width: 55%;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.card-header {
  text-align: center;
  margin-bottom: 2rem;
}

.shield {
  font-size: 40px;
  margin-bottom: 12px;
}

.card-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
}

.card-header p {
  font-size: 13px;
  color: #94a3b8;
}

/* ===== FORM ===== */
.form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper .icon {
  position: absolute;
  left: 12px;
  font-size: 15px;
}

.input-wrapper input {
  width: 100%;
  padding: 11px 40px 11px 38px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  background-color: #f8fafc;
  transition: 0.2s;
  color: #0f172a;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #2563eb;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.toggle {
  position: absolute;
  right: 12px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
}

/* ===== BUTTON ===== */
.btn {
  margin-top: 8px;
  padding: 12px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn:hover {
  background: linear-gradient(135deg, #1d4ed8, #1e3a8a);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ===== MESSAGE ===== */
.message {
  text-align: center;
  font-size: 13px;
  padding: 10px 14px;
  border-radius: 8px;
}

.error {
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.success {
  background-color: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

/* ===== FOOTER ===== */
.card-footer {
  text-align: center;
  margin-top: 1.5rem;
}

.card-footer a {
  font-size: 13px;
  color: #64748b;
  text-decoration: none;
  transition: 0.2s;
}

.card-footer a:hover {
  color: #2563eb;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .page { flex-direction: column; }
  .left { width: 100%; min-height: 200px; }
  .right { width: 100%; }
}
</style>