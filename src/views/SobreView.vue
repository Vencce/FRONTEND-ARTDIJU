<script setup>
</script>

<template>
  <main class="about-page">
    <div class="blob blob-top-left"></div>
    <div class="blob blob-bottom-right"></div>

    <div class="container relative-z">
      <section class="hero-section">
        <h1>Nossa História</h1>
        <p class="subtitle">Transformando sentimentos em arte e memórias tangíveis desde 2020.</p>
      </section>

      <section class="story-section">
        <div class="image-stack">
          <div class="img-decoration"></div>
          <img
            src="https://via.placeholder.com/600x800?text=Atelier+Art+Di+Ju"
            alt="Nosso Atelier"
            class="img-main"
          />
        </div>

        <div class="text-block">
          <h2>Quem é a ArtDiJu?</h2>
          <p>
            A ArtDiJu nasceu do desejo genuíno de criar presentes que não fossem apenas objetos,
            mas pedaços de afeto. Tudo começou em uma pequena mesa de jantar, entre tintas, madeiras
            e muitos sonhos.
          </p>
          <p>
            Acreditamos que cada peça carrega uma energia única. Seja uma luminária rústica para
            aconchegar seu quarto ou uma peça de decoração para a sala, tudo é feito à mão,
            respeitando o tempo dos materiais e com atenção aos mínimos detalhes.
          </p>
          <p>
            Hoje, enviamos amor em forma de arte para todo o Brasil, mas mantemos a essência de
            atelier familiar, onde cada cliente é tratado como um amigo.
          </p>
        </div>
      </section>

      <section class="values-section">
        <h2>Nossos Valores</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="icon-box">❤️</div>
            <h3>Feito com Amor</h3>
            <p>Cada peça é única, produzida artesanalmente e sem pressa.</p>
          </div>
          <div class="value-card">
            <div class="icon-box">✨</div>
            <h3>Exclusividade</h3>
            <p>Designs autorais que você só encontra aqui na ArtDiJu.</p>
          </div>
          <div class="value-card">
            <div class="icon-box">🌿</div>
            <h3>Sustentabilidade</h3>
            <p>Respeito aos materiais e aproveitamento consciente.</p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.about-page {
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  padding-bottom: 4rem;
  min-height: 80vh;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 640px) {
  .container {
    padding: 0 1rem;
  }
}

.relative-z {
  position: relative;
  z-index: 10;
}

.blob {
  position: absolute;
  filter: blur(90px);
  opacity: 0.4;
  border-radius: 50%;
  z-index: 1;
}
.blob-top-left {
  top: -10%;
  left: -10%;
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
  animation: float 10s ease-in-out infinite alternate;
}
.blob-bottom-right {
  bottom: 10%;
  right: -10%;
  width: 700px;
  height: 700px;
  background: linear-gradient(to left, #ccfbf1, #99f6e4);
  animation: float 12s ease-in-out infinite alternate-reverse;
}

@media (max-width: 768px) {
  .blob {
    width: 300px;
    height: 300px;
    filter: blur(60px);
  }
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(30px, 30px);
  }
}

.hero-section {
  text-align: center;
  padding: 6rem 0 4rem;
}
@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 0 3rem;
  }
}

.hero-section h1 {
  font-size: 3rem;
  color: #1e293b;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.2rem;
  }
}

.subtitle {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}
@media (max-width: 768px) {
  .subtitle {
    font-size: 1rem;
  }
}

.story-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 6rem;
}
@media (min-width: 800px) {
  .story-section {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 800px) {
  .story-section {
    gap: 3rem;
    text-align: center; /* Centralizar texto no mobile */
  }
}

.image-stack {
  position: relative;
  display: flex;
  justify-content: center;
}

.img-main {
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  transform: rotate(-3deg);
  transition: transform 0.4s ease;
  border: 4px solid white;
}
.img-main:hover {
  transform: rotate(0deg) scale(1.02);
}

.img-decoration {
  position: absolute;
  top: 20px;
  right: 40px;
  width: 100%;
  height: 100%;
  max-width: 400px;
  background: #f0fdfa;
  border-radius: 20px;
  z-index: 1;
  transform: rotate(4deg);
}

.text-block h2 {
  font-size: 2.2rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-weight: 700;
}
@media (max-width: 768px) {
  .text-block h2 {
    font-size: 1.8rem;
  }
}

.text-block p {
  color: #475569;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.values-section h2 {
  text-align: center;
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 3rem;
}
.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.value-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 2.5rem 2rem;
  border-radius: 24px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s;
}
.value-card:hover {
  transform: translateY(-10px);
  border-color: #5fc9f8;
  box-shadow: 0 20px 40px -10px rgba(95, 201, 248, 0.15);
}

.icon-box {
  font-size: 2.5rem;
  background: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.value-card h3 {
  font-size: 1.3rem;
  color: #1e293b;
  margin-bottom: 0.8rem;
  font-weight: 700;
}
.value-card p {
  color: #64748b;
  font-size: 1rem;
}
</style>