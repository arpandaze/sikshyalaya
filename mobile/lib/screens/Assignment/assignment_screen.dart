import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/components/nav_bar.dart';
import 'package:sikshyalaya/components/top_bar.dart';
import 'assignment_inner.dart';
import 'assignment_submission.dart';

class AssignmentScreen extends StatelessWidget {
  const AssignmentScreen({
    Key? key,
  }) : super(key: key);

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
                child: AssignmentInner(size: size),
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
