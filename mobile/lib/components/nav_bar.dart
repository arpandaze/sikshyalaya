import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/screens/Assignment/student_assignment_screen.dart';
import 'package:sikshyalaya/screens/Dashboard/student_dashboard.dart';
import 'package:sikshyalaya/screens/Notes/student_notes.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz.dart';
import 'package:sikshyalaya/screens/Chat/student_chat.dart';

class NavBar extends StatelessWidget {
  final String pageName;
  const NavBar({
    Key? key,
    required this.pageName,
    required this.size,
  }) : super(key: key);

  final Size size;
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration:
          BoxDecoration(color: Theme.of(context).colorScheme.background),
      width: size.width,
      height: size.height * 0.10,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          GestureDetector(
            behavior: HitTestBehavior.opaque,
            child: Container(
              child: Align(
                child: Stack(alignment: Alignment.center, children: <Widget>[
                  if (pageName == "Dashboard")
                    Container(
                      width: size.width * 0.18,
                      height: size.width * 0.16,
                      margin: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                      child: SvgPicture.asset('assets/images/select.svg',
                          color: Theme.of(context).colorScheme.primary),
                    )
                  else
                    SizedBox(
                      width: size.width * 0.18,
                      height: size.width * 0.16,
                    ),
                  SizedBox(
                    width: size.width * 0.18,
                    height: size.width * 0.06,
                    child: Icon(Icons.home_rounded,
                        color: pageName == "Dashboard"
                            ? Theme.of(context).colorScheme.primary
                            : Theme.of(context).colorScheme.secondary),
                  )
                ]),
              ),
            ),
            onTap: () => Navigator.of(context).push(
              PageRouteBuilder(
                pageBuilder: (context, animation1, animation2) =>
                    const StudentDashboard(),
                transitionDuration: Duration.zero,
                reverseTransitionDuration: Duration.zero,
              ),
            ),
          ),
          GestureDetector(
            behavior: HitTestBehavior.opaque,
            child: Container(
              child: Align(
                child: Stack(alignment: Alignment.center, children: <Widget>[
                  if (pageName == "Quiz")
                    Container(
                      width: size.width * 0.18,
                      height: size.width * 0.16,
                      margin: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                      child: SvgPicture.asset('assets/images/select.svg',
                          color: Theme.of(context).colorScheme.primary),
                    )
                  else
                    SizedBox(
                      width: size.width * 0.18,
                      height: size.width * 0.16,
                    ),
                  SizedBox(
                    width: size.width * 0.18,
                    height: size.width * 0.06,
                    child: Icon(Icons.quiz_rounded,
                        color: pageName == "Quiz"
                            ? Theme.of(context).colorScheme.primary
                            : Theme.of(context).colorScheme.secondary),
                  )
                ]),
              ),
            ),
            onTap: () => Navigator.of(context).push(
              PageRouteBuilder(
                pageBuilder: (context, animation1, animation2) =>
                    const StudentQuiz(),
                transitionDuration: Duration.zero,
                reverseTransitionDuration: Duration.zero,
              ),
            ),
          ),
          GestureDetector(
            behavior: HitTestBehavior.opaque,
            child: Container(
              child: Align(
                child: Stack(alignment: Alignment.center, children: <Widget>[
                  if (pageName == "Assignment")
                    Container(
                      width: size.width * 0.18,
                      height: size.width * 0.16,
                      margin: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                      child: SvgPicture.asset('assets/images/select.svg',
                          color: Theme.of(context).colorScheme.primary),
                    )
                  else
                    SizedBox(
                      width: size.width * 0.18,
                      height: size.width * 0.16,
                    ),
                  SizedBox(
                    width: size.width * 0.18,
                    height: size.width * 0.06,
                    child: Icon(Icons.assignment_rounded,
                        color: pageName == "Assignment"
                            ? Theme.of(context).colorScheme.primary
                            : Theme.of(context).colorScheme.secondary),
                  )
                ]),
              ),
            ),
            onTap: () => Navigator.of(context).push(
              PageRouteBuilder(
                pageBuilder: (context, animation1, animation2) =>
                    const AssignmentScreen(),
                transitionDuration: Duration.zero,
                reverseTransitionDuration: Duration.zero,
              ),
            ),
          ),
          GestureDetector(
            behavior: HitTestBehavior.opaque,
            child: Container(
              child: Align(
                child: Stack(alignment: Alignment.center, children: <Widget>[
                  if (pageName == "Notes")
                    Container(
                      width: size.width * 0.18,
                      height: size.width * 0.16,
                      margin: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                      child: SvgPicture.asset('assets/images/select.svg',
                          color: Theme.of(context).colorScheme.primary),
                    )
                  else
                    SizedBox(
                      width: size.width * 0.18,
                      height: size.width * 0.16,
                    ),
                  SizedBox(
                    width: size.width * 0.18,
                    height: size.width * 0.06,
                    child: Icon(Icons.note_rounded,
                        color: pageName == "Notes"
                            ? Theme.of(context).colorScheme.primary
                            : Theme.of(context).colorScheme.secondary),
                  )
                ]),
              ),
            ),
            onTap: () => Navigator.of(context).push(
              PageRouteBuilder(
                pageBuilder: (context, animation1, animation2) =>
                    const StudentNotes(),
                transitionDuration: Duration.zero,
                reverseTransitionDuration: Duration.zero,
              ),
            ),
          ),
          GestureDetector(
            behavior: HitTestBehavior.opaque,
            child: Container(
              child: Align(
                child: Stack(alignment: Alignment.center, children: <Widget>[
                  if (pageName == "Chat")
                    Container(
                      width: size.width * 0.18,
                      height: size.width * 0.16,
                      margin: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                      child: SvgPicture.asset('assets/images/select.svg',
                          color: Theme.of(context).colorScheme.primary),
                    )
                  else
                    SizedBox(
                      width: size.width * 0.18,
                      height: size.width * 0.16,
                    ),
                  SizedBox(
                    width: size.width * 0.18,
                    height: size.width * 0.06,
                    child: Icon(Icons.message_rounded,
                        color: pageName == "Chat"
                            ? Theme.of(context).colorScheme.primary
                            : Theme.of(context).colorScheme.secondary),
                  )
                ]),
              ),
            ),
            onTap: () => Navigator.of(context).push(
              PageRouteBuilder(
                pageBuilder: (context, animation1, animation2) =>
                    const StudentChat(),
                transitionDuration: Duration.zero,
                reverseTransitionDuration: Duration.zero,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
