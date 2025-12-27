import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToastStore } from '@/stores/toastStore'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('access_token') || null)
  const router = useRouter()
  const toast = useToastStore()

  const API_URL = 'https://artdiju-backend.onrender.com/api/token/'

  async function login(username, password) {
    try {
      const response = await axios.post(API_URL, {
        username: username,
        password: password,
      })

      token.value = response.data.access
      localStorage.setItem('access_token', response.data.access)
      localStorage.setItem('refresh_token', response.data.refresh)

      toast.addToast(`Bem-vindo, ${username}!`, 'success')
      return true
    } catch (error) {
      console.error('Erro de login:', error)
      toast.addToast('Usuário ou senha incorretos.', 'error')
      return false
    }
  }

  function logout() {
    token.value = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    toast.addToast('Você saiu do sistema.', 'info')

    if (router) router.push('/login')
    else window.location.href = '/login'
  }

  return { token, login, logout }
})
