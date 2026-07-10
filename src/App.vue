<script setup>
import { useRoute } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import BagSidebar from '@/components/BagSidebar.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import WhatsappButton from '@/components/WhatsappButton.vue'

const route = useRoute()
</script>

<template>
  <div class="app-container">
    <HeaderComponent v-if="!route.path.startsWith('/admin') && route.path !== '/login'" />
    
    <router-view />
    
    <FooterComponent v-if="!route.path.startsWith('/admin') && route.path !== '/login'" />
    <BagSidebar v-if="!route.path.startsWith('/admin') && route.path !== '/login'" />
    <WhatsappButton v-if="!route.path.startsWith('/admin') && route.path !== '/login'" />
    
    <ToastContainer />
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>