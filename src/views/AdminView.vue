<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'
import ConfirmModal from '@/components/ConfirmModal.vue'
import SuccessModal from '@/components/SuccessModal.vue'

const store = useProductStore()

const showForm = ref(false)
const isEditing = ref(false)
const currentId = ref(null)
const showConfirm = ref(false)
const showSuccess = ref(false)

const itemToDelete = ref(null)
const successMessage = ref('')
const adminSearch = ref('')

const form = ref({
  name: '',
  price: '',
  promo_price: '',
  category: '',
  dimensions: '',
  description: '',
  is_sold: false,
  is_featured: false,
  notify_users: false,
  image: null,
})

const fileName = computed(() => {
  if (form.value.image && form.value.image instanceof File) {
    return form.value.image.name
  }
  return 'Clique para escolher uma imagem'
})

const filteredAdminProducts = computed(() => {
  if (!adminSearch.value) return store.products

  const term = adminSearch.value.toLowerCase()

  return store.products.filter((product) => {
    return (
      product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
    )
  })
})

onMounted(() => {
  store.fetchProducts()
})

const openCreate = () => {
  isEditing.value = false
  currentId.value = null
  form.value = {
    name: '',
    price: '',
    promo_price: '',
    category: '',
    dimensions: '',
    description: '',
    is_sold: false,
    is_featured: false,
    notify_users: false,
    image: null,
  }
  showForm.value = true
}

const openEdit = (product) => {
  isEditing.value = true
  currentId.value = product.id
  form.value = {
    name: product.name,
    price: product.price,
    promo_price: product.promo_price || '',
    category: product.category,
    dimensions: product.dimensions || '',
    description: product.description || '',
    is_sold: product.is_sold,
    is_featured: product.is_featured,
    notify_users: false,
    image: null,
  }
  showForm.value = true
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.image = file
  }
}

const save = async () => {
  if (!form.value.name || !form.value.price) {
    alert('Nome e Preço são obrigatórios')
    return
  }

  try {
    if (isEditing.value && currentId.value) {
      await store.updateProduct(currentId.value, form.value)
      successMessage.value = 'Produto atualizado com sucesso!'
    } else {
      await store.addProduct(form.value)
      if (form.value.notify_users) {
        successMessage.value = 'Produto criado e clientes notificados por e-mail!'
      } else {
        successMessage.value = 'Produto criado com sucesso!'
      }
    }

    showForm.value = false
    showSuccess.value = true
  } catch (error) {
    alert('Erro ao salvar produto.')
  }
}

const confirmDelete = (id) => {
  itemToDelete.value = id
  showConfirm.value = true
}

const executeDelete = async () => {
  if (itemToDelete.value) {
    await store.deleteProduct(itemToDelete.value)
    showConfirm.value = false
    itemToDelete.value = null
  }
}
</script>

<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>Gerenciar Produtos</h1>

      <div class="header-actions">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input v-model="adminSearch" type="text" placeholder="Buscar por nome ou categoria..." />
        </div>

        <button class="btn-add" @click="openCreate">+ Novo Produto</button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="product-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Destaque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody v-if="filteredAdminProducts.length > 0">
          <tr
            v-for="product in filteredAdminProducts"
            :key="product.id"
            :class="{ sold: product.is_sold }"
          >
            <td>
              <span v-if="product.is_sold" class="badge-sold">VENDIDO</span>
              <span v-else class="badge-active">Disp.</span>
            </td>
            <td>
              <img
                :src="product.image || 'https://via.placeholder.com/50'"
                class="thumb"
                alt="Produto"
              />
            </td>
            <td>
              <div class="name-col">
                <strong>{{ product.name }}</strong>
                <span class="cat-label">{{ product.category }}</span>
              </div>
            </td>
            <td>R$ {{ Number(product.price).toFixed(2) }}</td>
            <td>
              <span v-if="product.is_featured" class="star">⭐</span>
              <span v-else class="dash">-</span>
            </td>
            <td>
              <div class="actions-wrapper">
                <button class="btn-icon edit" @click="openEdit(product)" title="Editar">✏️</button>
                <button class="btn-icon delete" @click="confirmDelete(product.id)" title="Excluir">
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="6" class="empty-search">
              Nenhum produto encontrado para "{{ adminSearch }}".
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
      <div class="modal-card">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Editar Produto' : 'Novo Produto' }}</h2>
          <button class="close-modal" @click="showForm = false">&times;</button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="save" class="form-content">
            <div class="toggles-row">
              <label class="toggle-btn" :class="{ active: form.is_sold }">
                <input type="checkbox" v-model="form.is_sold" hidden />
                <span class="check-icon" v-if="form.is_sold">✓</span>
                Vendido
              </label>

              <label class="toggle-btn featured" :class="{ active: form.is_featured }">
                <input type="checkbox" v-model="form.is_featured" hidden />
                <span class="check-icon" v-if="form.is_featured">⭐</span>
                Destaque
              </label>

              <label
                v-if="!isEditing"
                class="toggle-btn notify"
                :class="{ active: form.notify_users }"
              >
                <input type="checkbox" v-model="form.notify_users" hidden />
                <span class="check-icon" v-if="form.notify_users">📧</span>
                Notificar Clientes
              </label>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label>Nome do Produto</label>
                <input v-model="form.name" type="text" placeholder="Ex: Luminária" required />
              </div>

              <div class="form-group">
                <label>Categoria</label>
                <input v-model="form.category" type="text" placeholder="Ex: Decoração" />
              </div>

              <div class="form-group">
                <label>Preço (R$)</label>
                <input v-model="form.price" type="number" step="0.01" required />
              </div>

              <div class="form-group">
                <label>Preço Promo (Opcional)</label>
                <input v-model="form.promo_price" type="number" step="0.01" />
              </div>

              <div class="form-group full">
                <label>Medidas</label>
                <input v-model="form.dimensions" type="text" placeholder="Ex: 30x40cm" />
              </div>
            </div>

            <div class="form-group">
              <label>Descrição Detalhada</label>
              <textarea v-model="form.description" rows="3" placeholder="Detalhes..."></textarea>
            </div>

            <div class="form-group">
              <label>Imagem do Produto</label>
              <div class="file-upload-wrapper">
                <label for="file-input" class="custom-file-upload">
                  <span class="upload-icon">📁</span>
                  <span class="upload-text">{{ fileName }}</span>
                </label>
                <input id="file-input" type="file" @change="handleFileUpload" accept="image/*" />
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-cancel" @click="showForm = false">Cancelar</button>
              <button type="submit" class="btn-save">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <ConfirmModal
      :isOpen="showConfirm"
      title="Excluir Produto"
      message="Tem certeza que deseja excluir este item?"
      @close="showConfirm = false"
      @confirm="executeDelete"
    />

    <SuccessModal
      :isOpen="showSuccess"
      title="Tudo certo!"
      :message="successMessage"
      @close="showSuccess = false"
    />
  </div>
