import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Login/components/CustomFilledButton.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';

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
                          child: const Text("Don't have an account? Register"),
                          padding: const EdgeInsets.symmetric(vertical: 10),
                        ),
                        const CustomFilledButton(),
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
