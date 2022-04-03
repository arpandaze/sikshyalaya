import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Signup/components/personal_information.dart';

class SignupScreen extends StatelessWidget {
  const SignupScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: true,
      bottom: true,
      child: Scaffold(
        backgroundColor: Theme.of(context).colorScheme.background,
        body: PersonalInformation(),
      ),
    );
  }
}
