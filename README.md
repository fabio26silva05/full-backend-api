# Portfolio Backend API

API REST em TypeScript com autenticação JWT, usuários e posts, construída para demonstrar um backend modular e pronto para portfólio.

## Funcionalidades

- ✅ Autenticação com JWT
- ✅ Registro e login de usuários
- ✅ Listagem de usuários
- ✅ Listagem de posts
- ✅ Criação de posts autenticados
- ✅ Middleware de autenticação
- ✅ Tratamento de erros global
- ✅ Configuração com variáveis de ambiente

## Tech Stack

- **Runtime:** Node.js
- **Linguagem:** TypeScript
- **Framework:** Express.js
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT + bcrypt

## Como rodar

### Pré-requisitos
- Node.js 18+
- npm
- PostgreSQL rodando

### Instalação

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/portfolio_api"
JWT_SECRET="sua_chave_secreta_super_segura"
PORT=3000
```

## Configuração

1. Copie `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Atualize as variáveis conforme necessário

## Endpoints

### Auth
```http
POST /auth/register
Content-Type: application/json

{
  "name": "Usuário Exemplo",
  "email": "usuario.exemplo@example.com",
  "password": "sua_senha_secreta"
}
```

```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario.exemplo@example.com",
  "password": "sua_senha_secreta"
}
```

```http
GET /auth/me
Authorization: Bearer <token>
```

### Users
```http
GET /users
GET /users/:id
```

### Posts
```http
GET /posts
GET /posts/:id
POST /posts
Authorization: Bearer <token>
```

## Exemplo de requisição

### Registrar usuário

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuário Exemplo",
    "email": "usuario.exemplo@example.com",
    "password": "sua_senha_secreta"
  }'
```

### Fazer login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario.exemplo@example.com",
    "password": "sua_senha_secreta"
  }'
```

## Estrutura do projeto

```text
src/
├── controllers/
│   ├── auth.controller.ts
│   ├── post.controller.ts
│   └── user.controller.ts
├── middlewares/
│   ├── auth.middleware.ts
│   └── auth.ts
├── lib/
│   └── prisma.ts
├── routes/
│   ├── auth.routes.ts
│   ├── post.routes.ts
│   └── user.routes.ts
└── server.ts
prisma/
└── schema.prisma
```

## Scripts disponíveis

```bash
npm run dev
npm run build
npm start
npm run prisma:generate
npm run prisma:migrate
```

## Deploy

A API pode ser publicada em plataformas como Render ou Railway com suporte a Node.js e PostgreSQL.

## TODO

- [ ] Update/delete de posts
- [ ] Update/delete de usuários
- [ ] Validação com Zod
- [ ] Testes unitários
- [ ] Swagger/OpenAPI