<script setup>
import { ref } from 'vue'

const name = ref('')
const subject = ref('')
const message = ref('')

const sendMessage = () => {
  if (!name.value || !message.value) return alert('Por favor, preencha seu nome e a mensagem.')

  const text = `Olá! Me chamo *${name.value}*.\nAssunto: ${subject.value || 'Contato via Site'}\n\n${message.value}`
  const link = `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`

  window.open(link, '_blank')
}
</script>

<template>
  <main class="contact-page">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>

    <div class="container relative-z">
      <div class="contact-card">
        <div class="info-side">
          <div>
            <h1>Vamos conversar?</h1>
            <p class="intro">
              Tem alguma dúvida, quer um orçamento personalizado ou apenas dar um oi? Estamos
              prontos para te atender.
            </p>
          </div>

          <div class="contact-items">
            <div class="item">
              <span class="icon">📍</span>
              <div>
                <h3>Atelier</h3>
                <p>São Paulo, SP - Entregas em todo o Brasil</p>
              </div>
            </div>
            <div class="item">
              <span class="icon">💌</span>
              <div>
                <h3>E-mail</h3>
                <p>contato@artdiju.com.br</p>
              </div>
            </div>
            <div class="item">
              <span class="icon">💬</span>
              <div>
                <h3>WhatsApp</h3>
                <p>(11) 99999-9999</p>
              </div>
            </div>
          </div>

          <div class="social-row">
            <a href="#" class="social-link">Instagram</a>
            <a href="#" class="social-link">Facebook</a>
          </div>
        </div>

        <div class="form-side">
          <form @submit.prevent="sendMessage">
            <div class="form-group">
              <label>Seu Nome</label>
              <input v-model="name" type="text" placeholder="Ex: Maria Silva" required />
            </div>

            <div class="form-group">
              <label>Assunto</label>
              <div class="select-wrapper">
                <select v-model="subject">
                  <option value="" disabled selected>Sobre o que é?</option>
                  <option value="Orçamento">Quero um Orçamento</option>
                  <option value="Dúvida">Dúvida sobre Produto</option>
                  <option value="Personalizado">Pedido Personalizado</option>
                  <option value="Outros">Outros assuntos</option>
                </select>
                <span class="arrow">▼</span>
              </div>
            </div>

            <div class="form-group">
              <label>Sua Mensagem</label>
              <textarea
                v-model="message"
                rows="5"
                placeholder="Conte mais detalhes..."
                required
              ></textarea>
            </div>

            <button type="submit" class="btn-whatsapp">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"
                />
              </svg>
              Enviar para WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contact-page {
  background-color: #ffffff;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  position: relative;
  overflow: hidden;
}

.container {
  width: 100%;
  max-width: 1100px;
}
.relative-z {
  position: relative;
  z-index: 10;
}

.blob {
  position: absolute;
  filter: blur(100px);
  opacity: 0.5;
  border-radius: 50%;
  z-index: 1;
}
.blob-1 {
  top: -10%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: #e0f2fe;
}
.blob-2 {
  bottom: -10%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: #fce7f3;
}

@media (max-width: 768px) {
  .blob {
    width: 300px;
    height: 300px;
    filter: blur(70px);
  }
}

.contact-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid #f1f5f9;
}

@media (min-width: 850px) {
  .contact-card {
    grid-template-columns: 2fr 3fr;
    min-height: 500px;
  }
}

.info-side {
  background: #1e293b;
  color: white;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

@media (max-width: 768px) {
  .info-side {
    padding: 2rem;
  }
}

.info-side::before {
  content: '';
  position: absolute;
  top: -50px;
  left: -50px;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
}

.info-side h1 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  line-height: 1.1;
  font-weight: 700;
}
@media (max-width: 768px) {
  .info-side h1 {
    font-size: 1.8rem;
  }
}

.intro {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 3rem;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}
.icon {
  font-size: 1.4rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.8rem;
  border-radius: 12px;
  height: fit-content;
}
.item h3 {
  font-size: 0.95rem;
  color: #5fc9f8;
  margin-bottom: 0.2rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.item p {
  color: #e2e8f0;
  font-size: 0.95rem;
}

.social-row {
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
}
.social-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.2s;
}
.social-link:hover {
  color: #5fc9f8;
}

.form-side {
  padding: 3rem;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 768px) {
  .form-side {
    padding: 1.5rem; /* Padding reduzido no mobile */
  }
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-group label {
  font-weight: 600;
  color: #334155;
  font-size: 0.9rem;
}

input,
select,
textarea {
  width: 100%;
  padding: 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 1rem;
  color: #1e293b;
  outline: none;
  transition: all 0.2s;
  appearance: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #5fc9f8;
  background: white;
  box-shadow: 0 0 0 4px rgba(95, 201, 248, 0.1);
}

.select-wrapper {
  position: relative;
}
.select-wrapper .arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  pointer-events: none;
  font-size: 0.8rem;
}

.btn-whatsapp {
  width: 100%;
  padding: 1rem;
  background: #25d366;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(37, 211, 102, 0.2);
}

.btn-whatsapp:hover {
  background: #1ebc57;
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(37, 211, 102, 0.3);
}
</style>