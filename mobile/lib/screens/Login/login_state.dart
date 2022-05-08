part of 'login_bloc.dart';

class LoginState extends Equatable {
  final String email;
  final String password;

  final String? errorText;

  final bool loginSuccess;

  final bool? twoFARequired;
  final String? tempToken;

  const LoginState({
    this.email = "",
    this.password = "",
    this.errorText = "",
    this.loginSuccess = false,
    this.twoFARequired,
    this.tempToken,
  });

  bool get isEmailValid => EmailValidator.validate(email);

  bool get isPasswordValid {
    return password.length > 3;
  }

  LoginState copyWith({
    String? email,
    String? password,
    String? errorText,
    bool? loginSuccess,
    bool? twoFARequired,
    String? tempToken,
  }) {
    return LoginState(
      email: email ?? this.email,
      password: password ?? this.password,
      errorText: errorText ?? this.errorText,
      loginSuccess: loginSuccess ?? this.loginSuccess,
      twoFARequired: twoFARequired ?? this.twoFARequired,
      tempToken: tempToken ?? this.tempToken,
    );
  }

  @override
  List<Object?> get props =>
      [email, password, errorText, loginSuccess, twoFARequired];
}
