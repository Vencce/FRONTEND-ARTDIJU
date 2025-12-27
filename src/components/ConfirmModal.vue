<script setup>
defineProps({
  isOpen: Boolean,
  title: {
    type: String,
    default: 'Tem certeza?',
  },
  message: {
    type: String,
    default: 'Essa ação não pode ser desfeita.',
  },
})

const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
      <div class="confirm-card">
        <div class="icon-warning">
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
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h3>{{ title }}</h3>
        <p>{{ message }}</p>

        <div class="actions">
          <button class="btn-cancel" @click="$emit('close')">Cancelar</button>
          <button class="btn-confirm" @click="$emit('confirm')">Sim, Excluir</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  padding: 1rem;
}

.confirm-card {
  background: white;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
  animation: popIn 0.2s ease-out;
}

.icon-warning {
  background-color: #fef2f2;
  color: #ef4444;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.icon-warning svg {
  width: 30px;
  height: 30px;
}

h3 {
  font-size: 1.25rem;
  color: #1e293b;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

p {
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-cancel {
  background: white;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
}

.btn-cancel:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
}

.btn-confirm {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  flex: 1;
  box-shadow: 0 4px 6px rgba(239, 68, 68, 0.2);
}

.btn-confirm:hover {
  background: #dc2626;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
