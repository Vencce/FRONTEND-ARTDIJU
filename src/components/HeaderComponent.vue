<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBagStore } from '@/stores/bagStore'
import { RouterLink } from 'vue-router'
import Logo from '@/assets/imagens/logo.png'

const bag = useBagStore()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const bagCount = computed(() => bag.totalItems)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header class="site-header" :class="{ scrolled: isScrolled }">
    <div class="container header-content">
      <RouterLink to="/" class="logo-link">
        <img :src="Logo" alt="Art Di Ju" class="logo-img" />
      </RouterLink>

      <nav class="desktop-nav">
        <RouterLink to="/" class="nav-link">Vitrine</RouterLink>
        <RouterLink to="/sobre" class="nav-link">Sobre</RouterLink>
        <RouterLink to="/contato" class="nav-link">Contato</RouterLink>
      </nav>

      <div class="header-actions">
        <RouterLink to="/login" class="action-btn" title="Área do Cliente/Admin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </RouterLink>

        <button class="action-btn bag-btn" @click="bag.toggleBag">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span v-if="bagCount > 0" class="bag-badge">{{ bagCount }}</span>
        </button>

        <button class="mobile-toggle" @click="isMenuOpen = !isMenuOpen">
          <span class="bar" :class="{ open: isMenuOpen }"></span>
          <span class="bar" :class="{ open: isMenuOpen }"></span>
          <span class="bar" :class="{ open: isMenuOpen }"></span>
        </button>
      </div>
    </div>

    <Transition name="slide-down">
      <nav v-if="isMenuOpen" class="mobile-nav">
        <RouterLink to="/" class="mobile-link" @click="isMenuOpen = false">Vitrine</RouterLink>
        <RouterLink to="/sobre" class="mobile-link" @click="isMenuOpen = false"
          >Sobre a Marca</RouterLink
        >
        <RouterLink to="/contato" class="mobile-link" @click="isMenuOpen = false"
          >Fale Conosco</RouterLink
        >
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px); 
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.site-header.scrolled {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #f1f5f9;
  padding: 0.5rem 0; 
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .header-content {
    padding: 1rem 1.2rem; /* Menos padding lateral no mobile */
  }
}

/* Logo */
.logo-img {
  height: 50px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s;
}

@media (max-width: 480px) {
  .logo-img {
    height: 40px; /* Logo um pouco menor em telas muito pequenas */
  }
}

.logo-img:hover {
  transform: scale(1.05);
}

.desktop-nav {
  display: flex;
  gap: 2.5rem;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
}

.nav-link {
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #1e293b;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background: linear-gradient(90deg, #f687b3, #67e8f9);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .header-actions {
    gap: 0.8rem; /* Ícones mais próximos no mobile */
  }
}

.action-btn {
  background: none;
  border: none;
  color: #475569;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.action-btn:hover {
  background-color: #f1f5f9;
  color: #1e293b;
}

.action-btn svg {
  width: 26px;
  height: 26px;
}

.bag-btn {
  position: relative;
}
.bag-badge {
  position: absolute;
  top: 0;
  right: -2px;
  background: linear-gradient(135deg, #ef4444, #f87171);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  animation: bounce 0.3s ease;
}

@keyframes bounce {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem; /* Aumenta área de clique */
  z-index: 1001;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: #475569;
  border-radius: 3px;
  transition: all 0.3s;
}

.bar.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 6px);
}
.bar.open:nth-child(2) {
  opacity: 0;
}
.bar.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -6px);
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
  }
}

.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border-top: 1px solid #f1f5f9;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.mobile-link {
  text-decoration: none;
  color: #475569;
  padding: 1rem 2rem;
  font-weight: 500;
  border-left: 4px solid transparent;
  transition: all 0.2s;
  font-size: 1.1rem; /* Texto maior para toque */
}

.mobile-link:hover,
.mobile-link.router-link-active {
  background-color: #f8fafc;
  color: #1e293b;
  border-left-color: #67e8f9;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
  opacity: 1;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
</style>