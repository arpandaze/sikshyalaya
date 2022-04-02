part of 'login_bloc.dart';

class LoginState extends Equatable {
  final String email;
  final String password;

  final String? errorText;

  final bool loginSuccess;

  const LoginState({this.email = "", this.password = "", this.errorText = "", this.loginSuccess = false});

  bool get isEmailValid => EmailValidator.validate(email);

  bool get isPasswordValid {
    return password.length > 3;
  }

  LoginState copyWith({
    String? email,
    String? password,
    String? errorText,
    bool? loginSuccess,
  }) {
    return LoginState(
      email: email ?? this.email,
      password: password ?? this.password,
      errorText: errorText ?? this.errorText,
      loginSuccess: loginSuccess ?? this.loginSuccess,
    );
  }

  @override
  List<Object?> get props => [email, password, errorText, loginSuccess];
}
