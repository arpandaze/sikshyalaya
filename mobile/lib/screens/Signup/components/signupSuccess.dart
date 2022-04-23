import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/screens/Assignment/components/CustomFilledButton.dart';
import 'package:sikshyalaya/screens/Signup/components/contact_information.dart';
import 'package:sikshyalaya/screens/Signup/components/password_confirmation.dart';
import 'package:sikshyalaya/screens/Signup/components/personal_information.dart';
import 'package:sikshyalaya/screens/Signup/components/program_information.dart';
import 'package:sikshyalaya/screens/Signup/signup_bloc.dart';

class SignupSuccess extends StatelessWidget {
  const SignupSuccess({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return SafeArea(
      top: true,
      bottom: true,
      child: Scaffold(
        body: SizedBox(
          width: double.infinity,
          height: size.height,
          child: Stack(alignment: Alignment.center, children: <Widget>[
            Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Container(
                  child: Image.asset(
                    "assets/images/logo.png",
                    width: size.width * 0.5,
                  ),
                  padding: const EdgeInsets.fromLTRB(0, 30, 0, 0),
                ),
                Container(
                  child:
                      const Text("Please check your email for verification!"),
                  alignment: Alignment.center,
                ),
                Expanded(
                  child: Container(
                    alignment: Alignment.bottomCenter,
                    margin: const EdgeInsets.fromLTRB(0, 0, 0, 10),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: <Widget>[
                        CustomFilledButton(
                            text: "Go back",
                            onPressed: () => Navigator.of(context).pop())
                      ],
                    ),
                  ),
                )
              ],
            )
          ]),
        ),
      ),
    );
  }
}
