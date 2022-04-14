import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/2fa/otpPage.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'package:intl_phone_number_input/intl_phone_number_input.dart';
import 'package:sikshyalaya/screens/2fa/components/CustomOutlinedButton.dart';
import 'package:sikshyalaya/screens/2fa/otpPage.dart';

class Twofactorauthentication extends StatelessWidget {
  const Twofactorauthentication({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    PhoneNumber number = PhoneNumber(isoCode: 'NP', dialCode: '977');
    Size size = MediaQuery.of(context).size;
    return StudentWrapper(
      pageName: "2-FA",
      child: ListView(children: [
        Column(
          children: [
            Container(
              margin: EdgeInsets.fromLTRB(20, 20, 20, 0),
              child: Text("Enter phone number to verify.",
                  style: Theme.of(context).textTheme.headline4),
            ),
            Flexible(
              child: Container(
                margin: EdgeInsets.fromLTRB(10, 20, 10, 0),
                height: size.height * 0.4,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    InternationalPhoneNumberInput(
                      onInputChanged: (PhoneNumber value) {
                        print(value.phoneNumber);
                      },
                      initialValue: number,
                      autoFocus: true,
                    ),
                    const CustomOutlinedButton(
                      page: OtpPage(),
                      icon: Icon(Icons.chevron_right_outlined),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ]),
    );
  }
}
