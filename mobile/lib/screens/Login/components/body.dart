import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Login/components/CustomFilledButton.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';
import 'package:sikshyalaya/screens/Login/reset_password.dart';

import '../../Signup/signup_screen.dart';

class Body extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
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
              const CustomTextField(
                placeHolder: "Email",
                margin: EdgeInsets.fromLTRB(0, 60, 0, 0),
              ),
              const CustomTextField(
                placeHolder: "Password",
                isPassword: true,
                margin: EdgeInsets.fromLTRB(0, 20, 0, 0),
              ),
              Container(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const ResetPassword()),
                    );
                  },
                  child: Text(
                    'Forgot Password?',
                    style: Theme.of(context).textTheme.bodyText2,
                  ),
                ),
                margin: const EdgeInsets.fromLTRB(0, 0, 40, 0),
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
                          child: TextButton(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => const Signup()),
                              );
                            },
                            child: Text(
                              'Don\'t have an account? Register.',
                              style: Theme.of(context).textTheme.bodyText2,
                            ),
                          ),
                          padding: const EdgeInsets.symmetric(vertical: 10),
                        ),
                        const CustomFilledButton(text: "Login"),
                      ]),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
