# 🧠 Calling Systems

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-enabled-blue?logo=docker&logoColor=white)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

Este projeto foi desenvolvido para demonstrar e implementar um sistema de gerenciamento de tickets/chamados.

O objetivo é estudar:
  - React (componentes, hooks, contexto)
  - Firebase (autenticação, Firestore, Storage)
  - Roteamento (React Router)
  - Gerenciamento de estado (Context API)
  - Formulários (React Hook Form)
  - Docker e containerização
  - Boas práticas de desenvolvimento
  
É uma aplicação SPA (Single Page Application) que permite usuários autenticados criar, visualizar e editar tickets associados a clientes específicos.


## 📌 Visão Geral

Funcionalidades principais implementadas:
```
📋 CRUD de Tickets/Chamados (criar, visualizar, editar)
👥 Gerenciamento de Clientes (criar, consultar)
🔐 Autenticação com Firebase (login, registro, logout)
👤 Gerenciamento de Perfil (editar dados, upload avatar)
📊 Dashboard com paginação de chamados
🔍 Busca e filtro de chamados por status
🎯 Categorização de chamados (Support, Technical, Financial)
💾 Armazenamento em Firestore (sync em tempo real)
🖼️ Upload de imagens para Firebase Storage
⚡ Interface responsiva com React Router
```
Este projeto tem como foco a **expansão modular**, para diferentes tipos de sistemas de chamadas e integrações.


## 🏗️ Arquitetura da Aplicação

Fluxo básico da aplicação:

```

┌─────────────────────────────────┐
│  Cliente (Browser React)        │
│  - Signin/Signup                │
│  - Dashboard (CRUD Calls)       │
│  - Customer (CRUD Clientes)     │
│  - Profile (Editar Perfil)      │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│  AuthContext (Estado Global)    │
│  - Gerencia autenticação        │
│  - Armazena dados do usuário    │
│  - Valida rotas privadas        │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│  Firebase SDK (Client-side)     │
│  - Firebase Auth (login/logout) │
│  - Firestore (CRUD dados)       │
│  - Storage (upload de avatar)   │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│  Firebase Backend               │
│  - Coleções: users, calls,      │
│    customers                    │
│  - Regras de segurança          │
└─────────────────────────────────┘

```

## 📂 Estrutura de Diretórios

