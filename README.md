# Artdiju - Frontend

Este repositório contém o frontend da plataforma Artdiju, uma aplicação de vitrine e e-commerce desenvolvida com **Vue.js 3**. O projeto foi concebido para oferecer uma experiência de navegação fluida, permitindo a visualização de produtos, gestão de sacola de compras e uma interface administrativa para gestão de catálogo.

## 🚀 Tecnologias Utilizadas

* **Vue.js 3**: Framework progressivo para construção da interface de utilizador.
* **Vite**: Ferramenta de build rápida para modern web projects.
* **Pinia**: Gestão de estado centralizada e intuitiva (Stores para Autenticação, Sacola, Produtos e Toasts).
* **Vue Router**: Gestão de rotas e navegação da SPA.
* **Tailwind CSS**: Framework utilitário para estilização rápida e responsiva.
* **Axios**: Cliente HTTP para comunicação com a API backend.

## 📁 Estrutura do Projeto

* **`src/components/`**: Componentes reutilizáveis como `Header`, `Footer`, `Modais` (Sucesso, Confirmação, Produto), `Sacola Lateral` e `Newsletter`.
* **`src/views/`**: Páginas principais da aplicação:
    * `VitrineView`: Exibição do catálogo de produtos.
    * `AdminView`: Painel de gestão para administradores.
    * `LoginView`: Interface de acesso restrito.
    * `SobreView` & `ContatoView`: Informações institucionais.
* **`src/stores/`**: Lógica de estado global (auth, bag, product, toast).
* **`src/router/`**: Configuração de rotas, incluindo guardas de navegação para proteção da área administrativa.

## ✨ Funcionalidades

1.  **Vitrine Interativa**: Listagem de produtos com suporte a estados de carregamento (Skeletons).
2.  **Sacola de Compras**: Gestão em tempo real de itens adicionados através da `bagStore`.
3.  **Painel Administrativo**: Área protegida para criação, edição e remoção de produtos no catálogo.
4.  **Sistema de Notificações**: Feedback visual ao utilizador através de Toasts customizados.
5.  **Autenticação**: Fluxo de login persistente com gestão de tokens.
6.  **Responsividade**: Interface adaptada para dispositivos móveis e desktop.

## 🛠️ Instalação e Execução

1.  **Pré-requisitos**: Ter o Node.js instalado.
2.  **Instalar dependências**:
    ```bash
    npm install
    ```
3.  **Executar em modo de desenvolvimento**:
    ```bash
    npm run dev
    ```
4.  **Gerar build de produção**:
    ```bash
    npm run build
    ```

## 📝 Configuração

O projeto utiliza o **Prettier** para padronização de código e o arquivo `jsconfig.json` para facilitar a resolução de caminhos através de aliases (como `@/`).

---
Desenvolvido por **Vitor Ferreira**.
