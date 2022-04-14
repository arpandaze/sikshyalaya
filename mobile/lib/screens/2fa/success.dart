import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'package:intl_phone_number_input/intl_phone_number_input.dart';
import 'package:sikshyalaya/screens/2fa/components/CustomOutlinedButton.dart';

class Success extends StatelessWidget {
  const Success({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StudentWrapper(
        pageName: "Success",
        child: Center(
          child: Text(
            "Success",
            style: TextStyle(fontSize: 30, color: Colors.black),
          ),
        ));
  }
}
