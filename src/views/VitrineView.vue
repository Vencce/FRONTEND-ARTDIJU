<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useBagStore } from '@/stores/bagStore'
import ProductModal from '@/components/ProductModal.vue'
import Newsletter from '@/components/Newsletter.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'

const store = useProductStore()
const bag = useBagStore()
const isModalOpen = ref(false)
const selectedProduct = ref(null)
const searchQuery = ref('')
const selectedCategory = ref('Todos')

onMounted(() => {
  store.fetchProducts()
})

const categories = computed(() => {
  const cats = new Set(store.products.map((p) => p.category).filter(Boolean))
  return ['Todos', ...Array.from(cats).sort()]
})

const filteredProducts = computed(() => {
  return store.products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory =
      selectedCategory.value === 'Todos' || product.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const openModal = (product) => {
  selectedProduct.value = product
  isModalOpen.value = true
}
</script>

<template>
  <main class="vitrine-page">
    <section class="hero-curved">
      <div class="blob blob-pink"></div>
      <div class="blob blob-cyan"></div>

      <div class="hero-content container">
        <h1>Arte em Cada Detalhe</h1>
        <p>
          Peças exclusivas e personalizadas, feitas à mão para trazer alma e beleza ao seu espaço.
        </p>
      </div>
    </section>

    <section class="container filters-section">
      <div class="search-wrapper">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="O que você procura hoje?"
          class="search-input"
        />
      </div>
      <div class="categories-wrapper">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          class="category-pill"
          :class="{ active: selectedCategory === cat }"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <section v-if="store.loading" class="container products-grid">
      <SkeletonCard v-for="n in 8" :key="n" />
    </section>

    <div v-else-if="store.error" class="state-container error">
      <p>⚠️ {{ store.error }}</p>
    </div>

    <div v-else-if="filteredProducts.length === 0" class="state-container">
      <p>Nenhum produto encontrado.</p>
    </div>

    <section v-else class="container products-grid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
        :class="{ 'sold-out': product.is_sold, 'is-featured': product.is_featured }"
      >
        <div class="image-wrapper" @click="openModal(product)">
          <img
            :src="product.image || 'https://via.placeholder.com/400?text=Sem+Imagem'"
            :alt="product.name"
          />

          <span class="category-tag">{{ product.category }}</span>
          <span v-if="product.is_sold" class="status-badge sold">VENDIDO</span>
          <span v-else class="status-badge available">DISPONÍVEL</span>
          <span v-if="product.is_featured && !product.is_sold" class="featured-badge"
            >⭐ Destaque</span
          >
        </div>

        <div class="product-info">
          <h3 @click="openModal(product)">{{ product.name }}</h3>
          <p class="price">R$ {{ Number(product.price).toFixed(2).replace('.', ',') }}</p>
          <div class="card-actions">
            <button class="btn-details" @click="openModal(product)">Ver Detalhes</button>
            <button
              class="btn-quick-add"
              @click.stop="bag.addToBag(product)"
              :disabled="product.is_sold"
            >
              {{ product.is_sold ? '✕' : '+' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <Newsletter />
    <ProductModal :isOpen="isModalOpen" :product="selectedProduct" @close="isModalOpen = false" />
  </main>
</template>

<style scoped>
.vitrine-page {
  min-height: 80vh;
  background-color: #ffffff;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-curved {
  position: relative;
  background-color: #f8fafc;
  padding: 5rem 1rem 7rem;
  text-align: center;
  overflow: hidden;
  margin-bottom: 0;
  border-bottom-left-radius: 50% 20%;
  border-bottom-right-radius: 50% 20%;
}

.hero-content {
  position: relative;
  z-index: 10;
}
.hero-content h1 {
  font-size: 2.8rem;
  color: #1e293b;
  font-weight: 800;
  margin-bottom: 0.8rem;
  letter-spacing: -0.5px;
}
.hero-content p {
  color: #64748b;
  font-size: 1.15rem;
  max-width: 550px;
  margin: 0 auto;
  line-height: 1.6;
}

.blob {
  position: absolute;
  filter: blur(70px);
  opacity: 0.5;
  z-index: 1;
  border-radius: 50%;
  animation: float 10s ease-in-out infinite alternate;
}
.blob-pink {
  top: -30%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
}
.blob-cyan {
  bottom: -20%;
  right: -10%;
  width: 550px;
  height: 550px;
  background: linear-gradient(to left, #ccfbf1, #99f6e4);
  animation-duration: 15s;
  animation-direction: alternate-reverse;
}

@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(30px, 20px) scale(1.05);
  }
}

@media (max-width: 768px) {
  .hero-curved {
    padding: 4rem 1rem 6rem;
    border-bottom-left-radius: 50% 15%;
    border-bottom-right-radius: 50% 15%;
  }
  .hero-content h1 {
    font-size: 2.2rem;
  }
  .blob {
    opacity: 0.4;
    filter: blur(50px);
    width: 300px;
    height: 300px;
  }
}

.filters-section {
  margin-top: -2rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  z-index: 20;
}
.search-input {
  width: 100%;
  max-width: 500px;
  padding: 1rem 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
  background: white;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
}
.search-input:focus {
  border-color: #5fc9f8;
  box-shadow: 0 10px 30px -5px rgba(95, 201, 248, 0.2);
}

.categories-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
}
.category-pill {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.6rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  color: #64748b;
  font-weight: 600;
  transition: all 0.2s;
}
.category-pill:hover {
  background: #e2e8f0;
  color: #1e293b;
}
.category-pill.active {
  background: #1e293b;
  color: white;
  border-color: #1e293b;
  box-shadow: 0 4px 12px rgba(30, 41, 59, 0.25);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
}

.product-card {
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  position: relative;
}
.product-card.is-featured:not(.sold-out) {
  border: 1px solid #fbbf24;
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.1);
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}
.product-card.sold-out .image-wrapper img {
  filter: grayscale(100%);
  opacity: 0.7;
}
.product-card.sold-out .price {
  color: #a0aec0;
  text-decoration: line-through;
}

.image-wrapper {
  position: relative;
  height: 260px;
  overflow: hidden;
  background: #f8fafc;
  cursor: pointer;
}
.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.product-card:hover img {
  transform: scale(1.05);
}

.category-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.95);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #1e293b;
  text-transform: uppercase;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.status-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.status-badge.sold {
  background: #ef4444;
}
.status-badge.available {
  background: #22c55e;
}
.featured-badge {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #f59e0b;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-info {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.product-info h3 {
  font-size: 1rem;
  color: #1e293b;
  margin-bottom: 0.4rem;
  font-weight: 600;
  cursor: pointer;
}
.price {
  font-size: 1.1rem;
  color: #1e293b;
  font-weight: 700;
  margin-bottom: 1rem;
}
.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}
.btn-details {
  flex: 1;
  background: transparent;
  border: 1px solid #e2e8f0;
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}
.btn-details:hover {
  border-color: #1e293b;
  color: #1e293b;
  background: #f8fafc;
}
.btn-quick-add {
  width: 40px;
  background: #1e293b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
}
.btn-quick-add:hover:not(:disabled) {
  background: #334155;
  transform: scale(1.05);
}
.btn-quick-add:disabled {
  background: #e2e8f0;
  color: #94a3b8;
  cursor: not-allowed;
}
.state-container {
  text-align: center;
  padding: 4rem;
  color: #64748b;
}
</style>
