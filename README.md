### Project - secretary-ai- JS

---

##### Data: 03/06/2026 a 12/06/2026

##### Developer: Josuel A. Lopes

<br/>

##### About

---

Desenvolvimento acadêmico aplicando arquitetura de softwares e testes em uma aplicação SecretarIA (secretaryAI) em NodeJS, conceitos de integração com a Gemmini AI Google, uma aplicação web prática e intuitiva que permite organizar eventos e agendamentos por data, consultar calendario, agendamento de novos compromissos, consultar e-mails e disparar envios de e-mail tudo atraves do seu proprio agente de IA customizado.

Aplicado na pratica conceitos de criação de agentes de AI, customizados e performatico para automatização de eventos e agendamentos.

<br/>

##### Tecnologias

---

- NodeJS,
- Langchain,
- Google Genai

<br/>

#### Projeto: `secretary-ai`

---

<br/>

#### 📋 Sumário

---

- [📋 Sumário](#-sumário)
- [📂 Arquitetura e diretórios](#-arquitetura-e-diretórios)
- [📦 Pacotes](#-pacotes)
- [🧰 Dependências](#-dependências)
- [♻️ Variáveis de Ambiente](#-variáveis-de-ambiente)
- [🔥 Como executar](#-como-executar)
- [📑 Padronização](#-padronização)
- [🧪 Testes](#-testes)
- [⚙️ CI/CD](#-CI/CD)
- [🚀 Build](#-build)
- [🔖 Version](#-version)
- [📜 Licença](#-licença)

<br/>

#### 📂 Arquitetura e diretórios

---

- MVC (Model View Controller)

```txt
  📦 src
  ┣ 📂 agents
  ┃ ┗ 📜 index.tsx
  ┣ 📂 libs
  ┃ ┗ 📜 index.ts
  ┣ 📂 tools
  ┃ ┣ 📜 index.ts
  ┗  📂 tests

```

#### 📦 Pacotes

---

- Versão do node
  - `lts/jod`

- Padronização do código
  - Configurações
    - `.prettierignore`
    - `.eslintrc.json`
    - `tsconfig.js`
    - `.gitignore`

- [npm](https://docs.npmjs.com/cli/v10/commands/npm): v10.8.2 - npm is the package manager for the Node JavaScript platform. It puts modules in place so that node can find them, and manages dependency conflicts intelligently.

- [npm](https://www.npmjs.com/package/npm?activeTab=readme): v8.15.5 - Microsoft uses npm in Rush repos with hundreds of projects and hundreds of PRs per day, and we’ve found it to be very fast and reliable..

- [Node.js](https://nodejs.org/en): v18.20.4 - Node.js® is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.

- [ESLint](https://eslint.org/) - Static code analysis to help find problems within a codebase

- [Prettier](https://prettier.io/) - An opinionated code formatter

<br/>

- Atualização de pacotes

```bash
npm audit
npm outdated
npx npm-check-updates -i
```

<br/>

#### 🧰 Dependências

---

- Google GenAI

<br/>

#### ♻️ Variáveis de Ambiente

---

- Certifique-se de ter configurado o arquivo `.env` ou `.env.development` na raiz do projeto baseado no arquivo `.env.example`, com as variáveis de ambiente necessárias para execução do projeto.

- Caso você não tenha acesso aos valores, solicite ao responsável pelo projeto.

<br/>

#### 🔥 Como executar

---

- Realize o clone ou baixe o projeto localmente.
  - Instalar ou atualizar os pacotes e dependências

```bash
npm install
```

- Para executar o projeto em modo de desenvolvimento.

```bash
npm run dev
```

<br/>

#### 📑 Padronização

---

- Estilização do código com `Prettier`
  - Em desenvolvimento

```bash

```

- Corrigir e ajustar

```bash

```

- Qualidade do código `ESLint`

```bash

```

- Qualidade do commit

```bash

```

<br/>

#### 🧪 Testes

---

- Teste Automatizados / Teste Integração
  - TDD (Test Driven Development)
    - Teste Runner (Jest)

  - Em desenvolvimento.

```bash

```

ou

```bash

```

<br/>

#### ⚙️ CI/CD

---

- Github Actions (workflow) fluxo de continuous integrations e continuous deploy
  - O fluxo é realizado a cada pull request realizado para branch definida no projeto.

```txt
|-Workflow (Testes Automatizados)
| |-Event: "Pull Request"
| | |-Job: "Jest"
| | | |-Runner: "Ubuntu"
| | | | |-Step: "Instalar dependências"
| | | | |-Step: "Rodar bateria de testes"

```

- Actions
  - Jest Ubuntu
  - Prettier
  - ESLint

<br/>

#### 🚀 Build

---

Para gerar o build do projeto deve-se abrir no `Visual Code` gerando os arquivos e build da aplicação

```bash
npm build
```

<br/>

#### 🔖 Version

---

- Padronização da estrutura de versionamento
  - Semantic Versioning:

  - `path`: Ajustes, melhorias e correções que não alteram as funcionalidades e comportamento.

  - `minor`: Alterações nas funcionalidades, mas que são compatíveis entre versões e mantendo a total compatibilidade de funcionalidades e comportamento.

  - `major`: Novas funcionalidades ou alterações que modifica o comportamento, e que podem não ser mais compatíveis com versões anteriores.

  - Exemplo:

```txt
[  ]. [  ].[  ]

major.minor.patch

2.1.0
```

<br/>

#### 📜 Licença

---

Este repositório e projeto possui licença `MIT license`, para maiores informações:

- [License Project](https://github.com/josuellions/rocketseat_agents_ai_secretaryAI_nodejs_reacjs_2026?tab=MIT-1-ov-file#readme)

- [GitHub Licenses](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository#:~:text=You%27re%20under%20no%20obligation%20to%20choose%20a%20license.%20However%2C%20without%20a%20license%2C%20the%20default%20copyright%20laws%20apply%2C%20meaning%20that%20you%20retain%20all%20rights%20to%20your%20source%20code%20and%20no%20one%20may%20reproduce%2C%20distribute%2C%20or%20create%20derivative%20works%20from%20your%20work.).
