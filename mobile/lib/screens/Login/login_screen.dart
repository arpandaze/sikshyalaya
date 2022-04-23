import 'package:flutter/material.dart';
import 'package:sikshyalaya/components/AuthStateWrapper.dart';

import './components/CustomFilledButton.dart';
import './components/CustomTextField.dart';
import 'login_bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/repository/auth.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AuthStateWrapper(
      child: RepositoryProvider<AuthenticationRepository>(
        create: (_) => AuthenticationRepository(),
        child: BlocProvider(
          create: (context) => LoginBloc(),
          child: BlocListener<LoginBloc, LoginState>(
            listener: (context, state) => {
              if (state.loginSuccess) {context.read<AuthBloc>().add(LoggedIn())}
            },
            child: Scaffold(
              backgroundColor: Theme.of(context).colorScheme.background,
              body: body(context),
            ),
          ),
        ),
      ),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocBuilder<LoginBloc, LoginState>(
      buildWhen: (prev, next) => true,
      builder: (context, state) {
        return SizedBox(
          width: double.infinity,
          height: size.height,
          child: Stack(
            alignment: Alignment.center,
            children: <Widget>[
              Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  Container(
                    child: Image.asset(
                      "assets/images/logo.png",
                      width: size.width * 0.5,
                    ),
                    padding: const EdgeInsets.fromLTRB(0, 60, 0, 0),
                  ),
                  CustomTextField(
                    placeHolder: "Email",
                    keyboardType: TextInputType.emailAddress,
                    margin: const EdgeInsets.fromLTRB(0, 60, 0, 0),
                    onChanged: (value) =>
                        context.read<LoginBloc>().add(EmailChanged(value)),
                  ),
                  CustomTextField(
                    placeHolder: "Password",
                    isPassword: true,
                    onChanged: (value) =>
                        context.read<LoginBloc>().add(PasswordChanged(value)),
                    margin: const EdgeInsets.fromLTRB(0, 20, 0, 0),
                  ),
                  Text(state.errorText as String),
                  GestureDetector(
                    onTap: () {
                        Navigator.of(context).pushNamed("/forgot");
                      },
                    child: Container(
                      alignment: Alignment.centerRight,
                      child: const Text("Forgot Password?"),
                      margin: const EdgeInsets.fromLTRB(0, 20, 40, 0),
                    ),
                  ),
                  Expanded(
                    child: Container(
                      alignment: Alignment.bottomCenter,
                      margin: const EdgeInsets.fromLTRB(0, 0, 0, 20),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: <Widget>[
                          CustomFilledButton(
                            text: "Login",
                            onPressed: () =>
                                context.read<LoginBloc>().add(FormSubmitted()),
                          ),
                          GestureDetector(
                            onTap: () {
                              Navigator.of(context).pushNamed("/signup");
                            },
                            child: Container(
                              alignment: Alignment.bottomCenter,
                              child:
                                  const Text("Don't have an account? Register"),
                              padding: const EdgeInsets.symmetric(vertical: 30),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              )
            ],
          ),
        );
      },
    );
  }
}
