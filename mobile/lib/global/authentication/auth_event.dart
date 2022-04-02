part of 'auth_bloc.dart';

abstract class AuthEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class StudentLoggedIn extends AuthEvent {}

class TeacherLoggedIn extends AuthEvent {}

class LoggedOut extends AuthEvent {}
