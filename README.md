# Portfolio Backend API

API REST em TypeScript com autenticação JWT, gerenciamento de usuários e posts. Projeto desenvolvido para demonstrar conhecimento em arquitetura backend moderna e boas práticas de desenvolvimento.

## Funcionalidades

- ✅ Autenticação com JWT
- ✅ CRUD de usuários e posts
- ✅ Validação de dados
- ✅ Estrutura modular (routes, controllers, middlewares)
- ✅ Tratamento de erros robusto
- ✅ Configuração com variáveis de ambiente

## Tech Stack

- **Runtime:** Node.js
- **Linguagem:** TypeScript
- **Framework:** Express.js
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT (jsonwebtoken)
- **Validação:** Zod (opcional)

## Como rodar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- PostgreSQL rodando

### Instalação

```bash
# Clone o repositório
git clone https://github.com/fabio26silva05/full-backend-api.git
cd full-backend-api

# Instale as dependências
npm install

# Configure o banco de dados
npx prisma migrate dev --name init

# Inicie o servidor
npm run dev
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_api"
JWT_SECRET="sua_chave_secreta_super_segura"
PORT=3000
NODE_ENV=development
```

## Endpoints

### Auth
```
POST /auth/register
Body: { email, password, name }
Response: { id, email, name, token }

POST /auth/login
Body: { email, password }
Response: { token, user: { id, email, name } }
```

### Users
```
GET /users/:id
Headers: { Authorization: Bearer {token} }
Response: { id, email, name, createdAt }

PUT /users/:id
Headers: { Authorization: Bearer {token} }
Body: { name, email }
Response: { id, email, name, updatedAt }

DELETE /users/:id
Headers: { Authorization: Bearer {token} }
Response: { message: "User deleted" }
```

### Posts
```
POST /posts
Headers: { Authorization: Bearer {token} }
Body: { title, content }
Response: { id, title, content, authorId, createdAt }

GET /posts
Response: [{ id, title, content, author: { name, email }, createdAt }]

GET /posts/:id
Response: { id, title, content, author: { name, email }, createdAt }

PUT /posts/:id
Headers: { Authorization: Bearer {token} }
Body: { title, content }
Response: { id, title, content, updatedAt }

DELETE /posts/:id
Headers: { Authorization: Bearer {token} }
Response: { message: "Post deleted" }
```

## Exemplo de requisição

### Registrar usuário

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "senha123",
    "name": "João Silva"
  }'
```

### Fazer login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "senha123"
  }'
```

### Criar post (autenticado)

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "title": "Meu primeiro post",
    "content": "Conteúdo do post aqui"
  }'
```

## Estrutura do projeto

```
src/
├── controllers/
│   ├── authController.ts
│   ├── userController.ts
│   └── postController.ts
├── middlewares/
│   └── auth.ts
├── routes/
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   └── post.routes.ts
├── server.ts
└── types/
    └── index.ts
prisma/
└── schema.prisma
```

## Deploy

A API está disponível em: [link do deploy]

Você pode fazer deploy gratuitamente em:
- **Render:** https://render.com
- **Railway:** https://railway.app
- **Vercel:** https://vercel.com

## Desenvolvimento

### Scripts disponíveis

```bash
# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar produção
npm run start

# Executar testes (quando implementados)
npm run test

# Verificar tipos TypeScript
npm run type-check
```

## Próximos passos

- [ ] Implementar testes unitários (Jest)
- [ ] Adicionar validação com Zod
- [ ] Implementar refresh tokens
- [ ] Adicionar rate limiting
- [ ] Documentação com Swagger/OpenAPI
- [ ] Setup com Docker
- [ ] Implementar paginação

## Contribuindo

Sinta-se livre para fazer fork, criar branches e submeter pull requests.

## Contato

- **Email:** fabio26silva05@gmail.com
- **LinkedIn:** https://linkedin.com/in/eufabiosb
- **GitHub:** https://github.com/fabio26silva05

---

