import 'package:flutter/material.dart';
import 'package:sikshyalaya/components/CustomDateButton.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';
import 'package:sikshyalaya/screens/Signup/components/CustomOutlinedButton.dart';
import 'package:sikshyalaya/screens/Signup/components/contact_information.dart';
import 'package:sikshyalaya/screens/Signup/signup_bloc.dart';
import 'package:provider/provider.dart';

class PersonalInformation extends StatelessWidget {
  const PersonalInformation({Key? key}) : super(key: key);

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
            child: Stack(
              alignment: Alignment.center,
              children: <Widget>[
                Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                    Container(
                      alignment: Alignment.centerRight,
                      margin: const EdgeInsets.fromLTRB(0, 40, 20, 0),
                      child: const Text("Personal Information"),
                    ),
                    Container(
                      child: Image.asset(
                        "assets/images/logo.png",
                        width: size.width * 0.5,
                      ),
                      padding: const EdgeInsets.fromLTRB(0, 30, 0, 0),
                    ),
                    CustomTextField(
                      placeHolder: "First",
                      margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
                      onChanged: (value) => context.read<SignupBloc>().add(
                            FirstNameChanged(firstName: value),
                          ),
                    ),
                    CustomTextField(
                      placeHolder: "Middle (Optional)",
                      margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
                      onChanged: (value) => context.read<SignupBloc>().add(
                            MiddleNameChanged(middleName: value),
                          ),
                    ),
                    CustomTextField(
                      placeHolder: "Last",
                      margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
                      onChanged: (value) => context.read<SignupBloc>().add(
                            LastNameChanged(lastName: value),
                          ),
                    ),
                    CustomTextField(
                      placeHolder: "Date of Birth",
                      margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
                      onChanged: (value) => context.read<SignupBloc>().add(
                            DOBChanged(dob: value),
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
                                  icon:
                                      const Icon(Icons.chevron_right_outlined),
                                  press: ContactInformation()),
                              margin: EdgeInsets.fromLTRB(
                                  0, 0, size.width * 0.1, size.height * 0.05),
                            )
                          ],
                        ),
                      ),
                    )
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
