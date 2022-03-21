import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/screens/Login/components/CustomFilledButton.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';

class ResetPassword extends StatelessWidget {
  const ResetPassword({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
        body: SizedBox(
            width: double.infinity,
            height: size.height,
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Container(
                    child: SvgPicture.asset("assets/images/reset.svg",
                        width: size.width * 0.8),
                    padding: const EdgeInsets.fromLTRB(0, 0, 0, 0),
                  ),
                  Container(
                    child: Image.asset("assets/images/logo.png",
                        width: size.width * 0.5),
                    padding: const EdgeInsets.fromLTRB(0, 60, 0, 0),
                  ),
                  const CustomTextField(
                    placeHolder: "Email",
                    margin: EdgeInsets.fromLTRB(0, 60, 0, 30),
                  ),
                  const CustomFilledButton(text: "Reset Password"),
                ])));
  }
}
