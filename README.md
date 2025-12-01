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
- Telas iniciais (SplashScreen)
- Configurações e constantes

⏳ **Em Progresso:**
- Implementação de mais telas
- Navegação com GoRouter
- Serviços adicionais (Location, Notifications)

❌ **Pendente:**
- Instalação do Flutter SDK (ver instruções abaixo)
- Configuração do Firebase
- Testes unitários e de integração
- Build de produção

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
│   │   │   ├── user_model.dart
│   │   │   ├── animal_model.dart
│   │   │   ├── booking_model.dart
│   │   │   └── review_model.dart
│   │   └── services/              # Serviços
│   │       ├── api/               # Serviços de API
│   │       │   ├── api_client.dart
│   │       │   ├── auth_service.dart
│   │       │   └── booking_service.dart
│   │       ├── storage/           # Armazenamento local
│   │       ├── location/          # Geolocalização
│   │       └── notification/      # Notificações
│   │
│   ├── providers/                 # State management
│   │   └── auth_provider.dart
│   │
│   ├── presentation/              # UI
│   │   ├── screens/               # Telas
│   │   │   └── auth/
│   │   │       └── splash_screen.dart
│   │   ├── widgets/               # Widgets reutilizáveis
│   │   │   └── common/
│   │   │       ├── app_button.dart
│   │   │       ├── app_input.dart
│   │   │       ├── app_card.dart
│   │   │       └── loading_widget.dart
│   │   └── navigation/            # Navegação
│   │
│   ├── features/                  # Features específicas
│   │
│   └── main.dart                  # Entry point
│
├── assets/                        # Assets
│   ├── images/
│   ├── animations/
│   └── fonts/
│
├── test/                          # Testes
│   ├── unit/
│   ├── widget/
│   └── integration/
│
├── android/                       # Configuração Android
├── ios/                           # Configuração iOS
│
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

### Espaçamento
- xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 20px, xxl: 24px

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

# Build APK debug
flutter build apk --debug

# Ver logs
flutter logs

# Hot reload (durante execução)
# Pressione 'r' no terminal

# Hot restart (durante execução)
# Pressione 'R' no terminal
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz (ainda não implementado, será necessário para produção):

```
API_URL=https://api.vetfield.com
GOOGLE_MAPS_API_KEY_ANDROID=your_android_key
GOOGLE_MAPS_API_KEY_IOS=your_ios_key
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

### Emulador não inicia
- Verifique se virtualização está habilitada na BIOS
- Abra Android Studio → AVD Manager
- Crie novo emulador

### Erro de gradlew permission (Android)
```powershell
cd android
./gradlew clean
cd ..
flutter run
```

## 📱 Próximos Passos

1. ✅ **Instalar Flutter SDK** (seguir `flutter_sdk_setup.md`)
2. ⏳ **Executar** `flutter pub get` no projeto
3. ⏳ **Configurar Firebase** (quando necessário)
4. ⏳ **Implementar telas restantes** (Login, Home, etc)
5. ⏳ **Configurar Google Maps** (adicionar API keys)
6. ⏳ **Implementar testes**
7. ⏳ **Build de produção**

## 📞 Suporte

Para dúvidas sobre Flutter:
- Documentação oficial: https://docs.flutter.dev
- Flutter Doctor: `flutter doctor -v`

---

**Versão:** 1.0.0 (Migração em progresso)  
**Última Atualização:** Dezembro 2024  
**Framework:** Flutter 3.0+
