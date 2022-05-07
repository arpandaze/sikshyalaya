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
  static const storage = FlutterSecureStorage();

  AuthBloc() : super(const AuthState()) {
    on<LoggedIn>(_onLoggedIn);
    on<LoadAuthStatus>(_onLoadAuthStatus);
    on<LoggedOut>(_onLoggedOut);
    on<RefetchUser>(_onRefetchUser);

    add(LoadAuthStatus());
  }

  void _onLoggedIn(
    LoggedIn event,
    Emitter<AuthState> emit,
  ) async {
    emit(await AuthState.load());
  }

  void _onLoadAuthStatus(
    LoadAuthStatus event,
    Emitter<AuthState> emit,
  ) async {
    emit(await AuthState.load());
  }

  void _onRefetchUser(
    RefetchUser event,
    Emitter<AuthState> emit,
  ) async {
    await auth.refetchProfile();
    emit(await AuthState.load());
  }

  void _onLoggedOut(LoggedOut event, Emitter<AuthState> emit) async {
    await auth.logout();
    emit(await AuthState.load());
  }
}
