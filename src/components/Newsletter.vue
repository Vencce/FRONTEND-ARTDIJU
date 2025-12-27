<script setup>
import { ref } from 'vue'
import axios from 'axios'
import SuccessModal from '@/components/SuccessModal.vue'

const email = ref('')
const showModal = ref(false)
const modalMessage = ref('')
const isLoading = ref(false)

const subscribe = async () => {
  if (!email.value) return
  isLoading.value = true
  try {
    await axios.post('http://127.0.0.1:8000/api/subscribe/', { email: email.value })
    modalMessage.value = `O e-mail ${email.value} foi cadastrado com sucesso!`
    showModal.value = true
    email.value = ''
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert('Este e-mail já está cadastrado!')
    } else {
      alert('Erro ao cadastrar. Tente novamente.')
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="newsletter-wrapper">
    <div class="blob blob-left"></div>
    <div class="blob blob-right"></div>

    <div class="newsletter-card">
      <div class="icon-mail">📩</div>
      <div class="text-content">
        <h2>Fique por dentro das novidades</h2>
        <p>
          Cadastre-se para receber ofertas exclusivas, lançamentos e um pouco de arte na sua caixa
          de entrada.
        </p>
      </div>
      <form @submit.prevent="subscribe" class="subscribe-form">
        <div class="input-group">
          <input
            type="email"
            v-model="email"
            placeholder="Digite seu melhor e-mail..."
            required
            :disabled="isLoading"
          />
          <button type="submit" :disabled="isLoading">
            <span v-if="!isLoading">Cadastrar</span>
            <span v-else>Enviando...</span>
          </button>
        </div>
      </form>
      <p class="spam-note">Prometemos não enviar spam. Apenas coisas bonitas. ✨</p>
    </div>

    <SuccessModal
      :isOpen="showModal"
      title="Bem-vindo(a)!"
      :message="modalMessage"
      @close="showModal = false"
    />
  </section>
</template>

<style scoped>
.newsletter-wrapper {
  position: relative;
  padding: 6rem 1rem 8rem; 
  background-color: #ffffff; 
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.newsletter-card {
  position: relative;
  z-index: 10;
  background: white;
  width: 100%;
  max-width: 800px;
  padding: 3rem 2rem;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
}
.icon-mail {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: inline-block;
  background: #f0fdfa;
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.text-content h2 {
  font-size: 2rem;
  color: #1e293b;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}
.text-content p {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}
.subscribe-form {
  max-width: 500px;
  margin: 0 auto 1.5rem;
}
.input-group {
  position: relative;
  display: flex;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  padding: 0.4rem;
  transition: all 0.3s;
}
.input-group:focus-within {
  background: white;
  border-color: #5fc9f8;
  box-shadow: 0 0 0 4px rgba(95, 201, 248, 0.15);
}
.input-group input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  outline: none;
  color: #334155;
}
.input-group button {
  background: #1e293b;
  color: white;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.input-group button:hover:not(:disabled) {
  background: #334155;
  transform: translateX(2px);
}
.input-group button:disabled {
  background: #94a3b8;
  cursor: wait;
}
.spam-note {
  font-size: 0.85rem;
  color: #94a3b8;
  margin-bottom: 0;
}
.blob {
  position: absolute;
  filter: blur(80px);
  opacity: 0.5;
  border-radius: 50%;
  z-index: 1;
}
.blob-left {
  width: 300px;
  height: 300px;
  background: #e0f2fe;
  left: -50px;
  bottom: -50px;
}
.blob-right {
  width: 250px;
  height: 250px;
  background: #fce7f3;
  right: -50px;
  top: -50px;
}
@media (max-width: 600px) {
  .newsletter-card {
    padding: 2rem 1.5rem;
  }
  .input-group {
    flex-direction: column;
    border-radius: 12px;
    padding: 1rem;
    background: white;
  }
  .input-group input {
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }
  .input-group button {
    width: 100%;
  }
}
</style>
