import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Profile/profile.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:sikshyalaya/components/nav_bar.dart';
import 'package:sikshyalaya/screens/Dashboard/student_dashboard.dart';
import 'package:sikshyalaya/screens/Notes/student_notes.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz.dart';
import 'package:sikshyalaya/components/top_bar.dart';
import 'package:sikshyalaya/screens/Assignment/assignment_screen.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/components/nav_bloc.dart';

class Student extends StatelessWidget {
  const Student({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => NavBloc(),
      child: body(context),
    );
  }

  Widget body(BuildContext context) {
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
                          0, size.height * 0.10, 0, size.height * 0.08),
              BlocBuilder<NavBloc, NavState>(
                  buildWhen: (prev, next) => true,
                  builder: (context, state) {
                    return Container(
                      padding: EdgeInsets.fromLTRB(
                          0, size.height * 0.10, 0, size.height * 0.08),
                      child: state.page,
                    );
                  }),
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
