import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/repository/models/quiz_answer.dart';
import 'package:sikshyalaya/repository/student_quiz_view.dart';
import 'package:sikshyalaya/screens/Login/components/CustomFilledButton.dart';
import 'package:sikshyalaya/screens/Quiz/components/QuizAttemptCard.dart';
import 'package:sikshyalaya/screens/Quiz/components/QuizViewCard.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz_view_bloc.dart';

class StudentQuizView extends StatelessWidget {
  const StudentQuizView({
    Key? key,
    required this.size,
    required this.quiz_id,
    required this.isActive,
  }) : super(key: key);

  final Size size;
  final int quiz_id;
  final bool isActive;

  @override
  Widget build(BuildContext context) {
    // return body(context);
    return RepositoryProvider(
      create: (context) => StudentQuizViewRepository(),
      child: BlocProvider(
        create: (context) => StudentQuizViewBloc(
            studentQuizViewRepository:
                context.read<StudentQuizViewRepository>())
          ..add(
            GetStudentQuizView(
              urlView: 'quiz/$quiz_id/question',
              urlAnswer: 'quizanswer/$quiz_id',
            ),
          ),
        child: body(context),
      ),
    );
  }

  Widget body(BuildContext context) {
    Map attemptedAnswers = {};
    return SafeArea(
      top: true,
      bottom: true,
      child: Scaffold(
        body: Container(
          height: size.height,
          width: size.width,
          alignment: Alignment.center,
          child: ListView(
              padding: EdgeInsets.fromLTRB(size.width * 0.03,
                  size.height * 0.070, size.width * 0.03, size.height * 0.05),
              scrollDirection: Axis.vertical,
              children: <Widget>[
                BlocBuilder<StudentQuizViewBloc, StudentQuizViewState>(
                  buildWhen: (previous, current) => previous != current,
                  builder: (context, state) {
                    if (state.isLoaded) {
                      return Container(
                        child: isActive == true && state.answerExists == false
                            ? Column(
                                children: [
                                  ListView.builder(
                                      physics:
                                          const NeverScrollableScrollPhysics(),
                                      shrinkWrap: true,
                                      itemCount: state.quizViews.length,
                                      itemBuilder: (context, i) {
                                        return QuizAttemptCard(
                                            question_id: state.quizViews[i].id,
                                            attemptedAnswers: attemptedAnswers,
                                            multiple:
                                                state.quizViews[i].multiple ??
                                                    false,
                                            size: size,
                                            quizView: state.quizViews[i],
                                            index: i + 1);
                                      }),
                                  Container(
                                    child: CustomFilledButton(
                                      text: "Sumbit",
                                      onPressed: () => {
                                        context.read<StudentQuizViewBloc>()
                                          ..add(StudentAnswerPost(
                                            postUrl: "quizanswer/$quiz_id",
                                            attempt: attemptedAnswers,
                                            quiz_id: quiz_id,
                                            token: BlocProvider.of<AuthBloc>(
                                                    context)
                                                .state
                                                .token,
                                          ))
                                      },
                                    ),
                                  ),
                                ],
                              )
                            : state.answerExists == true
                                ? Column(
                                    children: [
                                      ListView.builder(
                                          physics:
                                              const NeverScrollableScrollPhysics(),
                                          shrinkWrap: true,
                                          itemCount: state.quizViews.length,
                                          itemBuilder: (context, i) {
                                            return QuizViewCard(
                                                toShow: true,
                                                selectedAnswer: state.quizAnswer
                                                    .options_selected,
                                                size: size,
                                                quizView: state.quizViews[i],
                                                index: i + 1);
                                          }),
                                    ],
                                  )
                                : Column(
                                    children: [
                                      Container(
                                          padding: const EdgeInsets.fromLTRB(
                                              0, 10, 0, 10),
                                          alignment: Alignment.topRight,
                                          child: state.quizAnswer
                                                      .marks_obtained !=
                                                  null
                                              ? Text(
                                                  "Marks Obtained: ${state.quizAnswer.marks_obtained}",
                                                  textAlign: TextAlign.right,
                                                  style: TextStyle(
                                                    color: Theme.of(context)
                                                        .colorScheme
                                                        .secondary,
                                                  ))
                                              : Text("Marks Obtained: 0",
                                                  textAlign: TextAlign.right,
                                                  style: TextStyle(
                                                    color: Theme.of(context)
                                                        .colorScheme
                                                        .secondary,
                                                  ))),
                                      ListView.builder(
                                          physics:
                                              const NeverScrollableScrollPhysics(),
                                          shrinkWrap: true,
                                          itemCount: state.quizViews.length,
                                          itemBuilder: (context, i) {
                                            return QuizViewCard(
                                                toShow: false,
                                                selectedAnswer: state.quizAnswer
                                                    .options_selected,
                                                size: size,
                                                quizView: state.quizViews[i],
                                                index: i + 1);
                                          }),
                                    ],
                                  ),
                      );
                    } else {
                      return Container(
                        alignment: Alignment.center,
                        child: CircularProgressIndicator(),
                      );
                    }
                  },
                ),
              ]),
        ),
      ),
    );
  }
}
