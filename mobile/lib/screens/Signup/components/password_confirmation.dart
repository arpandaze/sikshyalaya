import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:sikshyalaya/screens/Login/components/CustomFilledButton.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';
import 'package:sikshyalaya/screens/Signup/components/CustomOutlinedButton.dart';
import 'package:provider/provider.dart';
import 'package:sikshyalaya/screens/Signup/signup_bloc.dart';

class PasswordConfirmation extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return SafeArea(
      top: true,
      bottom: true,
      child: Scaffold(
        body: SizedBox(
          width: double.infinity,
          height: size.height,
          child: Stack(
            alignment: Alignment.center,
            children: <Widget>[
              Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  Container(
                    alignment: Alignment.centerRight,
                    margin: const EdgeInsets.fromLTRB(0, 40, 20, 0),
                    child: const Text("Password Confirmation"),
                  ),
                  Container(
                    child: Image.asset(
                      "assets/images/logo.png",
                      width: size.width * 0.5,
                    ),
                    padding: const EdgeInsets.fromLTRB(0, 30, 0, 0),
                  ),
                  CustomTextField(
                    placeHolder: "Password",
                    isPassword: true,
                    margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
                    onChanged: (value) => context.read<SignupBloc>().add(
                          PasswordChanged(password: value),
                        ),
                  ),
                  CustomTextField(
                    placeHolder: "Confirm Password",
                    isPassword: true,
                    margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
                    onChanged: (value) => context.read<SignupBloc>().add(
                          ConfirmPasswordChanged(confirmPassword: value),
                        ),
                  ),
                  submitPart(context, size)
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget submitPart(BuildContext context, Size size) {
    return Expanded(
      child: Container(
        alignment: Alignment.bottomRight,
        margin: const EdgeInsets.fromLTRB(0, 0, 0, 0),
        child:
            BlocBuilder<SignupBloc, SignupState>(builder: (context, snapshot) {
          if (snapshot.status != SignupStatus.submitting) {
            return Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
                errorText(snapshot.status),
                Expanded(
                  child: Container(
                    alignment: Alignment.bottomRight,
                    child: CustomFilledButton(
                      text: "Signup",
                      onPressed: () =>
                          context.read<SignupBloc>().add(SignupSubmit()),
                    ),
                    margin: EdgeInsets.fromLTRB(
                        0, 0, size.width * 0.1, size.height * 0.05),
                  ),
                ),
              ],
            );
          } else {
            return Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
                Container(
                  alignment: Alignment.bottomCenter,
                  child: const CircularProgressIndicator(),
                  margin: EdgeInsets.fromLTRB(
                      0, 0, size.width * 0.1, size.height * 0.05),
                )
              ],
            );
          }
        }),
      ),
    );
  }

  Widget errorText(SignupStatus state){
      switch(state){
          case SignupStatus.errorPassword : return const Text("Passwords do not match!");
          case SignupStatus.errorUnknown : return const Text("Something went wrong! Check you inputs!");
          case SignupStatus.errorEmailUsed : return const Text("Email is already in use!");
          default: return const SizedBox.shrink();
        }
    }
}
