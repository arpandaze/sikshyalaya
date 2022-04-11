// ignore_for_file: import_of_legacy_library_into_null_safe

import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'package:sikshyalaya/screens/2fa/success.dart';
import 'package:intl_phone_number_input/intl_phone_number_input.dart';
import 'package:sikshyalaya/screens/2fa/components/CustomOutlinedButton.dart';
import 'package:otp_text_field/otp_field.dart';
import 'package:otp_text_field/style.dart';

class OtpPage extends StatelessWidget {
  const OtpPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    OtpFieldController otpController = OtpFieldController();
    Size size = MediaQuery.of(context).size;
    return StudentWrapper(
      pageName: "OTP",
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height * 0.1,
            margin: EdgeInsets.symmetric(horizontal: 20),
            child: Text(
              "Enter OTP",
              style: TextStyle(fontSize: 20, color: Colors.black),
            ),
          ),
          Container(
            height: size.height * 0.4,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Container(
                  width: size.width,
                  child: OTPTextField(
                    controller: otpController,
                    length: 5,
                    fieldWidth: 50,
                    style: TextStyle(fontSize: 17),
                    textFieldAlignment: MainAxisAlignment.spaceAround,
                    fieldStyle: FieldStyle.box,
                    onCompleted: (pin) {
                      print("Completed: " + pin);
                    },
                  ),
                ),
                Container(
                  margin: EdgeInsets.all(10),
                  child: const CustomOutlinedButton(
                    page: Success(),
                    icon: Icon(Icons.check),
                    label: "",
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
