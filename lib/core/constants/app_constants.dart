/// App Constants
/// Constantes gerais do aplicativo
class AppConstants {
  AppConstants._();

  // Error Messages
  static const String genericError = 'Ocorreu um erro. Tente novamente.';
  static const String networkError = 'Erro de conexão. Verifique sua internet.';
  static const String timeoutError = 'Tempo esgotado. Tente novamente.';
  static const String unauthorized = 'Sessão expirada. Faça login novamente.';
  static const String notFound = 'Recurso não encontrado.';
  static const String serverError = 'Erro no servidor. Tente mais tarde.';

  // Validation Messages
  static const String requiredField = 'Campo obrigatório';
  static const String invalidEmail = 'Email inválido';
  static const String invalidPhone = 'Telefone inválido';
  static const String invalidCPF = 'CPF inválido';
  static const String invalidCNPJ = 'CNPJ inválido';
  static const String invalidCRMV = 'CRMV inválido';
  static const String passwordTooShort = 
      'Senha deve ter no mínimo 8 caracteres';
  static const String passwordsDontMatch = 'As senhas não coincidem';

  // Success Messages
  static const String loginSuccess = 'Login realizado com sucesso!';
  static const String registerSuccess = 'Cadastro realizado com sucesso!';
  static const String updateSuccess = 'Atualização realizada com sucesso!';
  static const String deleteSuccess = 'Exclusão realizada com sucesso!';
  static const String bookingSuccess = 'Agendamento realizado com sucesso!';
  static const String cancelSuccess = 'Cancelamento realizado com sucesso!';

  // User Types
  static const String userTypeOwner = 'owner';
  static const String userTypeVet = 'vet';

  // Booking Status
  static const String bookingStatusPending = 'pending';
  static const String bookingStatusConfirmed = 'confirmed';
  static const String bookingStatusInProgress = 'in_progress';
  static const String bookingStatusCompleted = 'completed';
  static const String bookingStatusCancelled = 'cancelled';

  // Payment Status
  static const String paymentStatusPending = 'pending';
  static const String paymentStatusApproved = 'approved';
  static const String paymentStatusRejected = 'rejected';

  // Animal Species
  static const List<String> animalSpecies = [
    'Cachorro',
    'Gato',
    'Pássaro',
    'Coelho',
    'Hamster',
    'Outro',
  ];

  // Vet Specialties
  static const List<String> vetSpecialties = [
    'Clínico Geral',
    'Cirurgião',
    'Dermatologista',
    'Cardiologista',
    'Ortopedista',
    'Oftalmologista',
    'Dentista',
    'Oncologista',
    'Nutricionista',
    'Acupunturista',
  ];

  // Distance Filters (in km)
  static const List<int> distanceFilters = [1, 3, 5, 10, 20, 50];

  // Days of Week
  static const List<String> daysOfWeek = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ];

  // Time Slots (hours)
  static const List<String> timeSlots = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];

  // Rating Values
  static const int maxRating = 5;
  static const int minRating = 1;

  // Regex Patterns
  static const String emailPattern = r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$';
  static const String phonePattern = r'^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$';
  static const String cpfPattern = r'^\d{3}\.\d{3}\.\d{3}-\d{2}$';
  static const String crmvPattern = r'^[A-Z]{2}-\d{4,6}$';

  // Date Formats
  static const String dateFormatDisplay = 'dd/MM/yyyy';
  static const String dateFormatApi = 'yyyy-MM-dd';
  static const String dateTimeFormatDisplay = 'dd/MM/yyyy HH:mm';
  static const String timeFormatDisplay = 'HH:mm';

  // Animation Durations (milliseconds)
  static const int shortAnimationDuration = 200;
  static const int mediumAnimationDuration = 300;
  static const int longAnimationDuration = 500;

  // Loading Messages
  static const String loadingDefault = 'Carregando...';
  static const String loadingVets = 'Buscando veterinários...';
  static const String loadingBookings = 'Carregando agendamentos...';
  static const String loadingProfile = 'Carregando perfil...';
  static const String savingData = 'Salvando dados...';
  static const String uploadingImage = 'Enviando imagem...';

  // Empty State Messages
  static const String noVetsFound = 'Nenhum veterinário encontrado';
  static const String noBookingsFound = 'Nenhum agendamento encontrado';
  static const String noAnimalsFound = 'Nenhum animal cadastrado';
  static const String noReviewsFound = 'Nenhuma avaliação ainda';
  static const String noNotifications = 'Nenhuma notificação';

  // Permissions
  static const String locationPermission = 
      'Permissão de localização necessária';
  static const String cameraPermission = 'Permissão de câmera necessária';
  static const String storagePermission = 
      'Permissão de armazenamento necessária';
  static const String notificationPermission = 
      'Permissão de notificações necessária';
}