```
calling-systems/
├── public/                                 — Arquivos estáticos servidos pelo app
│   ├── images/                              — Imagens usadas no README e na UI
│   │   ├── 01. Tela Inicial.png             — Screenshot da tela inicial
│   │   └── ...
│   ├── index.html                            — Template HTML principal (entrada da SPA)
│   ├── favicon.ico                           — Ícone do site
│   ├── robots.txt                            — Regras para robôs/crawlers
│   ├── logo192.png                           — Ícone 192x192 para PWA
│   ├── manifest.json                         — Manifest PWA / metadados
│   └── logo512.png                           — Ícone 512x512 para PWA
├── src/                                      — Código-fonte da aplicação React
│   ├── assets/                               — Imagens e assets importáveis
│   │   ├── avatar.png                        — Avatar padrão / fallback para usuários
│   │   ├── cover.png                         — Imagem de capa usada em UI
│   │   └── logo.png                          — Logotipo da aplicação
│   ├── components/                           — Componentes reutilizáveis da UI
│   │   ├── Header/                           — Sidebar / navegação lateral
│   │   │   ├── header.css                    — Estilos do componente `Header`
│   │   │   └── index.js                      — Componente React da sidebar (avatar + links)
│   │   ├── Modal/                            — Modal reutilizável para detalhes/ações
│   │   │   ├── index.js                      — Componente React do `Modal`
│   │   │   └── modal.css                     — Estilos do `Modal`
│   │   └── Title/                            — Pequeno componente de título de seção
│   │       ├── index.js                      — Componente `Title` (ícone + texto)
│   │       └── title.css                     — Estilos do `Title`
│   ├── contexts/                             — Contextos React (estado compartilhado)
│   │   └── auth.js                           — Contexto de autenticação (login, logout, usuário)
│   ├── pages/                                — Páginas correspondentes às rotas
│   │   ├── Customer/                         — Páginas relacionadas a customers
│   │   │   └── index.js                      — Página `Customer` (CRUD / listagem)
│   │   ├── Dashboard/                        — Dashboard principal (chamados)
│   │   │   ├── index.js                      — Página `Dashboard` (lista/pesquisa)
│   │   │   └── dashboard.css                 — Estilos do `Dashboard`
│   │   ├── NewCall/                          — Criar / editar chamados
│   │   │   ├── index.js                      — Página `NewCall` (formulário)
│   │   │   ├── index.txt                     — Versão antiga/nota do componente `NewCall`
│   │   │   └── newcall.css                   — Estilos do formulário `NewCall`
│   │   ├── Profile/                          — Perfil do usuário
│   │   │   ├── index.js                      — Página `Profile` (editar perfil & avatar)
│   │   │   └── profile.css                   — Estilos da página `Profile`
│   │   ├── Signin/                           — Tela de login
│   │   │   ├── index.js                      — Página `Signin` (form de autenticação)
│   │   │   └── signin.css                    — Estilos do `Signin`
│   │   └── Signup/                           — Tela de registro de usuário
│   │       └── index.js                      — Página `Signup` (form de registro)
│   ├── routes/                               — Definição de rotas e proteção
│   │   ├── index.js                          — Arquivo com rotas públicas e privadas
│   │   └── Private.js                        — Wrapper/guard para rotas privadas
│   ├── services/                             — Integrações externas e utilitários
│   │   └── firebaseConnection.js             — Inicializa Firebase (auth, db, storage)
│   ├── App.js                                — Componente raiz (Router + AuthProvider + Toasts)
│   ├── index.css                             — Estilos globais da aplicação
│   ├── index.js                              — Entrada do app (ReactDOM render / hydration)
│   ├── reportWebVitals.js                    — Hook para medir performance (web-vitals)
│   └── setupTests.js                         — Setup para testes (Jest / React Testing Library)
├── .dockerignore                             — Arquivos ignorados ao construir imagem Docker
├── .env.example                              — Exemplo de variáveis de ambiente (Firebase)
├── .gitignore                                — Padrões de arquivos/pastas ignoradas pelo Git
├── docker-compose.dev.yml                    — Configuração docker-compose para desenvolvimento
├── Dockerfile                                — Imagem/etapas Docker para executar a app
├── Makefile                                  — Alvos de conveniência (docker, start, stop)
├── package.json                              — Dependências e scripts npm/yarn
├── package-lock.json                         — Lockfile gerado pelo npm
├── yarn.lock                                 — Lockfile gerado pelo Yarn
├── README.md                                 — Documentação do projeto (instruções e imagens)
└── readme.txt                                — Notas auxiliares / informações adicionais

````

## ⚙️ Tecnologias Utilizadas

**Frontend:**
```
- JavaScript (ES6+)
- React (biblioteca UI)
- React Router (roteamento)
- React Icons (ícones)
- React Hook Form(gerenciamento de formulários)
- React Toastify (notificações)
- CSS3 (estilos)
```
**Backend:**
```
- Firebase Authentication(autenticação)
- Firestore (banco de dados NoSQL)
- Firebase Storage (upload de arquivos/imagens)
- Firebase SDK (cliente JavaScript)
```
**DevOps:**
```
- Docker (containerização)
- Docker Compose (orquestração local)
- npm / Yarn (gerenciador de pacotes)
```
**Ferramentas:**
```
- Makefile (scripts de conveniência)
- Git (controle de versão)
```


## 🚀 Como Executar o Projeto

### Pré-requisitos:

- Node.js v14+ e npm ou yarn
- Docker e Docker Compose (opcional, para container)
- Conta Firebase com projeto configurado

### Configure as variáveis de ambiente:

Copie .env.example para .env.local e adicione suas credenciais Firebase:

```
REACT_APP_FIREBASE_API_KEY=sua_chave_aqui
REACT_APP_FIREBASE_AUTH_DOMAIN=seu_dominio.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=seu_projeto
REACT_APP_FIREBASE_STORAGE_BUCKET=seu_bucket.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
REACT_APP_FIREBASE_APP_ID=seu_app_id

