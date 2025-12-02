import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';
import 'package:mockito/mockito.dart';
import 'package:vetfield_flutter/presentation/navigation/app_router.dart';
import 'package:vetfield_flutter/providers/auth_provider.dart';

// Mock manual para AuthProvider
class MockAuthProvider extends ChangeNotifier implements AuthProvider {
  bool _isAuthenticated = false;
  bool _isOwner = false;
  bool _isVet = false;

  @override
  bool get isAuthenticated => _isAuthenticated;
  
  @override
  bool get isOwner => _isOwner;
  
  @override
  bool get isVet => _isVet;

  void setAuthenticated(bool value) {
    _isAuthenticated = value;
  }

  void setOwner(bool value) {
    _isOwner = value;
  }

  void setVet(bool value) {
    _isVet = value;
  }
  
  @override
  dynamic noSuchMethod(Invocation invocation) => super.noSuchMethod(invocation);
}

// Mock manual para GoRouterState
class MockGoRouterState extends Fake implements GoRouterState {
  final String _matchedLocation;

  MockGoRouterState(this._matchedLocation);

  @override
  String get matchedLocation => _matchedLocation;
}

// Mock context
class MockBuildContext extends Fake implements BuildContext {}

void main() {
  group('AuthRedirect Logic', () {
    late MockAuthProvider authProvider;
    late MockBuildContext context;

    setUp(() {
      authProvider = MockAuthProvider();
      context = MockBuildContext();
    });

    test('Deve retornar null se rota for "/" (Splash)', () {
      authProvider.setAuthenticated(false);
      final state = MockGoRouterState('/');
      
      final result = authRedirect(context, state, authProvider);
      
      expect(result, isNull);
    });

    test('Deve redirecionar para /auth/login se não autenticado e tentando acessar rota protegida', () {
      authProvider.setAuthenticated(false);
      final state = MockGoRouterState('/profile');
      
      final result = authRedirect(context, state, authProvider);
      
      expect(result, '/auth/login');
    });

    test('Deve retornar null se não autenticado e acessando rota de auth', () {
      authProvider.setAuthenticated(false);
      final state = MockGoRouterState('/auth/register');
      
      final result = authRedirect(context, state, authProvider);
      
      expect(result, isNull);
    });

    test('Deve redirecionar para /owner/home se autenticado como Owner e na página de login', () {
      authProvider.setAuthenticated(true);
      authProvider.setOwner(true);
      final state = MockGoRouterState('/auth/login');
      
      final result = authRedirect(context, state, authProvider);
      
      expect(result, '/owner/home');
    });

    test('Deve redirecionar para /vet/dashboard se autenticado como Vet e na página inicial', () {
      authProvider.setAuthenticated(true);
      authProvider.setVet(true);
      final state = MockGoRouterState('/');
      
      final result = authRedirect(context, state, authProvider);
      
      expect(result, '/vet/dashboard');
    });

    test('Deve retornar null se autenticado e acessando rota protegida permitida', () {
      authProvider.setAuthenticated(true);
      final state = MockGoRouterState('/profile');
      
      final result = authRedirect(context, state, authProvider);
      
      expect(result, isNull);
    });
  });
}
