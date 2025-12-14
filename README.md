![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![API](https://img.shields.io/badge/API-REST-black)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

Este projeto foi desenvolvido para **demonstrar e implementar um sistema de chamadas**, seja de telefonia, API, ou qualquer sistema de interação remota. O objetivo é estudar o processo de chamada e resposta, gerenciamento de filas, e fornecer uma estrutura modular para criar sistemas baseados em chamadas.


# 📌 Visão Geral

Funcionalidades principais implementadas (ou em desenvolvimento):

- 📞 **Sistema de Chamadas Telefônicas** (se aplicável)
- 🌐 **Integração com APIs**
- 🧑‍💻 **Gerenciamento de Fila de Chamadas**
- 🚀 **Monitoramento de status de chamadas**
- 🔄 **Processamento assíncrono de chamadas**
- 📊 **Dashboard ou logs para controle das chamadas**

Este projeto tem como foco a **expansão modular**, para diferentes tipos de sistemas de chamadas e integrações.


# 🏗️ Arquitetura da Aplicação

Fluxo básico da aplicação:

```

Cliente (UI ou API)
↓
Gerenciamento de Chamadas (Controllers)
↓
Filas de Chamadas (Queue)
↓
Processamento Assíncrono (Services / Workers)
↓
Status/Logs (Monitoramento)

```

A separação de responsabilidades facilita a escalabilidade e o controle das chamadas.


# 📂 Estrutura de Diretórios

```

calling-systems/
├── src/
│   ├── controllers/              # Controladores de chamadas (API, telefonia)
│   │   ├── callController.js     # Lógica de controle das chamadas
│   │   └── queueController.js    # Gerenciamento de fila de chamadas
│   │
│   ├── services/                 # Lógica de processamento de chamadas
│   │   └── callService.js        # Processamento assíncrono
│   │
│   ├── queues/                   # Gerenciamento de filas
│   │   └── queueManager.js       # Adiciona/remover chamadas das filas
│   │
│   ├── logs/                     # Logs e status das chamadas
│   │   └── logger.js             # Registro de status das chamadas
│   │
│   ├── app.js                    # Ponto de entrada da aplicação
│   └── server.js                 # Configuração do servidor
│
├── public/                       # Arquivos estáticos
├── config/                       # Configurações do sistema
│   └── config.js                 # Configuração de fila, tempo de timeout, etc.
│
├── package.json                  # Dependências e scripts
└── README.md                     # Documentação

````

> A arquitetura está pensada para **futuras expansões**, como integrações com sistemas de telefonia, APIs externas e outras lógicas complexas de chamadas.


# 🔌 Exemplos de Uso (Endpoints/API)

# Endpoint de Início de Chamada
```http
POST /api/call/start
````

**Exemplo de payload**

```json
{
  "caller": "+123456789",
  "callee": "+987654321",
  "type": "audio"
}
```

# Endpoint de Fim de Chamada

```http
POST /api/call/end
```

**Exemplo de payload**

```json
{
  "callId": "1234abcd"
}
```


# ⚙️ Tecnologias Utilizadas

* **JavaScript (ES6+)**
* **Node.js** – Ambiente de execução
* **Express** – Framework para APIs
* **Redis / RabbitMQ** (opcional) – Gerenciamento de filas
* **Axios / Fetch** – Comunicação HTTP
* **MongoDB** (opcional) – Armazenamento de logs ou estado das chamadas


# 🚀 Como Executar o Projeto

# Pré-requisitos

* Node.js **16+**
* npm ou yarn
* (Opcional) Redis ou outro sistema de fila (caso use)

# Instalação

```bash
npm install
# ou
yarn install
```

# Executar em ambiente de desenvolvimento

```bash
npm start
# ou
yarn start
```

A aplicação estará disponível em:

```
http://localhost:3000
```


# Pacotes:

- npm i firebase

- npm i react-router-dom or yarn add react-router-dom

- npm i --save react-toastify or yarn add eact-toastify

- npm i react-icons

- npm i date-fns

- npm i react-hook-form


# Tela Inicial

![Tela Inicial](https://github.com/davidbehling/calling-systems/blob/main/public/images/01.%20Tela%20Inicial.png)

# Tela de Registro

![Tela de Registro](https://github.com/davidbehling/calling-systems/blob/main/public/images/02.%20Tela%20de%20Registro.png)

# Tela Dashboard - Após o login

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


