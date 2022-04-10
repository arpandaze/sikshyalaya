import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/components/nav_bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/screens/Assignment/student_assignment_screen.dart';
import 'package:sikshyalaya/screens/Dashboard/student_dashboard.dart';
import 'package:sikshyalaya/screens/Notes/student_notes.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz.dart';
import 'package:sikshyalaya/screens/Chat/student_chat.dart';

class NavBar extends StatelessWidget {
  const NavBar({
    Key? key,
    required this.size,
  }) : super(key: key);

  final Size size;
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<NavBloc, NavState>(
        buildWhen: (prev, next) => prev != next,
        builder: (context, state) {
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
                      child:
                          Stack(alignment: Alignment.center, children: <Widget>[
                        if (state.pindex == 1)
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
                              color: state.pindex == 1
                                  ? Theme.of(context).colorScheme.primary
                                  : Theme.of(context).colorScheme.secondary),
                        )
                      ]),
                    ),
                  ),
                  onTap: () => context.read<NavBloc>().add(
                        const NavChangeEvent(
                            page: StudentDashboard(), pindex: 1),
                      ),
                ),
                GestureDetector(
                  behavior: HitTestBehavior.opaque,
                  child: Container(
                    child: Align(
                      child:
                          Stack(alignment: Alignment.center, children: <Widget>[
                        if (state.pindex == 2)
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
                              color: state.pindex == 2
                                  ? Theme.of(context).colorScheme.primary
                                  : Theme.of(context).colorScheme.secondary),
                        )
                      ]),
                    ),
                  ),
                  onTap: () => context.read<NavBloc>().add(
                        const NavChangeEvent(page: StudentQuiz(), pindex: 2),
                      ),
                ),
                GestureDetector(
                  behavior: HitTestBehavior.opaque,
                  child: Container(
                    child: Align(
                      child:
                          Stack(alignment: Alignment.center, children: <Widget>[
                        if (state.pindex == 3)
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
                              color: state.pindex == 3
                                  ? Theme.of(context).colorScheme.primary
                                  : Theme.of(context).colorScheme.secondary),
                        )
                      ]),
                    ),
                  ),
                  onTap: () => context.read<NavBloc>().add(
                        const NavChangeEvent(
                            page: AssignmentScreen(), pindex: 3),
                      ),
                ),
                GestureDetector(
                  behavior: HitTestBehavior.opaque,
                  child: Container(
                    child: Align(
                      child:
                          Stack(alignment: Alignment.center, children: <Widget>[
                        if (state.pindex == 4)
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
                              color: state.pindex == 4
                                  ? Theme.of(context).colorScheme.primary
                                  : Theme.of(context).colorScheme.secondary),
                        )
                      ]),
                    ),
                  ),
                  onTap: () => context.read<NavBloc>().add(
                        const NavChangeEvent(page: StudentNotes(), pindex: 4),
                      ),
                ),
                GestureDetector(
                  behavior: HitTestBehavior.opaque,
                  child: Container(
                    child: Align(
                      child:
                          Stack(alignment: Alignment.center, children: <Widget>[
                        if (state.pindex == 5)
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
                              color: state.pindex == 5
                                  ? Theme.of(context).colorScheme.primary
                                  : Theme.of(context).colorScheme.secondary),
                        )
                      ]),
                    ),
                  ),
                  onTap: () => context.read<NavBloc>().add(
                        const NavChangeEvent(page: StudentChat(), pindex: 5),
                      ),
                ),
              ],
            ),
          );
        });
  }
}
