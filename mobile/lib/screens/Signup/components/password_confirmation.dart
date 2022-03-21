import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';
import 'package:sikshyalaya/screens/Signup/components/CustomOutlinedButton.dart';

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
          child: Stack(alignment: Alignment.center, children: <Widget>[
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
                const CustomTextField(
                  placeHolder: "Password",
                  isPassword: true,
                  margin: EdgeInsets.fromLTRB(0, 40, 0, 0),
                ),
                const CustomTextField(
                  placeHolder: "Confirm Password",
                  isPassword: true,
                  margin: EdgeInsets.fromLTRB(0, 40, 0, 0),
                ),
                Expanded(
                    child: Container(
                        alignment: Alignment.bottomRight,
                        margin: const EdgeInsets.fromLTRB(0, 0, 0, 0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: <Widget>[
                            Container(
                              alignment: Alignment.bottomRight,
                              child: const CustomOutlinedButton(
                                icon: Icon(Icons.chevron_right_outlined),
                                press: Scaffold(),
                              ),
                              margin: EdgeInsets.fromLTRB(
                                  0, 0, size.width * 0.1, size.height * 0.05),
                            )
                          ],
                        )))
              ],
            )
          ]),
        ),
      ),
    );
  }
}
