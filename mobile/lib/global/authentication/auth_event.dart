part of 'auth_bloc.dart';

abstract class AuthEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class LoggedIn extends AuthEvent {}

class LoggedOut extends AuthEvent {}

class LoadAuthStatus extends AuthEvent {}

class RefetchUser extends AuthEvent {}
