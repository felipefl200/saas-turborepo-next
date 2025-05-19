# Monorepo SaaS com Next.js, RBAC e Fastify

Este repositório contém um sistema SaaS completo baseado em uma arquitetura de monorepo, utilizando Next.js para o frontend e Fastify para o backend, com implementação robusta de RBAC (Role-Based Access Control) para gerenciamento avançado de permissões em um ambiente multi-tenant.

## Estrutura do Projeto

O projeto é organizado como um monorepo gerenciado pelo Turborepo, permitindo compartilhar código entre aplicações e melhorar a eficiência do desenvolvimento:

```
next-saas-rbac/
├── apps/            # Aplicações principais
│   ├── docs/        # Documentação do projeto
│   └── web/         # Interface web principal (Next.js)
├── packages/        # Pacotes compartilhados
│   ├── auth/        # Lógica de autenticação e RBAC
│   └── ui/          # Componentes de UI compartilhados
└── config/          # Configurações compartilhadas
    ├── eslint-config/  # Configurações do ESLint
    ├── prettier/       # Configurações do Prettier
    └── typescript-config/ # Configurações do TypeScript
```

## Tecnologias Principais

- **Frontend**: Next.js 14+
- **Backend**: Fastify
- **Gerenciamento do Monorepo**: Turborepo
- **Estilização**: TailwindCSS
- **Autenticação**: Sistema personalizado com RBAC
- **Linting & Formatação**: ESLint e Prettier
- **Tipagem**: TypeScript

## Sistema de Autenticação e RBAC

O pacote `@saas/auth` implementa um sistema completo de autenticação com controle de acesso baseado em funções (RBAC), adaptado especificamente para ambientes multi-tenant:

- Gerenciamento de usuários por tenant
- Hierarquia de permissões configurável
- Middleware de autorização para API routes
- Componentes React para controle de acesso na UI

## Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm 11+

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/felipefl200/saas-turborepo-next.git
cd next-saas-rbac

# Instalar dependências
npm install

# Iniciar ambiente de desenvolvimento
npm run dev
```

### Scripts Disponíveis

- `npm run dev` - Inicia o ambiente de desenvolvimento
- `npm run build` - Compila todos os pacotes e aplicativos
- `npm run lint` - Executa o linting em todos os projetos

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

1. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
2. Faça commit das alterações (`git commit -m 'Add some amazing feature'`)
3. Envie para a branch (`git push origin feature/amazing-feature`)
4. Abra um Pull Request

## Licença

Este projeto é proprietário e não está licenciado para uso público.

---

**Nota**: Este README refere-se a um projeto em estágio inicial de desenvolvimento. A arquitetura e funcionalidades descritas estão sujeitas a alterações à medida que o projeto evolui.
