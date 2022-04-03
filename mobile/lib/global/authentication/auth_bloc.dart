import 'dart:async';
import 'dart:convert';

import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/repository/auth.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/constants.dart';

part 'auth_state.dart';
part 'auth_event.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthenticationRepository auth = AuthenticationRepository();

  AuthBloc() : super(const AuthState()) {
    on<StudentLoggedIn>(_onStudentLoggedIn);
    on<TeacherLoggedIn>(_onTeacherLoggedIn);
    on<LoggedOut>(_onLoggedOut);
  }

  void _onStudentLoggedIn(
    StudentLoggedIn event,
    Emitter<AuthState> emit,
  ) async {
    emit(await AuthState.load());
  }

  void _onTeacherLoggedIn(
    TeacherLoggedIn event,
    Emitter<AuthState> emit,
  ) async {
    emit(await AuthState.load());
  }

  void _onLoggedOut(LoggedOut event, Emitter<AuthState> emit) async {
    auth.logout();
    emit(await AuthState.load());
  }
}
