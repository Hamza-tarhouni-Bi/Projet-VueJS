<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios'

const loading = ref(false)
const message = ref('')
const isError = ref(false)

const form = reactive({ username: '', email: '', password: '' })

const handleSignup = async () => {
  loading.value = true
  message.value = ''

  try {
    await axios.post('http://localhost:3000/auth/signup', {
      ...form,
      role: 'user',
    })

    message.value = 'Account created successfully'
    isError.value = false

    form.username = ''
    form.email = ''
    form.password = ''
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Signup failed'
    isError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">

    <form @submit.prevent="handleSignup" class="form">

      <!-- Username -->
      <div class="field">
        <label>Username</label>
        <input v-model="form.username" />
      </div>

      <!-- Email -->
      <div class="field">
        <label>Email</label>
        <input type="email" v-model="form.email" />
      </div>

      <!-- Password -->
      <div class="field">
        <label>Password</label>
        <input type="password" v-model="form.password" />
      </div>

      <!-- Register Button -->
      <div class="center">
        <button :disabled="loading">
          {{ loading ? 'Creating account...' : 'Register' }}
        </button>
      </div>

      <!-- Switch to Login -->
      <div class="center">
        <router-link to="/login" class="btn-link">
          Switch to Login
        </router-link>
      </div>

      <!-- Message -->
      <div v-if="message" class="message">
        <p :class="isError ? 'error' : 'success'">
          {{ message }}
        </p>
      </div>

    </form>

  </div>
</template>

<style scoped>
.page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  width: 80%;
  max-width: 800px;
}

.field {
  margin-bottom: 20px;
}

.field label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
}

.field input {
  width: 100%;
  padding: 8px;
  border: 1px solid #999;
  background-color: #f2f2f2;
  border-radius: 3px;
  outline: none;
}

.field input:focus {
  border-color: #2b6cb0;
}

.center {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

button,
.btn-link {
  background-color: #2b6cb0;
  color: white;
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
}

button:hover,
.btn-link:hover {
  background-color: #1e4e8c;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  text-align: center;
  margin-top: 15px;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>