import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/quiz.dart';
import 'package:sikshyalaya/screens/Assignment/Add-Assignment/add_assignment.dart';
import 'package:sikshyalaya/screens/Assignment/Teacher-Assignment/teacher_assignment.dart';
import 'package:sikshyalaya/screens/ClassCreator/class_creator.dart';
import 'package:sikshyalaya/screens/Assignment/student_assignment_screen.dart';
import 'package:sikshyalaya/screens/Dashboard/student_dashboard.dart';
import 'package:sikshyalaya/screens/Notes/student_notes.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz.dart';
import 'package:sikshyalaya/screens/Chat/student_chat.dart';
import 'package:sikshyalaya/screens/Teacher-Dashboard/teacher-dashboard.dart';
import 'package:sikshyalaya/screens/Teacher-Notes/teacher_notes.dart';
import 'package:sikshyalaya/screens/Teacher-Quiz/teacher_quiz.dart';

import '../global/authentication/auth_bloc.dart';

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
    final authBloc = BlocProvider.of<AuthBloc>(context);
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
                    authBloc.state.status == AuthStatus.studentSession
                        ? const StudentDashboard()
                        : const TeacherDashboard(),
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
                    authBloc.state.status == AuthStatus.studentSession
                        ? const StudentQuiz()
                        : const TeacherQuiz(),
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
                    authBloc.state.status == AuthStatus.studentSession
                        ? const AssignmentScreen()
                        : const TeacherAssignment(),
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
                    authBloc.state.status == AuthStatus.studentSession
                        ? const StudentNotes()
                        : const TeacherNotes(),
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
                    authBloc.state.status == AuthStatus.studentSession
                        ? StudentChat()
                        : StudentChat(),
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
