<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useBagStore } from '@/stores/bagStore'

const props = defineProps({
  isOpen: Boolean,
  product: Object
})

const emit = defineEmits(['close'])
const bag = useBagStore()
const copyFeedback = ref(false)

const shareProduct = () => {
  if (!props.product) return
  const text = `Olha que lindo esse produto da Art Di Ju: ${props.product.name} por R$ ${Number(props.product.price).toFixed(2)}!`
  navigator.clipboard.writeText(text).then(() => {
    copyFeedback.value = true
    setTimeout(() => copyFeedback.value = false, 2000)
  })
}

const handleAddBag = () => {
  if (props.product) {
    bag.addToBag(props.product)
    emit('close')
  }
}
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
      <div class="product-modal">
        
        <div class="top-actions">
          <button class="action-btn share" @click="shareProduct" title="Copiar link">
            <span v-if="copyFeedback" class="feedback-text">Copiado!</span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
          </button>
          
          <button class="action-btn close" @click="$emit('close')" title="Fechar">
            &times;
          </button>
        </div>

        <div class="modal-content" v-if="product">
          <div class="modal-image-col">
            <div class="image-container">
              <img :src="product.image || 'https://via.placeholder.com/400'" :alt="product.name">
              
              <span v-if="product.is_sold" class="status-badge sold">VENDIDO</span>
              <span v-else class="status-badge available">DISPONÍVEL</span>
            </div>
          </div>

          <div class="modal-details-col">
            <div class="details-header">
              <span class="category-pill">{{ product.category }}</span>
              <h2 class="title">{{ product.name }}</h2>
            </div>
            
            <div class="price-row">
              <div class="price-wrapper">
                <span class="currency">R$</span>
                <span class="value">{{ Number(product.price).toFixed(2).replace('.', ',') }}</span>
              </div>
              <span class="dimensions-pill" v-if="product.dimensions">{{ product.dimensions }}</span>
            </div>

            <div class="description-box">
              <h3>Detalhes</h3>
              <p>{{ product.description || 'Produto artesanal exclusivo, feito à mão com materiais de alta qualidade.' }}</p>
            </div>

            <div class="modal-footer">
              <button 
                class="btn-add-bag" 
                @click="handleAddBag"
                :disabled="product.is_sold"
                :class="{ disabled: product.is_sold }"
              >
                <span class="icon" v-if="!product.is_sold">🛍️</span>
                {{ product.is_sold ? 'Indisponível (Vendido)' : 'Adicionar à Sacola' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
  display: flex; justify-content: center; align-items: center; 
  z-index: 4000; padding: 1rem;
}

.product-modal {
  background: white; width: 100%; max-width: 900px;
  border-radius: 24px; overflow: hidden; position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 90vh; /* Garante que cabe na tela do celular */
  display: flex;
  flex-direction: column;
}

.top-actions {
  position: absolute; top: 1.5rem; right: 1.5rem;
  display: flex; gap: 0.8rem; z-index: 20;
}

.action-btn {
  background: white; border: none; width: 42px; height: 42px;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.2s, background 0.2s; color: #64748b;
  font-size: 1.5rem; line-height: 0;
}

.action-btn:hover { transform: scale(1.1); color: #1e293b; background: #f8fafc; }
.action-btn.share svg { width: 22px; height: 22px; }
.action-btn.close { font-size: 2rem; color: #ef4444; }
.action-btn.close:hover { background: #fef2f2; }

.feedback-text { font-size: 0.6rem; color: #22c55e; font-weight: 700; }

.modal-content { 
  display: grid; 
  grid-template-columns: 1fr; 
  overflow-y: auto; /* Permite rolar se o conteúdo for grande */
}
@media (min-width: 768px) { 
  .modal-content { grid-template-columns: 1.2fr 1fr; overflow-y: hidden; } 
  .product-modal { height: auto; }
}

.modal-image-col { background: #f1f5f9; display: flex; align-items: center; justify-content: center; padding: 2rem; }
.image-container { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.image-container img { max-width: 100%; max-height: 500px; object-fit: contain; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }

@media (max-width: 768px) {
  .modal-image-col { padding: 3rem 1rem 1rem; } /* Espaço para o botão fechar */
  .image-container img { max-height: 300px; }
}

.status-badge {
  position: absolute; top: -10px; left: -10px;
  padding: 8px 16px; border-radius: 30px;
  font-weight: 800; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2); z-index: 10;
}
.status-badge.sold { background: #ef4444; color: white; }
.status-badge.available { background: #22c55e; color: white; }

.modal-details-col { padding: 3rem 2.5rem; display: flex; flex-direction: column; }
@media (max-width: 768px) {
  .modal-details-col { padding: 1.5rem; }
}

.details-header { margin-bottom: 1.5rem; }
.category-pill { background: #e0f2fe; color: #0284c7; padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; margin-bottom: 0.8rem; }
.title { font-size: 2.2rem; color: #1e293b; line-height: 1.1; margin: 0; }
@media (max-width: 768px) { .title { font-size: 1.8rem; } }

.price-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
.price-wrapper { color: #1e293b; display: flex; align-items: baseline; gap: 4px; }
.currency { font-size: 1.2rem; font-weight: 600; }
.value { font-size: 2rem; font-weight: 800; }
.dimensions-pill { background: #f8fafc; border: 1px solid #e2e8f0; color: #64748b; padding: 6px 12px; border-radius: 8px; font-size: 0.9rem; font-weight: 500; }

.description-box { margin-bottom: 2rem; }
.description-box h3 { font-size: 1rem; color: #334155; margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; }
.description-box p { color: #64748b; line-height: 1.7; font-size: 1rem; }

.modal-footer { margin-top: auto; }
.btn-add-bag {
  width: 100%; padding: 1.2rem;
  background: #1e293b; color: white;
  border: none; border-radius: 12px;
  font-size: 1.1rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 0.8rem;
}
.btn-add-bag:hover:not(:disabled) { background: #334155; transform: translateY(-2px); box-shadow: 0 10px 20px -5px rgba(30, 41, 59, 0.3); }
.btn-add-bag.disabled { background: #cbd5e1; color: #94a3b8; cursor: not-allowed; }

@keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>