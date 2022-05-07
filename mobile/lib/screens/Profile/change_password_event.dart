part of 'change_password_bloc.dart';

abstract class PasswordEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class EditPassword extends PasswordEvent {
  final String currentPassword;
  final String newPassword;
  final String confirmPassword;

  EditPassword({
    this.currentPassword = "",
    this.newPassword = "",
    this.confirmPassword = "",
  });

  @override
  List<Object> get props => [
        currentPassword,
        newPassword,
        confirmPassword,
      ];
}

class CurrentChanged extends PasswordEvent {
  final String currentPassword;

  CurrentChanged({
    this.currentPassword = "",
  });

  @override
  List<Object> get props => [
        currentPassword,
      ];
}

class NewChanged extends PasswordEvent {
  final String newPassword;

  NewChanged({
    this.newPassword = "",
  });

  @override
  List<Object> get props => [
        newPassword,
      ];
}

class ConfirmChanged extends PasswordEvent {
  final String confirmPassword;

  ConfirmChanged({
    this.confirmPassword = "",
  });

  @override
  List<Object> get props => [
        confirmPassword,
      ];
}
