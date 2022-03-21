import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Login/components/body.dart';
import 'package:url_launcher/url_launcher.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return SafeArea(
      top: true,
      bottom: true,
      child: Scaffold(
        backgroundColor: Theme.of(context).colorScheme.background,
        body: Body(),
      ),
    );
  }
}
