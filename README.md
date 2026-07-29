# Portfolio Backend API

API REST em TypeScript com autenticação JWT, usuários e posts, desenvolvida como exemplo de backend profissional para portfólio. O projeto foi estruturado com foco em clareza, separação de responsabilidades e facilidade de leitura.

## Visão geral

A aplicação expõe endpoints para:

- cadastro e autenticação de usuários;
- consulta de usuários;
- listagem e criação de posts vinculados ao autor;
- proteção de rotas por meio de middleware de autenticação.

## Stack

- Runtime: Node.js
- Linguagem: TypeScript
- Framework: Express
- ORM: Prisma
- Banco de dados: PostgreSQL
- Autenticação: JWT + bcrypt

## Requisitos

- Node.js 18+
- npm
- PostgreSQL em execução

## Configuração local

1. Instale as dependências:

```bash
npm install
```

2. Gere o cliente Prisma:

```bash
npx prisma generate
```

3. Aplique as migrações iniciais:

```bash
npx prisma migrate dev --name init
```

4. Crie um arquivo .env na raiz com:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/portfolio_api"
JWT_SECRET="uma_chave_secreta_forte"
PORT=3000
```

5. Inicie a API:

```bash
npm run dev
```

## Endpoints principais

### Autenticação

```http
POST /auth/register
POST /auth/login
GET /auth/me
```

### Usuários

```http
GET /users
GET /users/:id
```

### Posts

```http
GET /posts
GET /posts/:id
POST /posts
```

## Estrutura do projeto

```text
src/
├── controllers/
│   ├── auth.controller.ts
│   ├── post.controller.ts
│   └── user.controller.ts
├── middlewares/
│   └── auth.middleware.ts
├── lib/
│   ├── auth.ts
│   └── prisma.ts
├── routes/
│   ├── auth.routes.ts
│   ├── post.routes.ts
│   └── user.routes.ts
└── server.ts
```

## Scripts

```bash
npm run dev
npm run build
npm start
npm run prisma:generate
npm run prisma:migrate
```

## Próximos passos

- atualização e remoção de posts;
- atualização e remoção de usuários;
- validação de entrada com Zod;
- testes automatizados;
- documentação com Swagger/OpenAPI.