<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import axios from 'axios'

const loading = ref(false)
const message = ref('')
const isError = ref(false)
const showPassword = ref(false)
const submitted = ref(false)

const form = reactive({ username: '', email: '', password: '' })

const errors = computed(() => ({
  username: !form.username.trim()
    ? 'Username is required'
    : form.username.length < 3 ? 'Minimum 3 characters' : '',

  email: !form.email.trim()
    ? 'Email is required'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'Invalid email format' : '',

  password: !form.password
    ? 'Password is required'
    : form.password.length < 6 ? 'Minimum 6 characters' : '',
}))

const isValid = computed(() => !errors.value.username && !errors.value.email && !errors.value.password)

const handleSignup = async () => {
  submitted.value = true
  if (!isValid.value) return

  loading.value = true
  message.value = ''

  try {
    await axios.post('http://localhost:3000/auth/signup', { ...form, role: 'user' })
    message.value = 'Account created successfully ✅'
    isError.value = false
    form.username = ''
    form.email = ''
    form.password = ''
    submitted.value = false
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Signup failed ❌'
    isError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    <form @submit.prevent="handleSignup" class="form">

      <div class="field">
        <label>Username</label>
        <input v-model="form.username" :class="{ invalid: submitted && errors.username }" />
        <span class="err" v-if="submitted && errors.username">{{ errors.username }}</span>
      </div>

      <div class="field">
        <label>Email</label>
        <input type="email" v-model="form.email" :class="{ invalid: submitted && errors.email }" />
        <span class="err" v-if="submitted && errors.email">{{ errors.email }}</span>
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
          {{ loading ? 'Creating account...' : 'Register' }}
        </button>
      </div>

      <div class="center">
        <router-link to="/login" class="btn-link">Switch to Login</router-link>
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