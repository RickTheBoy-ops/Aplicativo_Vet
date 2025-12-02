# VetField Flutter - README

## 🐾 Sobre o Projeto

VetField Flutter é a migração completa do aplicativo VetField de React Native/Expo para Flutter, mantendo todas as funcionalidades originais com melhor performance e compatibilidade nativa.

## 📋 Status da Migração

✅ **Concluído:**
- Estrutura completa do projeto Flutter
- Design System (cores, tipografia, espaçamento, tema)
- Modelos de dados (User, Animal, Booking, Review)
- Serviços de API (ApiClient com Dio, AuthService, BookingService)
- State Management (AuthProvider com Provider)
- Widgets reutilizáveis (AppButton, AppInput, AppCard, Loading)
- Telas iniciais (SplashScreen com correção de timeout e redirecionamento)
- Navegação com GoRouter (com Guards de Autenticação e RefreshListenable)
- Configurações e constantes (Ambientes Dev/Test/Prod)
- Testes Unitários de Navegação

⏳ **Em Progresso:**
- Implementação de mais telas (Owner Home, Vet Dashboard)
- Serviços adicionais (Location, Notifications)

❌ **Pendente:**
- Configuração completa do Firebase
- Testes de integração
- Build de produção nativo (APK/IPA) - Web já configurado

## 🛠️ Pré-requisitos

### 1. Instalar Flutter SDK

**IMPORTANTE:** Flutter não está instalado no sistema. Siga o guia completo em:
```
C:\APLICATIvo\flutter_sdk_setup.md
```

Principais passos:
1. Baixar Flutter SDK de https://docs.flutter.dev/get-started/install/windows
2. Extrair para `C:\flutter`
3. Adicionar `C:\flutter\bin` ao PATH do Windows
4. Instalar Android Studio e Android SDK
5. Executar `flutter doctor` para verificar

### 2. Configurar Ambiente

Após instalar o Flutter:

```powershell
# Verificar instalação
flutter doctor -v

# Aceitar licenças do Android
flutter doctor --android-licenses

# Listar dispositivos/emuladores
flutter devices

# Criar emulador (se necessário)
flutter emulators --create
```

## 🚀 Como Executar

### 1. Navegar até o projeto

```powershell
cd C:\APLICATIvo\vetfield_flutter
```

### 2. Instalar dependências

```powershell
flutter pub get
```

### 3. Executar o aplicativo

```powershell
# Iniciar emulador Android (se não estiver rodando)
flutter emulators --launch <emulator_id>

# Rodar o app
flutter run

# Ou especificar dispositivo
flutter run -d <device_id>
```

### 4. Executar no navegador (hot-reload)

Requer Docker Desktop instalado.

```powershell
# Defina variáveis no .env (veja seção Variáveis de Ambiente)
# Inicie ambiente de desenvolvimento com hot-reload
docker compose --profile dev up

# ou
docker-compose --profile dev up

# Acesse no navegador
# http://localhost:5173 (ou porta definida em WEB_PORT)
```

Para encerrar:

```powershell
docker compose down
```

### 5. Executar testes

```powershell
# Local
flutter test

# Docker
docker compose --profile test run --rm test
```

### 6. Build de produção (Web)

```powershell
# Gera build otimizado e serve via NGINX
docker compose --profile prod up --build

# Acesse no navegador
# http://localhost:8080 (ou porta definida em WEB_PORT)
```

## 📁 Estrutura do Projeto

