import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';
import 'package:sikshyalaya/screens/Signup/components/CustomOutlinedButton.dart';
import 'package:sikshyalaya/screens/Signup/components/contact_information.dart';
import 'package:sikshyalaya/screens/Signup/components/program_information.dart';
import 'package:provider/provider.dart';
import 'package:sikshyalaya/screens/Signup/signup_bloc.dart';

class ContactInformation extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return SafeArea(
      top: true,
      bottom: true,
      child: Scaffold(
        body: SingleChildScrollView(
          child: SizedBox(
            width: double.infinity,
            height: size.height,
            child: Stack(alignment: Alignment.center, children: <Widget>[
              Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  Container(
                    alignment: Alignment.centerRight,
                    margin: const EdgeInsets.fromLTRB(0, 40, 20, 0),
                    child: const Text("Contact Information"),
                  ),
                  Container(
                    child: Image.asset(
                      "assets/images/logo.png",
                      width: size.width * 0.5,
                    ),
                    padding: const EdgeInsets.fromLTRB(0, 30, 0, 0),
                  ),
                  CustomTextField(
                    placeHolder: "Email",
                    keyboardType: TextInputType.emailAddress,
                    margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
                    onChanged: (value) => context.read<SignupBloc>().add(
                          EmailChanged(email: value),
                        ),
                  ),
                  CustomTextField(
                    placeHolder: "Address",
                    margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
                    onChanged: (value) => context.read<SignupBloc>().add(
                          AddressChanged(address: value),
                        ),
                  ),
                  CustomTextField(
                    placeHolder: "Phone number",
                    margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
                    onChanged: (value) => context.read<SignupBloc>().add(
                          PhoneNumberChanged(phoneNumber: value),
                        ),
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
                                    press: ProgramInformation()),
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
      ),
    );
  }
}
