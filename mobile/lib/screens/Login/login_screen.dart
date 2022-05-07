import 'package:flutter/material.dart';
import 'package:sikshyalaya/components/AuthStateWrapper.dart';
import 'package:sikshyalaya/screens/Login/TwoFALogin.dart';

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
              body: SingleChildScrollView(child: body(context)),
            ),
          ),
        ),
      ),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocConsumer<LoginBloc, LoginState>(
      listener: (context, state) {
        if (state.twoFARequired != null) {}
      },
      buildWhen: (prev, next) => true,
      builder: (context, state) {
        if (state.twoFARequired != null) {
          if (state.twoFARequired! == true) {
            return SizedBox(
              width: double.infinity,
              height: size.height,
              child: TwoFALogin(tempToken: state.tempToken!),
            );
          }
        }
        return SizedBox(
          width: double.infinity,
          height: size.height,
          child: Stack(
            alignment: Alignment.center,
            children: <Widget>[
              Scaffold(
                  body: ListView(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Container(
                        child: Image.asset(
                          "assets/images/logo.png",
                          width: size.width * 0.5,
                        ),
                        padding: const EdgeInsets.fromLTRB(0, 60, 0, 0),
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      CustomTextField(
                        placeHolder: "Email",
                        keyboardType: TextInputType.emailAddress,
                        margin: const EdgeInsets.fromLTRB(0, 60, 0, 0),
                        onChanged: (value) =>
                            context.read<LoginBloc>().add(EmailChanged(value)),
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      CustomTextField(
                        placeHolder: "Password",
                        isPassword: true,
                        onChanged: (value) => context
                            .read<LoginBloc>()
                            .add(PasswordChanged(value)),
                        margin: const EdgeInsets.fromLTRB(0, 20, 0, 0),
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        state.errorText as String,
                        style: (Theme.of(context).textTheme.subtitle2)!.merge(
                          const TextStyle(color: Colors.red),
                        ),
                      ),
                    ],
                  ),
                  GestureDetector(
                    onTap: () {
                      Navigator.of(context).pushNamed("/forgot");
                    },
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Container(
                          alignment: Alignment.centerRight,
                          child: Text(
                            "Forgot Password?",
                            style: Theme.of(context).textTheme.subtitle1,
                          ),
                          margin: const EdgeInsets.fromLTRB(0, 20, 40, 0),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    height: size.height * 0.3,
                  ),
                  Container(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Container(
                          alignment: Alignment.bottomCenter,
                          margin: const EdgeInsets.fromLTRB(0, 0, 0, 20),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: <Widget>[
                              CustomFilledButton(
                                text: "Login",
                                onPressed: () => context
                                    .read<LoginBloc>()
                                    .add(FormSubmitted()),
                              ),
                              GestureDetector(
                                onTap: () {
                                  Navigator.of(context).pushNamed("/signup");
                                },
                                child: Container(
                                  alignment: Alignment.bottomCenter,
                                  child: Text(
                                    "Don't have an account? Register",
                                    style:
                                        Theme.of(context).textTheme.subtitle1,
                                  ),
                                  padding:
                                      const EdgeInsets.symmetric(vertical: 30),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ))
            ],
          ),
        );
      },
    );
  }
}
