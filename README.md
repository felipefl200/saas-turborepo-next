# Monorepo SaaS com Next.js, RBAC e Fastify

Este repositório contém um sistema SaaS completo baseado em uma arquitetura de monorepo, utilizando Next.js para o frontend e Fastify para o backend, com implementação robusta de RBAC (Role-Based Access Control) para gerenciamento avançado de permissões em um ambiente multi-tenant.

## Licença

Este projeto está licenciado sob a **Licença Pública Geral GNU (GPL)**.

## Estrutura do Projeto

O projeto é organizado como um monorepo gerenciado pelo Turborepo, permitindo compartilhar código entre aplicações e melhorar a eficiência do desenvolvimento:

```
next-saas-rbac/
├── apps/            # Aplicações principais
│   ├── api/         # Backend Fastify + Prisma
│   ├── docs/        # Documentação do projeto
│   └── web/         # Interface web principal (Next.js)
├── packages/        # Pacotes compartilhados
│   ├── auth/        # Lógica de autenticação e RBAC
│   ├── env/         # Gerenciamento de variáveis de ambiente
│   └── ui/          # Componentes de UI compartilhados
├── config/          # Configurações compartilhadas
│   ├── eslint-config/      # Configurações do ESLint
│   ├── prettier/           # Configurações do Prettier
│   └── typescript-config/  # Configurações do TypeScript
├── docker-compose.yml      # Serviços Docker (ex: banco de dados)
├── .env.example            # Exemplo de variáveis de ambiente
└── turbo.json              # Configuração do Turborepo
```

## Tecnologias Principais

- **Frontend**: Next.js 14+
- **Backend**: Fastify
- **Banco de Dados**: PostgreSQL (Bitnami Docker)
- **ORM**: Prisma
- **Gerenciamento do Monorepo**: Turborepo
- **Estilização**: TailwindCSS
- **Autenticação**: Sistema personalizado com RBAC
- **Linting & Formatação**: ESLint e Prettier
- **Tipagem**: TypeScript

## Sistema de Autenticação e RBAC

O pacote `@saas/auth` implementa um sistema completo de autenticação com controle de acesso baseado em funções (RBAC), adaptado especificamente para ambientes multi-tenant:

- Gerenciamento de usuários por tenant
- Hierarquia de permissões configurável
- Middleware de autorização para rotas da API
- Componentes React para controle de acesso na UI

## Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm 11+
- Docker (para rodar o banco de dados PostgreSQL)

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/felipefl200/saas-turborepo-next.git
cd next-saas-rbac

# Instalar dependências (sempre na raiz do projeto)
npm install

# Subir o banco de dados PostgreSQL com Docker
docker compose up -d

# Iniciar ambiente de desenvolvimento
npm run dev
```

### Scripts Disponíveis

- `npm run dev` - Inicia o ambiente de desenvolvimento (todos os apps)
- `npm run build` - Compila todos os pacotes e aplicativos
- `npm run lint` - Executa o linting em todos os projetos

#### Scripts específicos do backend (`apps/api`):

- `npm run db:migrate` - Executa as migrations do Prisma
- `npm run db:generate` - Gera o client do Prisma
- `npm run db:seed` - Popula o banco com dados fake
- `npm run db:studio` - Abre o Prisma Studio
- `npm run db:reset` - Reseta o banco de dados
- `npm run db:push` - Atualiza o banco sem migrations

## Configuração de Ambiente

- Copie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário.
- O banco de dados padrão está configurado para rodar em `localhost:5432` com usuário e senha `docker`.

## Testando a API

Você pode usar o arquivo `api.http` na raiz do projeto para testar as rotas da API diretamente pelo VS Code (com a extensão REST Client).

## Configuração de Desenvolvimento

### ESLint

O projeto utiliza configurações de ESLint personalizadas com três perfis principais:

- `@saas/eslint-config/base` - Configuração base para todos os projetos
- `@saas/eslint-config/next-js` - Regras específicas para projetos Next.js
- `@saas/eslint-config/node` - Regras específicas para serviços Node.js

### Prettier

A formatação de código é padronizada através da configuração personalizada do Prettier em `@saas/prettier`, que inclui:

- Sem ponto e vírgula (semi: false)
- Aspas simples
- Organização automática de imports
- Suporte para TailwindCSS

### TypeScript

Configurações TypeScript compartilhadas estão disponíveis em `@saas/tsconfig` com diferentes perfis:

- `base.json` - Configurações básicas para todos os projetos
- `library.json` - Configurações para pacotes/bibliotecas
- `nextjs.json` - Configurações específicas para Next.js

## Contribuição

1. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
2. Faça commit das alterações (`git commit -m 'Descrição da feature'`)
3. Envie para a branch (`git push origin feature/nome-da-feature`)
4. Abra um Pull Request

---

**Nota**: Este README refere-se a um projeto em estágio inicial de desenvolvimento. A arquitetura e funcionalidades descritas estão sujeitas a alterações à medida que o projeto evolui.
