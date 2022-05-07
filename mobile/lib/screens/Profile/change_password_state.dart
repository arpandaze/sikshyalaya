part of 'change_password_bloc.dart';

class PasswordState extends Equatable {
  final String currentPassword;
  final String newPassword;
  final String confirmPassword;

  const PasswordState({
    this.currentPassword = "",
    this.newPassword = "",
    this.confirmPassword = "",
  });

  PasswordState copyWith({
    currentPassword,
    newPassword,
    confirmPassword,
  }) {
    return PasswordState(
      currentPassword: currentPassword ?? this.currentPassword,
      newPassword: newPassword ?? this.newPassword,
      confirmPassword: confirmPassword ?? this.confirmPassword,
    );
  }

  @override
  List<Object?> get props => [
        currentPassword,
        newPassword,
        confirmPassword,
      ];
}
