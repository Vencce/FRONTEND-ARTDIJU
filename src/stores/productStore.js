import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useToastStore } from '@/stores/toastStore'

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)
  const toast = useToastStore()

  const API_URL = 'https://artdiju-backend.onrender.com/api/products/'

  function getAuthHeader() {
    const token = localStorage.getItem('access_token')
    return token ? { 'Authorization': `Bearer ${token}` } : {}
  }

  function saveToCache() {
    if (products.value && products.value.length > 0) {
      localStorage.setItem('artdiju_products_cache', JSON.stringify(products.value))
    }
  }

  function loadFromCache() {
    const cached = localStorage.getItem('artdiju_products_cache')
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        if (parsed && parsed.length > 0) {
          products.value = parsed
          return true
        }
      } catch (e) {
        return false
      }
    }
    return false
  }

  async function fetchProducts() {
    const hasCache = loadFromCache()
    
    if (!hasCache) {
      loading.value = true
    }
    
    error.value = null
    try {
      const response = await axios.get(API_URL)
      products.value = response.data
      saveToCache()
    } catch (err) {
      if (!hasCache) {
        error.value = 'Erro ao carregar produtos.'
      }
    } finally {
      loading.value = false
    }
  }

  async function addProduct(productData) {
    try {
      const formData = new FormData()
      formData.append('name', productData.name)
      formData.append('price', productData.price)
      formData.append('category', productData.category)
      formData.append('description', productData.description || '')
      formData.append('dimensions', productData.dimensions || '')
      formData.append('is_sold', productData.is_sold ? 'true' : 'false')
      formData.append('is_featured', productData.is_featured ? 'true' : 'false')

      if (productData.image instanceof File) {
        formData.append('image', productData.image)
      }

      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...getAuthHeader()
        },
      })

      products.value.unshift(response.data)
      products.value.sort((a, b) => Number(b.is_featured) - Number(a.is_featured))
      saveToCache()
      toast.addToast('Produto criado com sucesso!', 'success')
    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = '/login'
      } else {
        toast.addToast('Erro ao criar produto.', 'error')
      }
    }
  }

  async function updateProduct(id, productData) {
    try {
      const formData = new FormData()
      formData.append('name', productData.name)
      formData.append('price', productData.price)
      formData.append('category', productData.category)
      formData.append('description', productData.description || '')
      formData.append('dimensions', productData.dimensions || '')
      formData.append('is_sold', productData.is_sold ? 'true' : 'false')
      formData.append('is_featured', productData.is_featured ? 'true' : 'false')

      if (productData.image instanceof File) {
        formData.append('image', productData.image)
      }

      const response = await axios.patch(`${API_URL}${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...getAuthHeader()
        },
      })

      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = response.data
        products.value.sort((a, b) => Number(b.is_featured) - Number(a.is_featured))
        saveToCache()
      }
      
      toast.addToast('Produto atualizado!', 'success')
    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = '/login'
      } else {
        toast.addToast('Erro ao atualizar.', 'error')
      }
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`${API_URL}${id}/`, {
        headers: getAuthHeader()
      })
      products.value = products.value.filter((p) => p.id !== id)
      saveToCache()
      toast.addToast('Produto excluído.', 'info')
    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = '/login'
      } else {
        toast.addToast('Erro ao excluir.', 'error')
      }
    }
  }

  return { 
    products, 
    loading, 
    error, 
    fetchProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct 
  }
})