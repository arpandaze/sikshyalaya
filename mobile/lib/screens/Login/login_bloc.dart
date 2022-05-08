import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:email_validator/email_validator.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/repository/auth.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter/material.dart';

part 'login_event.dart';
part 'login_state.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  AuthenticationRepository auth = AuthenticationRepository();

  LoginBloc() : super(const LoginState()) {
    on<EmailChanged>(_onEmailChanged);
    on<PasswordChanged>(_onPasswordChanged);
    on<FormSubmitted>(_onFormSubmitted);
  }

  void _onEmailChanged(EmailChanged event, Emitter<LoginState> emit) {
    emit(state.copyWith(email: event.email));
  }

  void _onPasswordChanged(PasswordChanged event, Emitter<LoginState> emit) {
    emit(state.copyWith(password: event.password));
  }

  void _onFormSubmitted(FormSubmitted event, Emitter<LoginState> emit) async {
    if (!state.isEmailValid) {
      return emit(state.copyWith(errorText: "Invalid username!"));
    }

    if (!state.isPasswordValid) {
      return emit(state.copyWith(errorText: "Invalid password!"));
    }

    try {
      final loginResp =
          await auth.login(username: state.email, password: state.password);

      if (loginResp!["two_fa_required"] == true) {
        emit(state.copyWith(twoFARequired: true, tempToken: loginResp["temp-token"]));
      } else {
        emit(state.copyWith(loginSuccess: true));
      }
    } catch (e) {
      print(e);
      emit(state.copyWith(errorText: "Email or password incorrect!"));
    }
  }
}
