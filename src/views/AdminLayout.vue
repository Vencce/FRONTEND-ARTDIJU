<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const logout = () => {
  localStorage.removeItem('access_token')
  router.push('/login')
}
</script>

<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Art Di Ju</h2>
        <span class="badge">Painel Admin</span>
      </div>
      
      <nav class="sidebar-nav">
        <router-link 
          to="/admin" 
          class="nav-item"
          :class="{ active: route.name === 'admin-analytics' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          Métricas
        </router-link>

        <router-link 
          to="/admin/produtos" 
          class="nav-item" 
          :class="{ active: route.name === 'admin-produtos' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          Produtos
        </router-link>
      </nav>
      
      <div class="sidebar-footer">
        <button class="btn-logout" @click="logout">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          Sair
        </button>
      </div>
    </aside>

    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f1f5f9;
}

.sidebar {
  width: 260px;
  background: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 50;
}

.sidebar-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #334155;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 900;
  color: #f8fafc;
  letter-spacing: -0.5px;
}

.badge {
  background: #E8A2C1;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  align-self: flex-start;
  letter-spacing: 0.5px;
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1rem;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.nav-item svg {
  width: 20px;
  height: 20px;
}

.nav-item:hover {
  background: #334155;
  color: white;
  transform: translateX(4px);
}

.nav-item.active {
  background: #E8A2C1;
  color: white;
  box-shadow: 0 4px 12px rgba(232, 162, 193, 0.3);
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid #334155;
}

.btn-logout {
  width: 100%;
  padding: 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-logout svg {
  width: 18px;
  height: 18px;
}

.btn-logout:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.main-content {
  flex: 1;
  overflow-y: auto;
  height: 100vh;
  position: relative;
}
</style>