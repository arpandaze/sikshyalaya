import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/repository/teacher_quiz.dart';
import 'package:sikshyalaya/screens/Teacher-Quiz/teacher_quiz_bloc.dart';
import 'package:sikshyalaya/screens/Teacher-Quiz/teacher_quiz_review.dart';

class QuizPreview extends StatefulWidget {
  final Color colorType;
  final int? quizId;
  final String month;
  final String day;
  final String course;
  final String description;
  final String instructor;
  const QuizPreview({
    Key? key,
    required this.quizId,
    required this.size,
    required this.colorType,
    required this.month,
    required this.day,
    required this.course,
    required this.description,
    required this.instructor,
  }) : super(key: key);

  final Size size;

  @override
  State<QuizPreview> createState() => _QuizPreviewState();
}

class _QuizPreviewState extends State<QuizPreview> {
  var visibility = false;
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => TeacherQuizBloc(
        teacherQuizRepository: TeacherQuizRepository(
          token: context.read<AuthBloc>().state.token,
        ),
      ),
      child: newMethod(context),
    );
  }

  Widget newMethod(BuildContext context) {
    return BlocBuilder<TeacherQuizBloc, TeacherQuizState>(
      builder: (context, state) {
        return Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              margin: const EdgeInsets.fromLTRB(10, 10, 0, 10),
              width: widget.size.width * 0.20,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Container(
                    margin: const EdgeInsets.all(0),
                    child: Text(widget.month,
                        style: Theme.of(context).textTheme.subtitle1),
                  ),
                  Container(
                    height: widget.size.width * 0.11,
                    decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                            color: Theme.of(context).colorScheme.onBackground)),
                    child: Align(
                      alignment: Alignment.center,
                      child: Text(
                        widget.day,
                        style: Theme.of(context).textTheme.subtitle1,
                      ),
                    ),
                  )
                ],
              ),
            ),
            GestureDetector(
              onTap: () => Navigator.of(context).push(
                PageRouteBuilder(
                  pageBuilder: (context, animation1, animation2) =>
                      TeacherQuizReview(
                    quizId: widget.quizId!,
                    month: widget.month,
                    day: widget.day,
                    course: widget.course,
                    description: widget.description,
                    instructor: widget.instructor,
                  ),
                  transitionDuration: Duration.zero,
                  reverseTransitionDuration: Duration.zero,
                ),
              ),
              child: AbsorbPointer(
                child: Container(
                  alignment: Alignment.center,
                  padding: const EdgeInsets.fromLTRB(0, 20, 0, 20),
                  margin: const EdgeInsets.fromLTRB(0, 10, 10, 20),
                  width: widget.size.width * 0.65,
                  decoration: BoxDecoration(
                    color: widget.colorType,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            margin: const EdgeInsets.fromLTRB(20, 10, 10, 5),
                            // width: widget.size.width * 0.42,
                            child: Text(
                              widget.course,
                              style: Theme.of(context).textTheme.headline5,
                            ),
                          ),
                          Stack(
                            clipBehavior: Clip.none,
                            children: [
                              Container(
                                child: IconButton(
                                  onPressed: () => setState(() {
                                    visibility = !visibility;
                                  }),
                                  icon: Icon(Icons.more_vert),
                                ),
                              ),
                              Visibility(
                                visible: visibility,
                                child: Positioned(
                                  top: widget.size.width * 0.1,
                                  left: widget.size.width * 0.001,
                                  child: GestureDetector(
                                    behavior: HitTestBehavior.translucent,
                                    onTap: () => {
                                      context
                                          .read<TeacherQuizBloc>()
                                          .add(DeleteQuiz(
                                            quiz_id: widget.quizId!,
                                          )),
                                      setState(() {
                                        visibility = !visibility;
                                      }),
                                      Navigator.pushReplacementNamed(
                                          context, '/tquiz')
                                    },
                                    child: Container(
                                      width: widget.size.width * 0.15,
                                      height: widget.size.width * 0.1,
                                      alignment: Alignment.center,
                                      decoration: BoxDecoration(
                                        color:
                                            Color.fromARGB(234, 255, 255, 255),
                                        borderRadius: BorderRadius.circular(5),
                                        border: Border.all(
                                            color: Color.fromARGB(
                                                195, 189, 187, 187)),
                                      ),
                                      child: Container(
                                        // padding: EdgeInsets.all(10),
                                        child: Text("Delete",
                                            style: TextStyle(
                                                color: Colors.red,
                                                fontSize: 10)),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      Container(
                        margin: const EdgeInsets.fromLTRB(20, 0, 10, 5),
                        width: widget.size.width * 0.55,
                        child: Text(
                          widget.description,
                          style: Theme.of(context).textTheme.bodyText1,
                        ),
                      ),
                      Container(
                        margin: const EdgeInsets.fromLTRB(20, 0, 10, 5),
                        width: widget.size.width * 0.55,
                        child: Text(
                          widget.instructor,
                          style: Theme.of(context).textTheme.caption,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            )
          ],
        );
      },
    );
  }
}
