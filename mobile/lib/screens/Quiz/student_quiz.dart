import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/components/not_available.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/repository/models/quiz.dart';
import 'package:sikshyalaya/repository/student_quiz.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';
import 'package:sikshyalaya/screens/Quiz/components/QuizPreviewCard.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz_bloc.dart';
import 'package:sikshyalaya/helpers/helper.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';

class StudentQuiz extends StatelessWidget {
  const StudentQuiz({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StudentWrapper(
      pageName: "Quiz",
      child: BlocProvider(
        create: (context) => StudentQuizBloc(
            studentQuizRepository: StudentQuizRepository(
                token: context.read<AuthBloc>().state.token)),
        child: body(context),
      ),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocBuilder<StudentQuizBloc, StudentQuizState>(
      buildWhen: (previous, current) => (previous != current),
      builder: (context, state) {
        if (state.isLoaded) {
          return ListView(
            children: <Widget>[
              // Row(
              //   mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              //   children: <Widget>[
              //     Container(
              //       width: size.width,
              //       child: Container(
              //           child: const CustomTextField(
              //         placeHolder: "Search Quiz",
              //         margin: EdgeInsets.fromLTRB(20, 10, 20, 5),
              //       )),
              //     )
              //   ],
              // ),
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
                child: state.active![0] == Quiz.empty
                    ? NotAvailable(size: size, text: "No Active Quizzes")
                    : ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        shrinkWrap: true,
                        itemCount: state.active!.length,
                        itemBuilder: (context, i) {
                          return QuizPreviewCard(
                            // startTime: state.active![i].start_time,
                            // endTime: state.active![i].end_time,
                            isActive: true,
                            endDate: state.endDate["${state.active![i].id!}"],
                            id: state.active![i].id!,
                            size: size,
                            colorType: Theme.of(context).colorScheme.primary,
                            month: dateHandler(
                                state.active![i].start_time!)["month"],
                            day: dateHandler(
                                state.active![i].start_time!)["monthDay"],
                            course: state.active![i].course!.course_code!,
                            description: state.active![i].description!,
                            instructor:
                                studentInstructor(state.active![i].instructor),
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
                child: state.other![0] == Quiz.empty
                    ? NotAvailable(size: size, text: "No Upcoming Quizzes")
                    : ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        shrinkWrap: true,
                        itemCount: state.other!.length,
                        itemBuilder: (context, i) {
                          return QuizPreviewCard(
                            id: state.other![i].id!,
                            size: size,
                            colorType: Theme.of(context).colorScheme.primary,
                            month: dateHandler(
                                state.other![i].start_time!)["month"],
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
                child: state.past![0] == Quiz.empty
                    ? NotAvailable(size: size, text: "No Past Quizzes")
                    : ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        shrinkWrap: true,
                        itemCount: state.past!.length,
                        itemBuilder: (context, i) {
                          return QuizPreviewCard(
                            id: state.past![i].id!,
                            size: size,
                            colorType: Theme.of(context).colorScheme.surface,
                            month: dateHandler(
                                state.past![i].start_time!)["month"],
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
        } else {
          return Container(
            alignment: Alignment.center,
            child: CircularProgressIndicator(),
          );
        }
      },
    );
  }
}
