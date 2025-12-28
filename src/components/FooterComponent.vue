<script setup>
import Logo from '@/assets/imagens/logo.png'
</script>

<template>
  <footer class="site-footer">
    <div class="footer-wave">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>

    <div class="footer-content container">
      <div class="footer-col brand-col">
        <img :src="Logo" alt="Art Di Ju" class="footer-logo" />
        <p>Transformando ideias em arte e presentes únicos para quem você ama.</p>
        <div class="social-links">
          <a href="#" class="social-icon">Instagram</a>
          <a href="#" class="social-icon">Facebook</a>
          <a href="#" class="social-icon">WhatsApp</a>
        </div>
      </div>

      <div class="footer-col links-col">
        <h3>Navegação</h3>
        <ul>
          <li><RouterLink to="/">Vitrine</RouterLink></li>
          <li><RouterLink to="/sobre">Nossa História</RouterLink></li>
          <li><RouterLink to="/contato">Fale Conosco</RouterLink></li>
          <li><RouterLink to="/login">Área do Admin</RouterLink></li>
        </ul>
      </div>

      <div class="footer-col contact-col">
        <h3>Atendimento</h3>
        <p>📍 São Franscisco do Sul, SC</p>
        <p>📧 contato@artdiju.com.br</p>
        <p>📱 (11) 99999-9999</p>
        <p class="hours">Seg a Sex: 09h às 18h</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} ArtDiJu. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #1e293b;
  color: #f8fafc;
  position: relative;
  margin-top: 0;
}

.footer-wave {
  position: absolute;
  top: -1px; 
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(0deg);
  z-index: 1; 
}

.footer-wave svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 60px;
}

.footer-wave .shape-fill {
  fill: #ffffff;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 3rem;
  position: relative;
  z-index: 2;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2.5rem;
    padding: 3rem 1.5rem 2rem; /* Menos padding lateral e superior */
  }
  .social-links {
    justify-content: center;
  }
  .footer-col {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
}

.footer-col h3 {
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
  color: #5fc9f8;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.footer-col p {
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}
.footer-logo {
  height: 50px;
  object-fit: contain;
  margin-bottom: 1rem;
  filter: brightness(0) invert(1);
  opacity: 0.9;
}
.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap; /* Permite quebrar linha em telas muito pequenas */
  justify-content: center;
}
.social-icon {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s;
}
.social-icon:hover {
  background: #5fc9f8;
  border-color: #5fc9f8;
  color: #1e293b;
}
.links-col ul {
  list-style: none;
  padding: 0;
}
.links-col li {
  margin-bottom: 0.8rem;
}
.links-col a {
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.2s;
  display: inline-block; /* Melhor área de toque */
  padding: 2px 0;
}
.links-col a:hover {
  color: #5fc9f8;
  padding-left: 5px;
}

/* No mobile, removemos o efeito de padding-left no hover para não "dançar" o texto centralizado */
@media (max-width: 768px) {
  .links-col a:hover {
    padding-left: 0; 
  }
}

.contact-col .hours {
  margin-top: 1rem;
  font-size: 0.85rem;
  opacity: 0.6;
}
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  padding: 1.5rem;
  font-size: 0.85rem;
  color: #64748b;
  background-color: #0f172a;
}
</style>