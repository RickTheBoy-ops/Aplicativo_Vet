# Como Iniciar Preview do VetField Flutter

## ⚠️ Status Atual

**Flutter SDK:** ❌ NÃO INSTALADO

Para iniciar o preview do app, você precisa primeiro instalar o Flutter SDK.

---

## 🚀 Passos para Ver o App Rodando

### Opção 1: Instalação Completa (Recomendado)

#### 1. Instalar Flutter SDK

Siga o guia detalhado em: `flutter_sdk_setup.md`

**Resumo rápido:**
```powershell
# 1. Baixar Flutter
# Acesse: https://docs.flutter.dev/get-started/install/windows
# Baixe e extraia para C:\flutter

# 2. Adicionar ao PATH
# Adicione C:\flutter\bin às variáveis de ambiente do Windows

# 3. Verificar instalação (em um NOVO terminal)
flutter doctor

# 4. Aceitar licenças Android
flutter doctor --android-licenses
```

#### 2. Navegar para o Projeto

```powershell
cd C:\APLICATIvo\vetfield_flutter
```

#### 3. Instalar Dependências

```powershell
flutter pub get
```

#### 4. Iniciar Emulador Android

```powershell
# Listar emuladores disponíveis
flutter emulators

# Iniciar emulador
flutter emulators --launch <nome_do_emulador>

# OU abrir Android Studio → Tools → AVD Manager → Play
```

#### 5. Executar o App

```powershell
flutter run
```

**Resultado esperado:**
- App inicia no emulador
- Você verá o SplashScreen com logo animado
- Após 3 segundos, vai para a tela de Login

---

### Opção 2: Preview Web (Mais Rápido para Testar)

```powershell
# Após instalar Flutter e dependências
flutter run -d chrome
```

Isso abrirá o app no navegador Chrome (sem precisar de emulador Android).

---

### Opção 3: Hot Reload durante Desenvolvimento

Enquanto o app estiver rodando:

- **Pressione `r`** - Hot reload (recarrega código sem perder estado)
- **Pressione `R`** - Hot restart (reinicia o app)
- **Pressione `q`** - Quit (sair)

---

## 🎯 O Que Você Verá

### 1. Splash Screen (3 segundos)
- Logo do VetField com gradiente teal
- Ícone de pata (🐾)
- Animação de entrada

### 2. Login Screen
- Campo de email
- Campo de senha (com toggle para mostrar/esconder)
- Botão "Entrar"
- Link "Esqueceu a senha?"
- Botão "Criar uma conta"

### 3. Register Type Screen (ao clicar em "Criar conta")
- Card gradiente azul: "Sou Dono de Pet"
- Card gradiente verde: "Sou Veterinário"

### 4. Register Screen (após escolher tipo)
- Formulário completo de registro
- Campos específicos para Owner (CPF) ou Vet (CRMV)
- Validação em tempo real

---

## 🐛 Troubleshooting

### "flutter: The term 'flutter' is not recognized"

**Solução:**
1. Certifique-se de ter instalado o Flutter em `C:\flutter`
2. Adicione `C:\flutter\bin` ao PATH do Windows
3. **FECHE e REABRA** o terminal (importante!)
4. Execute `flutter doctor`

### "No devices found"

**Solução:**
```powershell
# Verificar dispositivos
flutter devices

# Se vazio, criar emulador
flutter emulators --create

# Ou iniciar emulador existente
flutter emulators --launch <nome>
```

### "Gradle build failed"

**Solução:**
```powershell
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
flutter run
```

### Erro de licença Android

**Solução:**
```powershell
flutter doctor --android-licenses
# Pressione 'y' para todas
```

---

## ⏱️ Tempo Estimado

- **Instalação do Flutter:** 20-40 minutos
- **Setup do projeto:** 5 minutos
- **Primeiro run:** 2-5 minutos (compilação inicial)
- **Runs subsequentes:** 10-30 segundos (hot reload)

---

## 📱 Comandos Úteis Durante Desenvolvimento

```powershell
# Ver logs detalhados
flutter run -v

# Rodar em dispositivo específico
flutter run -d <device_id>

# Build APK de debug
flutter build apk --debug

# Limpar build cache
flutter clean

# Verificar problemas
flutter doctor -v

# Analisar código
flutter analyze

# Ver widgets em debug mode
# (No emulador: pressione 'w')
```

---

## 🎨 Preview Visual das Telas

Como o Flutter ainda não está instalado, veja mockups das telas em:
- `VISUAL_PREVIEW.md` (será criado)

Ou visite o navegador para ver wireframes das interfaces.

---

## ✅ Checklist de Pré-requisitos

Antes de executar `flutter run`:

- [ ] Flutter SDK instalado (`flutter --version` funciona)
- [ ] Android Studio instalado
- [ ] Android SDK instalado
- [ ] Licenças aceitas (`flutter doctor` sem ❌)
- [ ] Emulador criado ou dispositivo conectado
- [ ] Dependências instaladas (`flutter pub get`)

---

## 🆘 Ajuda Adicional

Se encontrar problemas:

1. Execute `flutter doctor -v` e compartilhe o output
2. Verifique o arquivo `flutter_sdk_setup.md` para instruções detalhadas
3. Consulte https://docs.flutter.dev/get-started/install/windows

---

**Próximo passo:** Seguir o guia `flutter_sdk_setup.md` para instalar o Flutter SDK.
