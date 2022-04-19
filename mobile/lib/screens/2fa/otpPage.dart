// ignore_for_file: import_of_legacy_library_into_null_safe

import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'package:sikshyalaya/screens/2fa/success.dart';
import 'package:sikshyalaya/screens/2fa/components/CustomOutlinedButton.dart';
import 'package:otp_text_field/otp_field.dart';
import 'package:otp_text_field/style.dart';

class OtpPage extends StatelessWidget {
  const OtpPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    OtpFieldController otpController = OtpFieldController();
    Size size = MediaQuery.of(context).size;
    return SafeArea(
      top: true,
      bottom: true,
      child: Scaffold(
        body: Stack(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  height: size.height * 0.1,
                  margin: EdgeInsets.fromLTRB(20, 20, 20, 20),
                  child: Text("Enter OTP",
                      style: Theme.of(context).textTheme.headline4),
                ),
                
                Container(
                  margin: EdgeInsets.fromLTRB(20, 0, 20, 0),
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(25),
                      border: Border.all(
                        color: Color(0xFFB4B4B4),
                      )),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Container(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Container(
                              padding: EdgeInsets.fromLTRB(20, 20, 20, 20),
                              child: Text(
                                  "Enter the OTP sent to your registered email",
                                  style: Theme.of(context).textTheme.bodyText1),
                            ),
                            Container(
                              padding: EdgeInsets.fromLTRB(20, 20, 20, 20),
                              width: size.width,
                              child: OTPTextField(
                                controller: otpController,
                                length: 5,
                                fieldWidth: 50,
                                style: TextStyle(fontSize: 17),
                                textFieldAlignment:
                                    MainAxisAlignment.spaceAround,
                                fieldStyle: FieldStyle.box,
                                onCompleted: (pin) {
                                  print("Completed: " + pin);
                                },
                              ),
                            ),
                          ],
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Container(
                            margin: EdgeInsets.all(10),
                            child: Text("Proceed",
                                style: Theme.of(context).textTheme.headline5),
                          ),
                          Container(
                            margin: EdgeInsets.all(10),
                            child: const CustomOutlinedButton(
                              page: Success(),
                              icon: Icon(Icons.chevron_right_outlined),
                              label: "",
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
            
          ],
        ),
      ),
    );
  }
}