</template>

<style scoped>
.admin-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.admin-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}
.admin-header h1 {
  color: #1e293b;
  font-size: 1.8rem;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}
.search-box input {
  padding: 0.7rem 1rem 0.7rem 2.5rem; 
  border-radius: 50px;
  border: 1px solid #cbd5e1;
  width: 250px;
  transition: all 0.2s;
  background: white;
}
.search-box input:focus {
  width: 300px; 
  border-color: #5fc9f8;
  box-shadow: 0 0 0 4px rgba(95, 201, 248, 0.1);
}
.search-icon {
  position: absolute;
  left: 12px;
  color: #94a3b8;
  font-size: 0.9rem;
}

.btn-add {
  background-color: #25d366;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
  white-space: nowrap;
}
.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
}

.table-responsive {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  background: white;
}
.product-table {
  width: 100%;
  border-collapse: collapse;
}
.product-table th,
.product-table td {
  padding: 1.2rem;
  border-bottom: 1px solid #f1f5f9;
  text-align: left;
  color: #475569;
  vertical-align: middle;
}
.product-table th {
  background-color: #f8fafc;
  font-weight: 700;
  color: #334155;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}
.product-table tr:last-child td {
  border-bottom: none;
}
.product-table tr:hover {
  background-color: #fcfcfc;
}

.name-col {
  display: flex;
  flex-direction: column;
}
.cat-label {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  margin-top: 2px;
}

.empty-search {
  text-align: center;
  padding: 3rem;
  color: #94a3b8;
  font-style: italic;
}

.thumb {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.badge-sold {
  background: #fee2e2;
  color: #ef4444;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}
.badge-active {
  background: #dcfce7;
  color: #22c55e;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}
.star {
  font-size: 1.2rem;
}
.dash {
  color: #cbd5e1;
}

.actions-wrapper {
  display: flex;
  gap: 0.8rem;
  align-items: center;
}
.btn-icon {
  background: white;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: #64748b;
}
.btn-icon:hover {
  border-color: #cbd5e1;
  color: #334155;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.btn-icon.delete:hover {
  border-color: #fee2e2;
  background-color: #fee2e2;
  color: #ef4444;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 1rem;
}
.modal-card {
  background: white;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
}
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  flex-shrink: 0;
}
.modal-header h2 {
  font-size: 1.5rem;
  color: #1e293b;
  font-weight: 700;
  margin: 0;
}
.close-modal {
  background: none;
  border: none;
  font-size: 2rem;
  color: #94a3b8;
  cursor: pointer;
  line-height: 1;
}
.close-modal:hover {
  color: #ef4444;
}

.modal-body {
  overflow-y: auto;
  flex: 1;
  padding: 0;
}
.form-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.toggles-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.toggle-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: #64748b;
  transition: all 0.2s;
  user-select: none;
}
.toggle-btn.active {
  border-color: #ef4444;
  background-color: #fef2f2;
  color: #ef4444;
}
.toggle-btn.featured.active {
  border-color: #f59e0b;
  background-color: #fffbeb;
  color: #f59e0b;
}
.toggle-btn.notify.active {
  border-color: #3b82f6;
  background-color: #eff6ff;
  color: #3b82f6;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
.form-group.full {
  grid-column: span 2;
}
@media (max-width: 600px) {
  .form-group.full {
    grid-column: span 1;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
}
input,
textarea {
  padding: 0.8rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-family: inherit;
  color: #1e293b;
  font-size: 0.95rem;
  transition: all 0.2s;
  background: #f8fafc;
}
input:focus,
textarea:focus {
  outline: none;
  border-color: #5fc9f8;
  background: white;
  box-shadow: 0 0 0 4px rgba(95, 201, 248, 0.15);
}

.file-upload-wrapper input {
  display: none;
}
.custom-file-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.5rem;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: #64748b;
  font-weight: 500;
  background: #f8fafc;
}
.custom-file-upload:hover {
  border-color: #5fc9f8;
  background: #f0f9ff;
  color: #5fc9f8;
}
.upload-icon {
  font-size: 1.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  border-top: 1px solid #f1f5f9;
  padding-top: 1.5rem;
}
.btn-save {
  background: #0f172a;
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background 0.2s;
}
.btn-save:hover {
  background: #1e293b;
}
.btn-cancel {
  background: white;
  border: 1px solid #cbd5e1;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  color: #475569;
  font-weight: 600;
  font-size: 1rem;
  transition: background 0.2s;
}
.btn-cancel:hover {
  background: #f1f5f9;
}
</style>