```
vetfield_flutter/
├── lib/
│   ├── core/                      # Configurações e utilitários
│   │   ├── theme/                 # Design system
│   │   │   ├── app_colors.dart    # Cores
│   │   │   ├── app_typography.dart # Tipografia
│   │   │   ├── app_spacing.dart   # Espaçamento
│   │   │   └── app_theme.dart     # Tema principal
│   │   ├── config/
│   │   │   └── app_config.dart    # Configurações
│   │   └── constants/
│   │       └── app_constants.dart # Constantes
│   │
│   ├── data/                      # Camada de dados
│   │   ├── models/                # Modelos de dados
│   │   └── services/              # Serviços
│   │       ├── api/               # Serviços de API (Dio)
│   │       └── storage/           # Armazenamento local
│   │
│   ├── providers/                 # State management (Provider)
│   │   ├── auth_provider.dart     # Lógica de Auth
│   │   └── ...
│   │
│   ├── presentation/              # UI
│   │   ├── screens/               # Telas
│   │   │   └── auth/
│   │   │       └── splash_screen.dart
│   │   ├── widgets/               # Widgets reutilizáveis
│   │   └── navigation/            # Navegação (GoRouter)
│   │       └── app_router.dart
│   │
│   ├── features/                  # Features específicas
│   │
│   └── main.dart                  # Entry point
│
├── assets/                        # Assets
├── test/                          # Testes
│   ├── unit/
│   ├── widget/
│   └── presentation/              # Testes de UI/Navegação
│
├── android/                       # Configuração Android
├── ios/                           # Configuração iOS
│
├── docker-compose.yml             # Orquestração Docker
├── Dockerfile                     # Build de produção
└── pubspec.yaml                   # Dependências
```

## 🎨 Design System

### Cores Principais
- **Primary:** `#2180CD` (Teal)
- **Secondary:** `#5E5240` (Brown)
- **Success:** `#218C8D`
- **Error:** `#C0152F`
- **Background:** `#FFFBF9`

### Tipografia
- **Font Family:** Inter
- **H1:** 30px, weight 600
- **H2:** 24px, weight 600
- **Body:** 14px, weight 400

## 🔧 Comandos Úteis

```powershell
# Verificar problemas
flutter doctor

# Limpar cache
flutter clean
flutter pub get

# Analisar código
flutter analyze

# Formatar código
flutter format .

# Executar testes
flutter test

# Build APK de produção
flutter build apk --release

# Build Web de produção
flutter build web --release --dart-define=APP_ENV=production

# Ver logs
flutter logs
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz com base em `.env.example`.

```
API_URL=http://localhost:3000/api
ENVIRONMENT=development
WEB_PORT=5173
```

**Nota:** A variável `ENVIRONMENT` no `.env` é mapeada para `APP_ENV` dentro do código Dart via Docker.

Ambientes suportados:

- development: `ENVIRONMENT=development`
- test: `ENVIRONMENT=test`
- production: `ENVIRONMENT=production`

Para builds nativos manuais, você deve passar as flags explicitamente:

```powershell
flutter run -d chrome \
  --dart-define=APP_ENV=development \
  --dart-define=API_URL=http://localhost:3000/api
```

## 📦 Dependências Principais

- **provider:** State management
- **dio:** HTTP client
- **go_router:** Navegação
- **flutter_secure_storage:** Armazenamento seguro
- **hive:** Database local
- **google_maps_flutter:** Mapas
- **geolocator:** Geolocalização
- **firebase_messaging:** Push notifications
- **lottie:** Animações

Ver `pubspec.yaml` para lista completa.

## 🐛 Troubleshooting

### Flutter não reconhecido
- Feche todos os terminais e abra um novo
- Verifique se `C:\flutter\bin` está no PATH
- Execute `flutter doctor`

### Erro ao executar `flutter pub get`
```powershell
flutter clean
flutter pub get
```

### Splash Screen travada
- O sistema possui um timeout de 5s na inicialização. Se o backend estiver offline, ele redirecionará para Login automaticamente.
- Verifique os logs do console do navegador/emulador para detalhes de erro de conexão.

## 📞 Suporte

Para dúvidas sobre Flutter:
- Documentação oficial: https://docs.flutter.dev
- Flutter Doctor: `flutter doctor -v`

---

**Versão:** 1.0.0 (Migração em progresso)  
**Última Atualização:** Dezembro 2025  
**Framework:** Flutter 3.0+
