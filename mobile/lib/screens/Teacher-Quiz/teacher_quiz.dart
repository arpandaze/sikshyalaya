import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/components/not_available.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/repository/teacher_quiz.dart';
import 'package:sikshyalaya/repository/models/teacher_quiz.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';
import 'package:sikshyalaya/screens/Teacher-Quiz/QuizPreview.dart';
import 'package:sikshyalaya/screens/Teacher-Quiz/teacher_quiz_bloc.dart';
import 'package:sikshyalaya/helpers/helper.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';

class TeacherQuiz extends StatelessWidget {
  const TeacherQuiz({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StudentWrapper(
      pageName: "Quiz",
      child: RepositoryProvider(
        create: (context) =>
            TeacherQuizRepository(token: context.read<AuthBloc>().state.token),
        child: BlocProvider(
          create: (context) => TeacherQuizBloc(
              teacherQuizRepository: context.read<TeacherQuizRepository>())
            ..add(GetTeacherQuiz(url: 'quiz')),
          child: body(context),
        ),
      ),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocBuilder<TeacherQuizBloc, TeacherQuizState>(
      buildWhen: (previous, current) => (previous != current),
      builder: (context, state) {
        return ListView(
          children: <Widget>[
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Container(
                  alignment: Alignment.centerLeft,
                  child: Container(
                    alignment: Alignment.centerLeft,
                    padding: const EdgeInsets.fromLTRB(20, 20, 0, 0),
                    child: Text(
                      "Active Quiz",
                      style: Theme.of(context).textTheme.headline5,
                    ),
                  ),
                )
              ],
            ),
            //Active Quiz
            SizedBox(
              child: state.active![0] == TQuiz.empty
                  ? NotAvailable(size: size, text: "No Active Quizzes")
                  : ListView.builder(
                      physics: const NeverScrollableScrollPhysics(),
                      shrinkWrap: true,
                      itemCount: state.active!.length,
                      itemBuilder: (context, i) {
                        print("quiz");
                        print(state.active![i]);
                        return QuizPreview(
                          quizId: state.active![i].id,
                          size: size,
                          colorType: Theme.of(context).colorScheme.primary,
                          month: dateHandler(
                              state.active![i].start_time!)["month"],
                          day: dateHandler(
                              state.active![i].start_time!)["monthDay"],
                          course: state.active![i].course!.course_code!,
                          description: state.active![i].description!,
                          instructor:
                              studentInstructor(state.past![i].instructor),
                        );
                      }),
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Container(
                  alignment: Alignment.centerLeft,
                  child: Container(
                    alignment: Alignment.centerLeft,
                    padding: const EdgeInsets.fromLTRB(20, 10, 0, 10),
                    child: Text(
                      "Upcoming Quiz",
                      style: Theme.of(context).textTheme.headline5,
                    ),
                  ),
                )
              ],
            ),
            //Past Quiz
            SizedBox(
              child: state.other![0] == TQuiz.empty
                  ? NotAvailable(size: size, text: "No Upcoming Quizzes")
                  : ListView.builder(
                      physics: const NeverScrollableScrollPhysics(),
                      shrinkWrap: true,
                      itemCount: state.other!.length,
                      itemBuilder: (context, i) {
                        return QuizPreview(
                          quizId: state.other![i].id,
                          size: size,
                          colorType: Theme.of(context).colorScheme.primary,
                          month:
                              dateHandler(state.other![i].start_time!)["month"],
                          day: dateHandler(
                              state.other![i].start_time!)["monthDay"],
                          course: state.other![i].course!.course_code!,
                          description: state.other![i].description!,
                          instructor:
                              studentInstructor(state.other![i].instructor),
                        );
                      }),
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Container(
                  alignment: Alignment.centerLeft,
                  child: Container(
                    alignment: Alignment.centerLeft,
                    padding: const EdgeInsets.fromLTRB(20, 10, 0, 10),
                    child: Text(
                      "Past Quiz",
                      style: Theme.of(context).textTheme.headline5,
                    ),
                  ),
                )
              ],
            ),
            //Past Quiz
            SizedBox(
              child: state.past![0] == TQuiz.empty
                  ? NotAvailable(size: size, text: "No Past Quizzes")
                  : ListView.builder(
                      physics: const NeverScrollableScrollPhysics(),
                      shrinkWrap: true,
                      itemCount: state.past!.length,
                      itemBuilder: (context, i) {
                        return QuizPreview(
                          size: size,
                          quizId: state.past![i].id,

                          colorType: Theme.of(context).colorScheme.surface,
                          month:
                              dateHandler(state.past![i].start_time!)["month"],
                          day: dateHandler(
                              state.past![i].start_time!)["monthDay"],
                          course: state.past![i].course!.course_code!,
                          description: state.past![i].description!,
                          instructor:
                              studentInstructor(state.past![i].instructor),
                        );
                      }),
            ),
          ],
        );
      },
    );
  }
}
