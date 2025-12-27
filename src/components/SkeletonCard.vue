<template>
  <div class="skeleton-card">
    <div class="skeleton-image"></div>
    <div class="skeleton-info">
      <div class="skeleton-title"></div>
      <div class="skeleton-price"></div>
      <div class="skeleton-actions">
        <div class="skeleton-btn-large"></div>
        <div class="skeleton-btn-small"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.skeleton-image {
  width: 100%;
  height: 260px;
  background-color: #e2e8f0;
  position: relative;
  overflow: hidden;
}

.skeleton-info {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton-title {
  height: 20px;
  width: 80%;
  background-color: #e2e8f0;
  border-radius: 4px;
}

.skeleton-price {
  height: 24px;
  width: 40%;
  background-color: #e2e8f0;
  border-radius: 4px;
}

.skeleton-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.skeleton-btn-large {
  flex: 1;
  height: 36px;
  background-color: #e2e8f0;
  border-radius: 6px;
}

.skeleton-btn-small {
  width: 40px;
  height: 36px;
  background-color: #e2e8f0;
  border-radius: 6px;
}

.skeleton-image::after,
.skeleton-title::after,
.skeleton-price::after,
.skeleton-btn-large::after,
.skeleton-btn-small::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  animation: shimmer 1.5s infinite;
}

.skeleton-title,
.skeleton-price,
.skeleton-btn-large,
.skeleton-btn-small {
  position: relative;
  overflow: hidden;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
