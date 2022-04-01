import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/components/nav_bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/screens/Assignment/assignment_screen.dart';
import 'package:sikshyalaya/screens/Dashboard/student_dashboard.dart';
import 'package:sikshyalaya/screens/Notes/student_notes.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz.dart';

class NavBar extends StatelessWidget {
  const NavBar({
    Key? key,
    required this.size,
  }) : super(key: key);

  final Size size;

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<NavBloc, NavState>(
        buildWhen: (prev, next) => true,
        builder: (context, state) {
          return Container(
            width: size.width,
            height: size.height * 0.10,
            decoration:
                BoxDecoration(color: Theme.of(context).colorScheme.background),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                GestureDetector(
                  child: Container(
                    margin: EdgeInsets.fromLTRB(0, 0, 0, size.height * 0.02),
                    height: size.width * 0.06,
                    child: Image.asset('assets/images/home.png',
                        fit: BoxFit.cover),
                  ),
                  onTap: () => context.read<NavBloc>().add(
                        const NavChangeEvent(page: StudentDashboard()),
                      ),
                ),
                GestureDetector(
                  child: Container(
                    margin: EdgeInsets.fromLTRB(0, 0, 0, size.height * 0.02),
                    height: size.width * 0.06,
                    child: Image.asset('assets/images/quiz.png',
                        fit: BoxFit.cover),
                  ),
                  onTap: () => context.read<NavBloc>().add(
                        const NavChangeEvent(page: StudentQuiz()),
                      ),
                ),
                GestureDetector(
                  child: Container(
                    margin: EdgeInsets.fromLTRB(0, 0, 0, size.height * 0.02),
                    height: size.width * 0.06,
                    child: Image.asset('assets/images/assignment.png',
                        fit: BoxFit.cover),
                  ),
                  onTap: () => context.read<NavBloc>().add(
                        const NavChangeEvent(page: AssignmentScreen()),
                      ),
                ),
                GestureDetector(
                  child: Container(
                    margin: EdgeInsets.fromLTRB(0, 0, 0, size.height * 0.02),
                    height: size.width * 0.06,
                    child: Image.asset('assets/images/note.png',
                        fit: BoxFit.cover),
                  ),
                  onTap: () => context.read<NavBloc>().add(
                        const NavChangeEvent(page: StudentNotes()),
                      ),
                ),
                GestureDetector(
                  child: Container(
                    margin: EdgeInsets.fromLTRB(0, 0, 0, size.height * 0.02),
                    height: size.width * 0.06,
                    child: Image.asset('assets/images/message.png',
                        fit: BoxFit.cover),
                  ),
                  onTap: () => context.read<NavBloc>().add(
                        const NavChangeEvent(page: StudentNotes()),
                      ),
                ),
              ],
            ),
          );
        });
  }
}
