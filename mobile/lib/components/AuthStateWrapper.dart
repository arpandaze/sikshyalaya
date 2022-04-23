import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/screens/Welcome/splash.dart';

class AuthStateWrapper extends StatelessWidget {
  final Widget? child;
  const AuthStateWrapper({Key? key, this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocListener<AuthBloc, AuthState>(
      listener: ((context, state) {
        print(state);
        switch (state.status) {
          case AuthStatus.studentSession:
            Timer(const Duration(microseconds: 0), () {
              Navigator.pushNamedAndRemoveUntil(
                context,
                "/student_dashboard",
                (route) => false,
              );
            });
            break;

          case AuthStatus.teacherSession:
            Timer(const Duration(microseconds: 0), () {
              Navigator.pushNamedAndRemoveUntil(
                context,
                "/teacher_dashboard",
                (route) => false,
              );
            });
            break;

          case AuthStatus.anonSession:
            if (ModalRoute.of(context)?.settings.name != "/login") {
              Timer(const Duration(microseconds: 0), () {
                Navigator.pushNamedAndRemoveUntil(
                  context,
                  "/login",
                  (route) => false,
                );
              });
            }
            break;

          default:
            break;
        }
      }),
      child: child,
    );
  }
}
