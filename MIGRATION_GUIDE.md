# Guia de Migração: React Native → Flutter

Este documento mapeia os componentes React Native/Expo do VetField original para seus equivalentes Flutter.

## Principais Diferenças

| Aspecto | React Native/Expo | Flutter |
|---------|-------------------|---------|
| Linguagem | JavaScript/TypeScript | Dart |
| State Management | Zustand | Provider |
| HTTP Client | Axios | Dio |
| Navigation | React Navigation | GoRouter |
| Secure Storage | Expo Secure Store | flutter_secure_storage |
| Database | Realm | Hive |
| Maps | react-native-maps | google_maps_flutter |
| Location | Expo Location | Geolocator |
| Notifications | Expo Notifications | Firebase Messaging |
| Animations | Lottie | Lottie (mesmo package) |

## Mapeamento de Componentes

### Core Components

| React Native | Flutter |
|--------------|---------|
| `<View>` | `Container` ou `Column/Row` |
| `<Text>` | `Text` |
| `<TouchableOpacity>` | `GestureDetector` ou `InkWell` |
| `<ScrollView>` | `SingleChildScrollView` |
| `<FlatList>` | `ListView.builder` |
| `<Image>` | `Image` ou `CachedNetworkImage` |
| `<TextInput>` | `TextField` |
| `<ActivityIndicator>` | `CircularProgressIndicator` |
| `<Modal>` | `showDialog()` ou `showModalBottomSheet()` |
| `<SafeAreaView>` | `SafeArea` |

### Custom Components

| VetField RN | VetField Flutter | Localização |
|-------------|------------------|-------------|
| `Button.tsx` | `app_button.dart` | `lib/presentation/widgets/common/` |
| `Input.tsx` | `app_input.dart` | `lib/presentation/widgets/common/` |
| `Card.tsx` | `app_card.dart` | `lib/presentation/widgets/common/` |
| `Loading.tsx` | `loading_widget.dart` | `lib/presentation/widgets/common/` |
| `RatingStars.tsx` | `rating_stars.dart` | `lib/presentation/widgets/common/` |

### Screens

| React Native Screen | Flutter Screen | Status |
|---------------------|----------------|--------|
| `SplashScreen.tsx` | `splash_screen.dart` | ✅ Migrado |
| `LoginScreen.tsx` | `login_screen.dart` | ✅ Migrado |
| `RegisterScreen.tsx` | `register_screen.dart` | ✅ Migrado |
| `RegisterTypeScreen.tsx` | `register_type_screen.dart` | ✅ Migrado |
| `ForgotPasswordScreen.tsx` | `forgot_password_screen.dart` | ⏳ Pendente |
| `HomeScreen.tsx` (Owner) | `owner/home_screen.dart` | ⏳ Pendente |
| `SearchVetScreen.tsx` | `owner/search_vet_screen.dart` | ⏳ Pendente |
| `VetDetailScreen.tsx` | `owner/vet_detail_screen.dart` | ⏳ Pendente |
| `DashboardScreen.tsx` (Vet) | `vet/dashboard_screen.dart` | ⏳ Pendente |

### Services

| React Native Service | Flutter Service | Status |
|---------------------|-----------------|--------|
| `client.ts` | `api_client.dart` | ✅ Migrado |
| `authService.ts` | `auth_service.dart` | ✅ Migrado |
| `vetService.ts` | `vet_service.dart` | ✅ Migrado |
| `bookingService.ts` | `booking_service.dart` | ✅ Migrado |
| `paymentService.ts` | `payment_service.dart` | ⏳ Pendente |
| `subscriptionService.ts` | `subscription_service.dart` | ⏳ Pendente |

### State Management

| Zustand Store (RN) | Provider (Flutter) | Status |
|--------------------|-------------------|--------|
| `useAuthStore` | `AuthProvider` | ✅ Migrado |
| `useVetStore` | `VetProvider` | ✅ Migrado |
| `useBookingStore` | `BookingProvider` | ✅ Migrado |
| `useLocationStore` | `LocationProvider` | ⏳ Pendente |

## Padrões de Código

### Lifecycle

**React Native (useEffect):**
```typescript
useEffect(() => {
  fetchData();
}, []);
```

**Flutter (initState):**
```dart
@override
void initState() {
  super.initState();
  fetchData();
}
```

### State

**React Native (useState):**
```typescript
const [count, setCount] = useState(0);
```

**Flutter (StatefulWidget):**
```dart
int _count = 0;

void incrementCount() {
  setState(() {
    _count++;
  });
}
```

### Navigation

**React Native (React Navigation):**
```typescript
navigation.navigate('Details', { id: '123' });
```

**Flutter (GoRouter):**
```dart
context.go('/details/123');
// ou
context.push('/details', extra: {'id': '123'});
```

### API Calls

**React Native (Axios):**
```typescript
const response = await axios.get('/api/vets');
const vets = response.data;
```

**Flutter (Dio):**
```dart
final response = await _apiClient.get('/vets');
final vets = (response.data as List)
    .map((json) => VetModel.fromJson(json))
    .toList();
```

## Mudanças Arquiteturais

### 1. Type Safety

Flutter/Dart é fortemente tipado por padrão:
- Todos os modelos precisam de classes definidas
- Generics são mais estritos
- Null safety é obrigatório

### 2. Widget Tree

React usa JSX, Flutter usa widget tree:
```dart
Column(
  children: [
    Text('Hello'),
    Button(onPressed: () {}),
  ],
)
```

### 3. Assincronicidade

- React: Promise/async-await
- Flutter: Future/async-await (similar)

### 4. Styling

- React Native: StyleSheet objects
- Flutter: Widget properties ou ThemeData

## Performance

### Otimizações Flutter

1. **const constructors** - Use sempre que possível
2. **ListView.builder** - Para listas longas
3. **RepaintBoundary** - Para isolar widgets pesados
4. **CachedNetworkImage** - Para imagens de rede

## Testes

### Unit Tests

**React Native (Jest):**
```typescript
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

**Flutter:**
```dart
test('adds 1 + 2 to equal 3', () {
  expect(sum(1, 2), equals(3));
});
```

### Widget Tests

**Flutter:**
```dart
testWidgets('Counter increments', (tester) async {
  await tester.pumpWidget(MyWidget());
  await tester.tap(find.byIcon(Icons.add));
  await tester.pump();
  expect(find.text('1'), findsOneWidget);
});
```

## Recursos Úteis

- [Flutter Documentation](https://docs.flutter.dev)
- [Dart Language Tour](https://dart.dev/guides/language/language-tour)
- [Provider Package](https://pub.dev/packages/provider)
- [GoRouter Package](https://pub.dev/packages/go_router)
- [Dio Package](https://pub.dev/packages/dio)

## Próximos Passos

1. ✅ Estrutura base migrada
2. ✅ Telas de autenticação migradas
3. ⏳ Migrar telas do Owner
4. ⏳ Migrar telas do Vet
5. ⏳ Implementar Google Maps
6. ⏳ Configurar Firebase
7. ⏳ Implementar testes
