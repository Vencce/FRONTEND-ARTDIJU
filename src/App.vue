<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import WhatsappButton from '@/components/WhatsappButton.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import BagSidebar from '@/components/BagSidebar.vue'
</script>

<template>
  <div class="app-wrapper">
    <HeaderComponent />
    <div class="content">
      <RouterView />
    </div>
    <FooterComponent />
    <WhatsappButton />
    <ToastContainer />
    <BagSidebar />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
}

.content {
  flex: 1;
  width: 100%;
}
</style>
