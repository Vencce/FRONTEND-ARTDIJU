<template>
  <main class="not-found-page">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>

    <div class="content relative-z">
      <div class="code">404</div>
      <h1>Ops! Peça não encontrada.</h1>
      <p>Parece que a página que você procura foi vendida ou nunca existiu.</p>

      <RouterLink to="/" class="btn-home"> Voltar para a Vitrine </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.not-found-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 2rem;
}

.relative-z {
  position: relative;
  z-index: 10;
}

.code {
  font-size: 8rem;
  font-weight: 900;
  color: #f1f5f9;
  line-height: 1;
  margin-bottom: -2rem;
  position: relative;
  z-index: -1;
}

h1 {
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 1rem;
}

p {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.btn-home {
  display: inline-block;
  background: #1e293b;
  color: white;
  text-decoration: none;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  transition:
    transform 0.2s,
    background 0.2s;
}

.btn-home:hover {
  background: #334155;
  transform: translateY(-2px);
}

.blob {
  position: absolute;
  filter: blur(90px);
  opacity: 0.5;
  border-radius: 50%;
  z-index: 1;
}
.blob-1 {
  top: -10%;
  left: -10%;
  width: 400px;
  height: 400px;
  background: #e0f2fe;
}
.blob-2 {
  bottom: -10%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: #fce7f3;
}
</style>
