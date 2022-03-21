part of 'login_bloc.dart';

class LoginState extends Equatable {
  final String email;
  final String password;

  const LoginState({this.email = "", this.password = ""});

  bool get isEmailValid => EmailValidator.validate(email);

  bool get isPasswordValid {
    return password.length > 7;
  }

  LoginState copyWith({
    String? email,
    String? password,
  }) {
    return LoginState(
      email: email ?? this.email,
      password: password ?? this.password,
    );
  }

  @override
  List<Object> get props => [email, password];
}
