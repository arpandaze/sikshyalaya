import 'package:flutter/material.dart';

import './components/CustomFilledButton.dart';
import './components/CustomTextField.dart';
import 'login_bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => LoginBloc(),
      child: Scaffold(
        backgroundColor: Theme.of(context).colorScheme.background,
        body: body(context),
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
                  Container(
                    alignment: Alignment.centerRight,
                    child: const Text("Forgot Password"),
                    margin: const EdgeInsets.fromLTRB(0, 20, 40, 0),
                  ),
                  Expanded(
                    child: Container(
                      alignment: Alignment.bottomCenter,
                      margin: const EdgeInsets.fromLTRB(0, 0, 0, 20),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: <Widget>[
                          Container(
                            alignment: Alignment.bottomCenter,
                            child:
                                const Text("Don't have an account? Register"),
                            padding: const EdgeInsets.symmetric(vertical: 10),
                          ),
                          CustomFilledButton(
                            text: "Login",
                            onPressed: () =>
                                context.read<LoginBloc>().add(FormSubmitted()),
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
