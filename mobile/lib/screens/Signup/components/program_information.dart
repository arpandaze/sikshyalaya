import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';
import 'package:sikshyalaya/screens/Signup/components/CustomOutlinedButton.dart';
import 'package:sikshyalaya/screens/Signup/components/contact_information.dart';
import 'package:sikshyalaya/screens/Signup/components/password_confirmation.dart';

class ProgramInformation extends StatelessWidget {
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
                  child: const Text("Program Information"),
                ),
                Container(
                  child: Image.asset(
                    "assets/images/logo.png",
                    width: size.width * 0.5,
                  ),
                  padding: const EdgeInsets.fromLTRB(0, 30, 0, 0),
                ),
                const CustomTextField(
                  placeHolder: "Program",
                  margin: EdgeInsets.fromLTRB(0, 40, 0, 0),
                ),
                const CustomTextField(
                  placeHolder: "Join Year",
                  margin: EdgeInsets.fromLTRB(0, 40, 0, 0),
                ),
                const CustomTextField(
                  placeHolder: "Date",
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
                              child: CustomOutlinedButton(
                                  icon: Icon(Icons.chevron_right_outlined),
                                  press: PasswordConfirmation()),
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
