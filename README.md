# 🌐 Doceria Hub Flow — Web Admin

> Projeto N4 — Turma TAPWM | Fatec  
> Painel administrativo web para gerenciamento de produtos e pedidos da Doceria Hub Flow.

🔗 **Acesse o projeto online:** [https://doceria-hub-web.onrender.com](https://doceria-hub-web.onrender.com)

---

## 👥 Equipe

| Nome | Função | GitHub |
|------|--------|--------|
| Eric Fracassi de Gois | 📱 App Mobile (React Native / Expo) | [@ericfgois](https://github.com/ericfgois) |
| Gabriel Xavier de Almeida | ⚙️ API REST (Node.js / Express) | [@GabrielXAlmeida](https://github.com/GabrielXAlmeida) |
| Marcelo Enrique Korin | 🌐 Web Admin (React / Vite) | [@MarceloKorin](https://github.com/MarceloKorin) |
| David Lima Alves | 🗄️ Banco de Dados (MySQL) | [@davidlima2007](https://github.com/davidlima2007) |
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
| Cliente (Mobile) | `cliente3@doceria.com` | `cli123` |

> ⚠️ O painel web é acessível apenas com conta de **administrador**.  
> 📱 No app mobile também é possível **cadastrar um novo login**.

---

## 📋 Funcionalidades

### 🌐 Web Admin
- [x] Login de administrador
- [x] Visualização do total de pedidos
- [x] Visualização do total de pedidos aguardando preparo
- [x] Visualização do faturamento acumulado
- [x] Visualização dos pedidos recebidos
- [x] Atualização de status dos pedidos (Pendente → Em preparo → Concluído)
- [x] Visualização do catálogo de produtos
- [x] Adição de novos produtos

### 📱 App Mobile
- [x] Cadastro de usuário
- [x] Login
- [x] Seleção de produtos para formular pedidos
- [x] Realização de pedidos

---

## 📱 Aplicativo Mobile

O app é distribuído em formato **APK**, entregue dentro do arquivo `.rar` anexado à tarefa (o Teams não permite anexar `.apk` diretamente).

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