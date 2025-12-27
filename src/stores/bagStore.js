import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useToastStore } from '@/stores/toastStore'

export const useBagStore = defineStore('bag', () => {
  const items = ref(JSON.parse(localStorage.getItem('artdiju_bag')) || [])
  const isBagOpen = ref(false)
  
  const toast = useToastStore()

  watch(items, (newVal) => {
    localStorage.setItem('artdiju_bag', JSON.stringify(newVal))
  }, { deep: true })

  function addToBag(product) {
    const existing = items.value.find(i => i.id === product.id)
    
    if (existing) {
      existing.quantity++
      toast.addToast('Quantidade atualizada na sacola!', 'success')
    } else {
      items.value.push({ ...product, quantity: 1 })
      toast.addToast('Produto adicionado à sacola!', 'success')
    }
    isBagOpen.value = true
  }

  function removeFromBag(productId) {
    items.value = items.value.filter(i => i.id !== productId)
  }

  function updateQuantity(productId, delta) {
    const item = items.value.find(i => i.id === productId)
    if (item) {
      item.quantity += delta
      if (item.quantity <= 0) removeFromBag(productId)
    }
  }

  function clearBag() {
    items.value = []
  }

  function toggleBag() {
    isBagOpen.value = !isBagOpen.value
  }

  const totalItems = computed(() => items.value.reduce((acc, item) => acc + item.quantity, 0))
  
  const totalPrice = computed(() => items.value.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0))

  const whatsappLink = computed(() => {
    if (items.value.length === 0) return ''
    
    let message = "Olá! Gostaria de fazer um orçamento dos seguintes itens:\n\n"
    
    items.value.forEach(item => {
      const totalItem = (Number(item.price) * item.quantity).toFixed(2).replace('.', ',')
      message += `▪️ ${item.quantity}x ${item.name} (R$ ${totalItem})\n`
      if (item.dimensions) message += `   _Medida: ${item.dimensions}_\n`
    })
    
    const total = totalPrice.value.toFixed(2).replace('.', ',')
    message += `\n*Total Estimado: R$ ${total}*`
    
    return `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
  })

  return { 
    items, 
    isBagOpen, 
    addToBag, 
    removeFromBag, 
    updateQuantity, 
    clearBag, 
    toggleBag,
    totalItems,
    totalPrice,
    whatsappLink
  }
})