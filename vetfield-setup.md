# 🐾 VetField - Setup Inicial do Projeto

## Estrutura de Pastas

```
vetfield/
├── app/
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   └── ForgotPasswordScreen.tsx
│   │   ├── owner/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── SearchVetScreen.tsx
│   │   │   ├── BookingScreen.tsx
│   │   │   ├── MyBookingsScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   └── vet/
│   │       ├── DashboardScreen.tsx
│   │       ├── AvailabilityScreen.tsx
│   │       ├── AppointmentsScreen.tsx
│   │       ├── SubscriptionScreen.tsx
│   │       └── ProfileScreen.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── Header.tsx
│   │   ├── vet/
│   │   │   ├── VetCard.tsx
│   │   │   ├── VetFilter.tsx
│   │   │   └── RatingCard.tsx
│   │   └── booking/
│   │       ├── BookingForm.tsx
│   │       └── TimeSlotPicker.tsx
│   ├── services/
│   │   ├── api/
│   │   │   ├── authService.ts
│   │   │   ├── vetService.ts
│   │   │   ├── bookingService.ts
│   │   │   ├── subscriptionService.ts
│   │   │   └── client.ts (Axios/Fetch config)
│   │   ├── geolocation/
│   │   │   └── locationService.ts
│   │   ├── storage/
│   │   │   └── storageService.ts
│   │   └── notifications/
│   │       └── pushNotificationService.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── UserContext.tsx
│   │   └── LocationContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useLocation.ts
│   │   └── useFetch.ts
│   ├── types/
│   │   ├── user.ts
│   │   ├── vet.ts
│   │   ├── booking.ts
│   │   └── subscription.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── OwnerNavigator.tsx
│   │   └── VetNavigator.tsx
│   ├── styles/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── theme.ts
│   └── App.tsx
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .env.example
├── .eslintrc.js
├── .prettierrc.json
├── app.json
├── package.json
├── tsconfig.json
├── babel.config.js
└── README.md
```

---

## Inicializar Projeto

```bash
# 1. Criar novo projeto Expo com TypeScript
npx create-expo-app vetfield --template

# 2. Navegar para o projeto
cd vetfield

# 3. Instalar dependências principais
npm install

# 4. Instalar dependências adicionais (próximo passo)
```

---

## Próximo Passo

Execute os comandos acima e confirme quando tiver o projeto criado. Depois vou gerar:

1. **package.json** completo com todas as dependências
2. **.eslintrc.js** e **.prettierrc.json** configurados
3. **Arquivos de configuração** (tsconfig.json, app.json, babel.config.js)
4. **GitHub Actions CI/CD pipeline** (.github/workflows/ci.yml)
5. **Primeiros componentes e services** (Auth, API Client, etc.)

Quer que eu proceda? 🚀
