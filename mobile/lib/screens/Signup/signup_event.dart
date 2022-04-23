part of 'signup_bloc.dart';

abstract class SignupChangeEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class FirstNameChanged extends SignupChangeEvent {
  final String? firstName;
  FirstNameChanged({this.firstName});

  @override
  List<Object?> get props => [firstName];
}

class MiddleNameChanged extends SignupChangeEvent {
  final String? middleName;
  MiddleNameChanged({this.middleName});

  @override
  List<Object?> get props => [middleName];
}

class LastNameChanged extends SignupChangeEvent {
  final String? lastName;
  LastNameChanged({this.lastName});

  @override
  List<Object?> get props => [lastName];
}

class DOBChanged extends SignupChangeEvent {
  final String? dob;
  DOBChanged({this.dob});

  @override
  List<Object?> get props => [dob];
}

class EmailChanged extends SignupChangeEvent {
  final String? email;
  EmailChanged({this.email});

  @override
  List<Object?> get props => [email];
}

class AddressChanged extends SignupChangeEvent {
  final String? address;
  AddressChanged({this.address});

  @override
  List<Object?> get props => [address];
}

class PhoneNumberChanged extends SignupChangeEvent {
  final String? phoneNumber;
  PhoneNumberChanged({this.phoneNumber});

  @override
  List<Object?> get props => [phoneNumber];
}

class ProgramChanged extends SignupChangeEvent {
  final int? program;
  ProgramChanged({this.program});

  @override
  List<Object?> get props => [program];
}

class SemChanged extends SignupChangeEvent {
  final int? sem;
  SemChanged({this.sem});

  @override
  List<Object?> get props => [sem];
}

class JoinYearChanged extends SignupChangeEvent {
  final String? joinYear;
  JoinYearChanged({this.joinYear});

  @override
  List<Object?> get props => [joinYear];
}

class PasswordChanged extends SignupChangeEvent {
  final String? password;
  PasswordChanged({this.password});

  @override
  List<Object?> get props => [password];
}

class ConfirmPasswordChanged extends SignupChangeEvent {
  final String? confirmPassword;
  ConfirmPasswordChanged({this.confirmPassword});

  @override
  List<Object?> get props => [confirmPassword];
}

class PageChanged extends SignupChangeEvent {
  final int page;
  PageChanged({required this.page});

  @override
  List<Object?> get props => [page];
}

class SignupStatusEvent extends SignupChangeEvent {
  final SignupStatus status;
  SignupStatusEvent({required this.status});

  @override
  List<Object?> get props => [status];
}

class PreviousPage extends SignupChangeEvent {}

class NextPage extends SignupChangeEvent {}

class SignupSubmit extends SignupChangeEvent {}