```
### Build e execute com Docker Compose:

```bash
make docker
```

#### A aplicação estará disponível em:

```
http://localhost:3000
```

## 📦 Package / Pacotes

- npm i firebase

- npm i react-router-dom or yarn add react-router-dom

- npm i --save react-toastify or yarn add eact-toastify

- npm i react-icons

- npm i date-fns

- npm i react-hook-form


### 🖥️ Tela Inicial

![Tela Inicial](https://github.com/davidbehling/calling-systems/blob/main/public/images/01.%20Tela%20Inicial.png)

### 🖥️ Tela de Registro

![Tela de Registro](https://github.com/davidbehling/calling-systems/blob/main/public/images/02.%20Tela%20de%20Registro.png)

### 🖥️ Tela Dashboard - Após o login

![Tela Dashboard - Após o login](https://github.com/davidbehling/calling-systems/blob/main/public/images/03.%20Tela%20Dashboard%20-%20Ap%C3%B3s%20o%20login.png)

# Tela Dashboard - Ação de nova task

![Tela Dashboard - Ação de nova task](https://github.com/davidbehling/calling-systems/blob/main/public/images/04.%20Tela%20Dashboard%20-%20A%C3%A7%C3%A3o%20de%20nova%20task.png)

# Formulário de Nova Task

![Formulário de Nova Task](https://github.com/davidbehling/calling-systems/blob/main/public/images/05.%20Formul%C3%A1rio%20de%20Nova%20Task.png)

# Tela Dashboard - Ação mostrar mais Tasks

![Tela Dashboard - Ação mostrar mais Tasks](https://github.com/davidbehling/calling-systems/blob/main/public/images/06.%20Tela%20Dashboard%20-%20A%C3%A7%C3%A3o%20mostrar%20mais%20Tasks.png)

# Tela Dashboard - Visulizando mais Tasks

![Tela Dashboard - Visulizando mais Tasks](https://github.com/davidbehling/calling-systems/blob/main/public/images/07.%20Tela%20Dashboard%20-%20Visulizando%20mais%20Tasks.png)

# Tela Criar Customers

![Tela Criar Customers](https://github.com/davidbehling/calling-systems/blob/main/public/images/08.%20Tela%20Criar%20Customers.png)

# Tela Edição do Usuário

![Tela Edição do Usuário](https://github.com/davidbehling/calling-systems/blob/main/public/images/09.%20Tela%20Edi%C3%A7%C3%A3o%20do%20Usu%C3%A1rio.png)



# Responsível - Tela Inicial

![Responsível - Tela Inicial](https://github.com/davidbehling/calling-systems/blob/main/public/images/10.%20Tela%20Inicial.png)

# Responsível - Tela de Registro

![Responsível - Tela de Registro](https://github.com/davidbehling/calling-systems/blob/main/public/images/11.%20Tela%20de%20Registro.png)

# Responsível - Tela de Dashboard - Após o login

![Responsível - Tela de Dashboard - Após o login](https://github.com/davidbehling/calling-systems/blob/main/public/images/12.%20Tela%20de%20Dashboard%20-%20Ap%C3%B3s%20o%20login.png)

# Responsível - Tela de Dashboard -  Botão para visualizar mais tasks

![Responsível - Tela de Dashboard -  Botão para visualizar mais tasks](https://github.com/davidbehling/calling-systems/blob/main/public/images/13.%20Tela%20de%20Dashboard%20-%20%20Bot%C3%A3o%20para%20visualizar%20mais%20tasks.png)

# Responsível - Tela de Dashboard - Visualizar Task

![Responsível - Tela de Dashboard - Visualizar Task](https://github.com/davidbehling/calling-systems/blob/main/public/images/14.%20Tela%20de%20Dashboard%20-%20Visualizar%20Task.png)

# Responsível - Tela Formulário Editar Task

![Responsível - Tela Formulário Editar Task](https://github.com/davidbehling/calling-systems/blob/main/public/images/15.%20Formul%C3%A1rio%20Editar%20Task.png)

# Responsível - Tela Formulário Nova Task

![Responsível - Tela Formulário Nova Task](https://github.com/davidbehling/calling-systems/blob/main/public/images/16.%20Formul%C3%A1rio%20Nova%20Task.png)

# Responsível - Tela Formulário Criar Customer

![Responsível - Tela Formulário Criar Customer](https://github.com/davidbehling/calling-systems/blob/main/public/images/17.%20Formul%C3%A1rio%20Criar%20Customer.png)

# Responsível - Tela Editar Usuário

![Responsível - Tela Editar Usuário](https://github.com/davidbehling/calling-systems/blob/main/public/images/18.%20Editar%20Usu%C3%A1rio.png)


