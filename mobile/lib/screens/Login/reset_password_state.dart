part of 'reset_password_bloc.dart';

class ResetPasswordState extends Equatable {
  final String emailAddress;
  final String newPassword;
  final String confirmPassword;
  final String responseMessage;

  const ResetPasswordState({
    this.emailAddress = "",
    this.newPassword = "",
    this.confirmPassword = "",
    this.responseMessage = "",
  });

  ResetPasswordState copyWith({
    emailAddress,
    newPassword,
    confirmPassword,
    responseMessage,
  }) {
    return ResetPasswordState(
      emailAddress: emailAddress ?? this.emailAddress,
      newPassword: newPassword ?? this.newPassword,
      confirmPassword: confirmPassword ?? this.confirmPassword,
      responseMessage: responseMessage ?? this.responseMessage,
    );
  }

  @override
  List<Object?> get props =>
      [emailAddress, newPassword, confirmPassword, responseMessage];
}
