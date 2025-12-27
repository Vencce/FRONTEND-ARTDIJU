<script setup>
import { useToastStore } from '@/stores/toastStore'

const store = useToastStore()
</script>

<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <div v-for="toast in store.toasts" :key="toast.id" class="toast-card" :class="toast.type">
        <div class="icon">
          <span v-if="toast.type === 'success'">✅</span>
          <span v-else-if="toast.type === 'error'">❌</span>
          <span v-else-if="toast.type === 'warning'">⚠️</span>
          <span v-else>ℹ️</span>
        </div>
        <div class="message">{{ toast.message }}</div>
        <button class="close-btn" @click="store.removeToast(toast.id)">&times;</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast-card {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  padding: 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-left: 5px solid #ccc;
  color: #2c3e50;
  font-weight: 500;
}

.toast-card.success {
  border-left-color: #25d366;
}
.toast-card.error {
  border-left-color: #e74c3c;
}
.toast-card.warning {
  border-left-color: #f1c40f;
}
.toast-card.info {
  border-left-color: #5fc9f8;
}

.close-btn {
  margin-left: auto;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #999;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
