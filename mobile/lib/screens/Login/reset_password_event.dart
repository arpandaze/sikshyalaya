part of 'reset_password_bloc.dart';

abstract class ResetPasswordEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class RequestResetPassword extends ResetPasswordEvent {
  final String emailAddress;

  RequestResetPassword({
    this.emailAddress = "",
  });

  @override
  List<Object> get props => [emailAddress];
}

class EmailAddressChanged extends ResetPasswordEvent {
  final String emailAddress;

  EmailAddressChanged({
    this.emailAddress = "",
  });

  @override
  List<Object> get props => [
        emailAddress,
      ];
}

class NewPasswordChanged extends ResetPasswordEvent {
  final String newPassword;

  NewPasswordChanged({
    this.newPassword = "",
  });

  @override
  List<Object> get props => [
        newPassword,
      ];
}

class ConfirmPasswordChanged extends ResetPasswordEvent {
  final String confirmPassword;

  ConfirmPasswordChanged({
    this.confirmPassword = "",
  });

  @override
  List<Object> get props => [
        confirmPassword,
      ];
}
