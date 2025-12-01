# VetField

🐾 Plataforma mobile que conecta proprietários de animais com veterinários para atendimentos em campo.

## 📋 Sobre o Projeto

VetField é uma aplicação mobile desenvolvida com React Native + Expo que facilita o encontro entre donos de pets e veterinários profissionais para atendimento em campo.

### Funcionalidades Principais

**Para Proprietários:**
- Cadastro gratuito
- Busca de veterinários por localização, especialidade e disponibilidade
- Visualização de perfis profissionais com avaliações
- Agendamento de consultas
- Gerenciamento de animais
- Histórico de atendimentos

**Para Veterinários:**
- Perfil profissional completo
- Gerenciamento de disponibilidade
- Sistema de assinaturas (Free, Basic, Premium)
- Dashboard com agendamentos e receita
- Notificações push para novos agendamentos

## 🛠️ Stack Tecnológico

- **Framework:** React Native + Expo ~50.0.0
- **Linguagem:** TypeScript
- **Navegação:** React Navigation
- **State Management:** Zustand
- **API Client:** Axios
- **Mapas:** React Native Maps + Google Maps API
- **Localização:** Expo Location
- **Notificações:** Expo Notifications
- **Autenticação:** JWT + Expo Secure Store
- **Formatação:** Prettier
- **Linting:** ESLint (Airbnb)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Editar .env com suas configurações
# - API_URL
# - GOOGLE_MAPS_API_KEY
# - etc.
```

## 🚀 Executando o Projeto

```bash
# Iniciar servidor de desenvolvimento
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 📁 Estrutura do Projeto

```
vetfield/
├── app/
│   ├── components/        # Componentes reutilizáveis
│   ├── screens/           # Telas da aplicação
│   ├── navigation/        # Configuração de navegação
│   ├── services/          # Serviços (API, Storage, Location)
│   ├── context/           # Contexts (Auth, Location)
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript types
│   ├── utils/             # Utilitários (validators, formatters)
│   └── styles/            # Design system (colors, typography)
├── assets/                # Imagens, ícones, fontes
├── .env.example           # Exemplo de variáveis de ambiente
├── app.json               # Configuração do Expo
├── package.json           # Dependências
└── tsconfig.json          # Configuração TypeScript
```

## 🎨 Design System

### Cores
- **Primary:** #2180CD (Teal)
- **Secondary:** #5E5240 (Brown)
- **Success:** #218C8D (Verde)
- **Error:** #C0152F (Vermelho)
- **Warning:** #A84B2F (Laranja)
- **Background:** #FFFBF9 (Cream)

### Tipografia
- **H1:** 30px, weight 600
- **H2:** 24px, weight 600
- **H3:** 20px, weight 600
- **Body:** 14px, weight 400

### Espaçamento
- **xs:** 4px
- **sm:** 8px
- **md:** 12px
- **lg:** 16px
- **xl:** 20px
- **2xl:** 24px

## 🧪 Testes

```bash
# Executar testes
npm test

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run lint` - Executa o linter
- `npm run lint:fix` - Corrige problemas de linting
- `npm run format` - Formata o código com Prettier
- `npm run type-check` - Verifica tipos TypeScript

## 🔐 Segurança

- Tokens armazenados em Expo Secure Store
- HTTPS para todas as chamadas de API
- Validação de inputs no frontend e backend
- Refresh automático de tokens

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Time

Desenvolvido por [Seu Nome/Empresa]

## 📞 Suporte

Para suporte, entre em contato:
- Email: support@vetfield.com
- Telefone: (11) 99999-9999

---

**Versão:** 1.0.0  
**Status:** Em Desenvolvimento  
**Última Atualização:** Dezembro 2024
