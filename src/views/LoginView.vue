<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const router = useRouter()

const login = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Preencha todos os campos.'
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const response = await axios.post('https://artdiju-backend.onrender.com/api/token/', {
      username: username.value,
      password: password.value
    })
    
    localStorage.setItem('access_token', response.data.access)
    
    if (response.data.refresh) {
      localStorage.setItem('refresh_token', response.data.refresh)
    }
    
    router.push('/admin')
  } catch (error) {
    errorMessage.value = 'Usuário ou senha inválidos.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>Art Di Ju</h1>
        <p>Acesso ao Painel Administrativo</p>
      </div>

      <form @submit.prevent="login" class="login-form">
        <div class="input-group">
          <label for="username">Usuário</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            placeholder="Digite seu usuário"
            required
          />
        </div>

        <div class="input-group">
          <label for="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Digite sua senha"
            required
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="login-button" :disabled="isLoading">
          <span v-if="isLoading">Entrando...</span>
          <span v-else>Entrar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f9;
  padding: 20px;
}

.login-card {
  background: white;
  width: 100%;
  max-width: 420px;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  padding: 40px 30px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.login-header p {
  color: #64748b;
  font-size: 0.95rem;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
}

.input-group input {
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease;
  background-color: #f8fafc;
  color: #0f172a;
}

.input-group input:focus {
  border-color: #E8A2C1;
  box-shadow: 0 0 0 3px rgba(232, 162, 193, 0.2);
  background-color: white;
}

.input-group input::placeholder {
  color: #94a3b8;
}

.error-message {
  background-color: #fef2f2;
  color: #ef4444;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  font-weight: 500;
  border: 1px solid #fecaca;
}

.login-button {
  background-color: #E8A2C1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 10px;
}

.login-button:hover:not(:disabled) {
  background-color: #d18ba8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(232, 162, 193, 0.4);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }
  
  .login-header h1 {
    font-size: 1.75rem;
  }
}
</style>