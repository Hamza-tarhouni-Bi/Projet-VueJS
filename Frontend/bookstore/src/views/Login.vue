<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(false)
const message = ref('')
const isError = ref(false)
const showPassword = ref(false)
const submitted = ref(false)

const form = reactive({ identifiant: '', password: '' })

const errors = computed(() => ({
  identifiant: !form.identifiant.trim() ? 'Username is required' : '',
  password: !form.password ? 'Password is required' : '',
}))

const isValid = computed(() => !errors.value.identifiant && !errors.value.password)

const handleLogin = async () => {
  submitted.value = true
  if (!isValid.value) return

  loading.value = true
  message.value = ''

  try {
    const res = await axios.post('http://localhost:3000/auth/signin', form)

    if (res.data.role === 'admin') {
      message.value = 'Admins must login via the admin portal. Redirecting...'
      isError.value = true
      setTimeout(() => router.push('/admin/login'), 1500)
      return
    }

    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('username', res.data.username)
    localStorage.setItem('role', res.data.role)
    localStorage.setItem('userId', res.data.id)

    router.push('/home')
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Login failed ❌'
    isError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    <form @submit.prevent="handleLogin" class="form">

      <div class="field">
        <label>Username</label>
        <input v-model="form.identifiant" :class="{ invalid: submitted && errors.identifiant }" />
        <span class="err" v-if="submitted && errors.identifiant">{{ errors.identifiant }}</span>
      </div>

      <div class="field">
        <label>Password</label>
        <div class="password-field">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            :class="{ invalid: submitted && errors.password }"
          />
          <span class="toggle" @click="showPassword = !showPassword">
            {{ showPassword ? '🙈' : '👁️' }}
          </span>
        </div>
        <span class="err" v-if="submitted && errors.password">{{ errors.password }}</span>
      </div>

      <div class="center">
        <button :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </div>

      <div class="center">
        <router-link to="/signup" class="btn-link">Switch to Register</router-link>
      </div>

      <div v-if="message" class="message">
        <p :class="isError ? 'error' : 'success'">{{ message }}</p>
      </div>

    </form>
  </div>
</template>

<style scoped>
.page { height: 100vh; display: flex; justify-content: center; align-items: center; }
.form { width: 80%; max-width: 800px; }
.field { margin-bottom: 20px; }
.field label { display: block; margin-bottom: 5px; color: #333; font-weight: 500; }
.field input { width: 100%; padding: 8px; border: 1px solid #999; background-color: #f2f2f2; border-radius: 3px; outline: none; }
.field input:focus { border-color: #2b6cb0; }
.field input.invalid { border-color: red; }
.err { color: red; font-size: 12px; margin-top: 4px; display: block; }
.password-field { position: relative; }
.password-field input { width: 100%; padding-right: 40px; }
.toggle { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; user-select: none; font-size: 18px; }
.center { display: flex; justify-content: center; margin-top: 15px; }
button, .btn-link { background-color: #2b6cb0; color: white; padding: 8px 20px; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; font-size: 14px; }
button:hover, .btn-link:hover { background-color: #1e4e8c; }
button:disabled { opacity: 0.6; cursor: not-allowed; }
.message { text-align: center; margin-top: 15px; }
.error { color: red; }
.success { color: green; }
</style>