<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  const success = await auth.login(username.value, password.value)
  isLoading.value = false

  if (success) {
    router.push('/admin')
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Área Restrita</h1>
      <p>Acesso exclusivo para administradores</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Usuário</label>
          <input v-model="username" type="text" placeholder="Seu usuário" required />
        </div>

        <div class="form-group">
          <label>Senha</label>
          <input v-model="password" type="password" placeholder="Sua senha" required />
        </div>

        <button type="submit" class="btn-login" :disabled="isLoading">
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
}

.login-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}
p {
  color: #6c757d;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.form-group {
  text-align: left;
  margin-bottom: 1.5rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}
input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
}
input:focus {
  border-color: #5fc9f8;
  outline: none;
}

.btn-login {
  width: 100%;
  padding: 0.8rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-login:hover {
  background-color: #1a252f;
}
.btn-login:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}
</style>
