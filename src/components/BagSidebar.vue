<script setup>
import { useBagStore } from '@/stores/bagStore'

const bag = useBagStore()

const formatPrice = (value) => {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
</script>

<template>
  <div class="bag-wrapper">
    <Transition name="fade">
      <div v-if="bag.isBagOpen" class="bag-overlay" @click="bag.toggleBag"></div>
    </Transition>

    <Transition name="slide">
      <aside v-if="bag.isBagOpen" class="bag-sidebar">
        <header class="bag-header">
          <h2>
            Minha Sacola <span>({{ bag.totalItems }})</span>
          </h2>
          <button class="close-btn" @click="bag.toggleBag">&times;</button>
        </header>

        <div class="bag-body">
          <div v-if="bag.items.length === 0" class="empty-state">
            <div class="empty-icon">🛍️</div>
            <p>Sua sacola está vazia.</p>
            <button @click="bag.toggleBag" class="btn-shop">Ver Produtos</button>
          </div>

          <ul v-else class="items-list">
            <li v-for="item in bag.items" :key="item.id" class="bag-item">
              <div class="item-image">
                <img :src="item.image || 'https://via.placeholder.com/80'" :alt="item.name" />
              </div>

              <div class="item-details">
                <div class="item-info">
                  <h3>{{ item.name }}</h3>
                  <p class="item-category">{{ item.category }}</p>
                  <p class="item-price">{{ formatPrice(item.promo_price || item.price) }}</p>
                </div>

                <div class="item-actions">
                  <div class="quantity-control">
                    <button @click="bag.updateQuantity(item.id, -1)" :disabled="item.quantity <= 1">
                      -
                    </button>
                    <span>{{ item.quantity }}</span>
                    <button @click="bag.updateQuantity(item.id, 1)">+</button>
                  </div>

                  <button
                    class="btn-remove"
                    @click="bag.removeFromBag(item.id)"
                    title="Remover item"
                  >
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <footer class="bag-footer" v-if="bag.items.length > 0">
          <div class="summary-row">
            <span>Total Estimado</span>
            <span class="total-value">{{ formatPrice(bag.totalPrice) }}</span>
          </div>

          <a :href="bag.whatsappLink" target="_blank" class="btn-checkout">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path
                d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"
              />
            </svg>
            Finalizar no WhatsApp
          </a>

          <button class="btn-keep-shopping" @click="bag.toggleBag">Continuar comprando</button>
        </footer>
      </aside>
    </Transition>
  </div>
</template>

<style scoped>
.bag-wrapper {
  position: relative;
  z-index: 5000;
}

.bag-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}

.bag-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.bag-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}

.bag-header h2 {
  font-size: 1.25rem;
  color: #1e293b;
  font-weight: 700;
  margin: 0;
}

.bag-header h2 span {
  color: #64748b;
  font-weight: 400;
  font-size: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  color: #94a3b8;
  cursor: pointer;
  transition: color 0.2s;
}
.close-btn:hover {
  color: #ef4444;
}

.bag-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  background: #f8fafc;
}

.empty-state {
  text-align: center;
  margin-top: 3rem;
  color: #64748b;
}
.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}
.btn-shop {
  margin-top: 1.5rem;
  background: #1e293b;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
}

.items-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bag-item {
  display: flex;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s;
}

.item-image img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-info h3 {
  font-size: 0.95rem;
  color: #1e293b;
  margin: 0 0 0.2rem 0;
  font-weight: 600;
}

.item-category {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  margin: 0 0 0.4rem 0;
}

.item-price {
  font-weight: 700;
  color: #1e293b;
  font-size: 0.95rem;
}

.item-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  background: #f8fafc;
}

.quantity-control button {
  background: none;
  border: none;
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: #475569;
  font-weight: 700;
  transition: background 0.2s;
}

.quantity-control button:hover:not(:disabled) {
  background: #e2e8f0;
}

.quantity-control span {
  padding: 0 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
  min-width: 24px;
  text-align: center;
}

.btn-remove {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}
.btn-remove:hover {
  background: #fee2e2;
}
.btn-remove svg {
  width: 18px;
  height: 18px;
}

.bag-footer {
  padding: 1.5rem;
  background: white;
  border-top: 1px solid #e2e8f0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.total-value {
  font-weight: 800;
  color: #1e293b;
  font-size: 1.25rem;
}

.btn-checkout {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  background: #25d366;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  transition:
    transform 0.2s,
    background 0.2s;
  margin-bottom: 0.8rem;
}

.btn-checkout:hover {
  background: #1ebc57;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
}

.btn-checkout svg {
  width: 20px;
  height: 20px;
}

.btn-keep-shopping {
  background: none;
  border: none;
  width: 100%;
  color: #64748b;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
}
.btn-keep-shopping:hover {
  color: #1e293b;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
