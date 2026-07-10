<script setup>
</script>

<template>
  <div class="admin-analytics">
    <header class="admin-header">
      <h2>Métricas e Acessos</h2>
    </header>
    
    <div class="iframe-wrapper">
      <iframe 
        width="100%" 
        height="850" 
        src="https://datastudio.google.com/embed/reporting/c4e4f103-d9a5-4459-a08e-9787d67c4427/page/7vZ3F" 
        frameborder="0" 
        style="border:0" 
        allowfullscreen>
      </iframe>
    </div>
  </div>
</template>

<style scoped>
.admin-analytics {
  padding: 2rem;
  background: #f8fafc;
  min-height: 100vh;
}

.admin-header {
  margin-bottom: 2rem;
}

.admin-header h2 {
  font-size: 1.8rem;
  color: #1e293b;
  font-weight: 800;
  margin: 0;
}

.iframe-wrapper {
  background: white;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  width: 100%;
}
</style>