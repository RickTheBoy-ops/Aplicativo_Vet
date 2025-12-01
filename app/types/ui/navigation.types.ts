export type RootStackParamList = {
  Auth: undefined;
  Owner: undefined;
  Vet: undefined;
  NotFound: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type OwnerStackParamList = {
  Home: undefined;
  SearchVet: undefined;
  Booking: { vetId: string };
  MyBookings: undefined;
  Profile: undefined;
};

export type VetStackParamList = {
  Dashboard: undefined;
  Availability: undefined;
  Appointments: undefined;
  Subscription: undefined;
  Profile: undefined;
};
