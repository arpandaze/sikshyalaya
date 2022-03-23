import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:sikshyalaya/components/nav_bar.dart';
import 'package:sikshyalaya/screens/Dashboard/student_dashboard.dart';
import 'package:sikshyalaya/components/top_bar.dart';

class Student extends StatelessWidget {
  const Student({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return SafeArea(
      top: true,
      bottom: true,
      child: Scaffold(
        backgroundColor: Theme.of(context).colorScheme.background,
        body: SizedBox(
          width: double.infinity,
          height: size.height,
          child: Stack(
            alignment: Alignment.center,
            children: <Widget>[
              Container(
                padding: EdgeInsets.fromLTRB(
                    0, size.height * 0.14, 0, size.height * 0.12),
                child: StudentDashboard(size: size),
              ),
              //TopBar
              Positioned(
                top: 0,
                left: 0,
                child: TopBar(size: size),
              ),
              //NavBar
              Positioned(bottom: 0, left: 0, child: NavBar(size: size))
            ],
          ),
        ),
      ),
    );
  }
}
