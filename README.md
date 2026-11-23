# 🌐 Doceria Hub Flow — Web Admin

> Projeto N4 — Turma TAPWM | Fatec  
> Painel administrativo web para gerenciamento de produtos e pedidos da Doceria Hub Flow.

---

## 👥 Equipe

| Nome | Função | GitHub |
|------|--------|--------|
| Eric Gois | 📱 App Mobile (React Native / Expo) | [@ericfgois](https://github.com/ericfgois) |
| Gabriel Almeida | ⚙️ API REST (Node.js / Express) | [@GabrielXAlmeida](https://github.com/GabrielXAlmeida) |
| Marcelo Korin | 🌐 Web Admin (React / Vite) | [@MarceloKorin](https://github.com/MarceloKorin) |
| David | 🗄️ Banco de Dados (MySQL) | — |

---

## 🔗 Repositórios do Projeto

| Parte | Repositório |
|-------|-------------|
| 📱 Mobile | [projeto_pedidos_n4_tapwm_APP](https://github.com/ericfgois/projeto_pedidos_n4_tapwm_APP) |
| ⚙️ API | [projeto_pedidos_n4_tapwm_API](https://github.com/GabrielXAlmeida/projeto_pedidos_n4_tapwm_API) |
| 🌐 Web Admin (este) | [projeto_pedidos_n4_tapwm_WEB](https://github.com/MarceloKorin/projeto_pedidos_n4_tapwm_WEB) |

---

## 🛠️ Tecnologias

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/) (bundler)
- [React Router DOM](https://reactrouter.com/) (navegação)
- [Axios](https://axios-http.com/) (requisições HTTP)
- CSS Modules / Styled Components

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- API rodando localmente (veja o repo da API)

---

## 🚀 Como Executar

### 1. Clone o repositório
```bash
git clone https://github.com/MarceloKorin/projeto_pedidos_n4_tapwm_WEB.git
cd projeto_pedidos_n4_tapwm_WEB
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure a URL da API

Crie um arquivo `.env` na raiz:
```env
VITE_API_URL=http://localhost:3000
```

### 4. Inicie em modo de desenvolvimento
```bash
npm run dev
```

Acesse em `http://localhost:5173`.

### Build para produção
```bash
npm run build
npm run preview
```

---

## 🔐 Credenciais de Teste

| Perfil | E-mail | Senha |
|--------|--------|-------|
| Admin (Web) | `admin@doceria.com` | `admin123` |
| Cliente (Mobile) | `cliente@doceria.com` | `cliente123` |

> ⚠️ O painel web é acessível apenas com conta de **administrador**.

---

## 📋 Funcionalidades

- [x] Login de administrador
- [x] Listagem de todos os pedidos
- [x] Atualização de status dos pedidos (Pendente → Em preparo → Pronto → Entregue)
- [x] Gerenciamento de produtos (cadastro, edição, remoção)
- [x] Visualização de detalhes do pedido

---

## 📁 Estrutura do Projeto

```
projeto_pedidos_n4_tapwm_WEB/
├── src/
│   ├── api/          # Configuração do Axios
│   ├── components/   # Componentes reutilizáveis
│   ├── pages/        # Páginas da aplicação
│   │   ├── Login/
│   │   ├── Dashboard/
│   │   ├── Pedidos/
│   │   └── Produtos/
│   ├── context/      # Contexto de autenticação
│   └── App.jsx
├── public/
├── index.html
├── vite.config.js
└── package.json
```

---

## 📄 Licença

Projeto acadêmico — Fatec · N4 · TAPWM · 2026
