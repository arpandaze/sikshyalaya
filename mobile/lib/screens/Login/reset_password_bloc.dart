import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/helpers/helper.dart';
import 'package:sikshyalaya/repository/reset_password.dart';

part 'reset_password_state.dart';
part 'reset_password_event.dart';

class ResetPasswordBloc extends Bloc<ResetPasswordEvent, ResetPasswordState> {
  ResetPasswordBloc({required this.resetPasswordRepository})
      : super(const ResetPasswordState()) {
    on<EmailAddressChanged>(_onEmailAddressChanged);
    on<NewPasswordChanged>(_onNewPasswordChanged);
    on<ConfirmPasswordChanged>(_onConfirmPasswordChanged);
    // on<ResetPasswordAuth>(_onResetPasswordAuth);
    on<RequestResetPassword>(_onRequestResetPassword);
  }

  final ResetPasswordRepository resetPasswordRepository;
  void _onRequestResetPassword(
      RequestResetPassword event, Emitter<ResetPasswordState> emit) async {
    var response = await resetPasswordRepository.requestReset(
      body: {'email': event.emailAddress},
    );
    emit(
      state.copyWith(
        responseMessage: response['message'],
      ),
    );
  }

  void _onEmailAddressChanged(
      EmailAddressChanged event, Emitter<ResetPasswordState> emit) async {
    emit(state.copyWith(
      emailAddress: event.emailAddress,
    ));
  }

  void _onNewPasswordChanged(
      NewPasswordChanged event, Emitter<ResetPasswordState> emit) async {
    emit(state.copyWith(
      newPassword: event.newPassword,
    ));
  }

  void _onConfirmPasswordChanged(
      ConfirmPasswordChanged event, Emitter<ResetPasswordState> emit) async {
    emit(state.copyWith(
      confirmPassword: event.confirmPassword,
    ));
  }
}
