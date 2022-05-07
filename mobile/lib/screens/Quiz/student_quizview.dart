import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/components/CustomFilledButtonSecond.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/repository/models/quiz_answer.dart';
import 'package:sikshyalaya/repository/student_quiz_view.dart';
import 'package:sikshyalaya/screens/Login/components/CustomFilledButton.dart';
import 'package:sikshyalaya/screens/Quiz/components/QuizAttemptCard.dart';
import 'package:sikshyalaya/screens/Quiz/components/QuizViewCard.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz_bloc.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz_view_bloc.dart';

class StudentQuizView extends StatelessWidget {
  const StudentQuizView({
    Key? key,
    required this.endDate,
    required this.quiz_id,
    this.course,
    this.description,
    this.instructor,
    this.month,
    this.day,
    required this.isActive,
  }) : super(key: key);

  final int quiz_id;
  final DateTime? endDate;
  final bool isActive;
  final String? description;
  final String? course;
  final String? instructor;
  final String? month;
  final String? day;

  @override
  Widget build(BuildContext context) {
    // return body(context);
    return BlocProvider(
      create: (context) => StudentQuizViewBloc(
          studentQuizViewRepository: StudentQuizViewRepository(
              token: context.read<AuthBloc>().state.token))
        ..add(
          GetStudentQuizView(
            urlView: 'quiz/$quiz_id/question',
            urlAnswer: 'quizanswer/$quiz_id',
          ),
        ),
      child: body(context),
    );
  }

  Widget body(BuildContext context) {
    var check = false;
    var duration = Duration(minutes: 10);
    if (endDate != null) {
      duration = endDate!.difference(DateTime.now());
    }
    PageController _controller = PageController();
    Size size = MediaQuery.of(context).size;
    Map attemptedAnswers = {};
    return SafeArea(
      top: true,
      bottom: true,
      child: Scaffold(
        body: Container(
          height: size.height,
          width: size.width,
          alignment: Alignment.center,
          child: Container(
            height: size.height,
            width: size.width,
            child: ListView(
                padding: EdgeInsets.fromLTRB(size.width * 0.02,
                    size.height * 0.010, size.width * 0.02, size.height * 0.01),
                scrollDirection: Axis.vertical,
                children: <Widget>[
                  BlocBuilder<StudentQuizViewBloc, StudentQuizViewState>(
                    buildWhen: (previous, current) => previous != current,
                    builder: (context, state) {
                      if (state.isLoaded) {
                        return Container(
                          child: isActive == true && state.answerExists == false
                              ? Column(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Container(
                                          padding: EdgeInsets.only(left: 10),
                                          child: TweenAnimationBuilder<
                                                  Duration>(
                                              duration: duration,
                                              tween: Tween(
                                                  begin: duration,
                                                  end: Duration.zero),
                                              onEnd: () {
                                                onPressed(
                                                    context, attemptedAnswers);
                                              },
                                              builder: (BuildContext context,
                                                  Duration value,
                                                  Widget? child) {
                                                final minutes = value.inMinutes
                                                    .toString()
                                                    .padLeft(2, '0');
                                                final seconds =
                                                    (value.inSeconds % 60)
                                                        .toString()
                                                        .padLeft(2, '0');
                                                return Padding(
                                                    padding: const EdgeInsets
                                                        .symmetric(vertical: 5),
                                                    child: Text(
                                                        'Time $minutes:$seconds',
                                                        textAlign:
                                                            TextAlign.center,
                                                        style: Theme.of(context)
                                                            .textTheme
                                                            .headline5));
                                              }),
                                        ),
                                        Container(
                                          width: size.width * 0.2,
                                          height: size.height * 0.05,
                                          child: CustomFilledButton(
                                            text: "Sumbit",
                                            onPressed: () => {
                                              onPressed(
                                                  context, attemptedAnswers)
                                            },
                                          ),
                                        ),
                                      ],
                                    ),
                                    Container(
                                      constraints: BoxConstraints(
                                          maxHeight: 1.5 * size.height,
                                          minHeight: 0.5 * size.height),
                                      // padding: EdgeInsets.only(
                                      //     top: size.height * 0.01,
                                      //     bottom: size.height * 0.01),
                                      // width: size.width * 0.5,
                                      child: PageView.builder(
                                          controller: _controller,
                                          itemCount: state.quizViews.length,
                                          itemBuilder: (context, index) {
                                            // if (index == state.quizViews.length) {
                                            //   check = true;
                                            // }
                                            return QuizAttemptCard(
                                                question_id:
                                                    state.quizViews[index].id,
                                                attemptedAnswers:
                                                    attemptedAnswers,
                                                multiple: state.quizViews[index]
                                                        .multiple ??
                                                    false,
                                                quizView:
                                                    state.quizViews[index],
                                              index: index + 1,
                                              controller: _controller,
                                            );
                                          }),
                                    ),
                                    
                                  ],
                                )
                              : state.answerExists == true
                                  ? Column(
                                      children: [
                                        Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            Container(
                                              padding:
                                                  EdgeInsets.only(left: 10),
                                              child: Text("Review",
                                                  style: Theme.of(context)
                                                      .textTheme
                                                      .headline4),
                                            ),
                                            Positioned(
                                              child: GestureDetector(
                                                onTap: () => {
                                                  Navigator.pop(context),
                                                },
                                                child: SizedBox(
                                                  child: Icon(
                                                    Icons.close,
                                                    color: Theme.of(context)
                                                        .colorScheme
                                                        .primary,
                                                    size: 30,
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                        Container(
                                          padding: EdgeInsets.only(
                                              top: size.height * 0.01,
                                              bottom: size.height * 0.01),
                                          child: ListView.builder(
                                              physics:
                                                  const NeverScrollableScrollPhysics(),
                                              shrinkWrap: true,
                                              itemCount: state.quizViews.length,
                                              itemBuilder: (context, i) {
                                                return QuizViewCard(
                                                    toShow: true,
                                                    selectedAnswer: state
                                                        .quizAnswer
                                                        .options_selected,
                                                    size: size,
                                                    quizView:
                                                        state.quizViews[i],
                                                    index: i + 1);
                                              }),
                                        ),
                                      ],
                                    )
                                  : Column(
                                      children: [
                                        Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            Container(
                                              padding:
                                                  EdgeInsets.only(left: 10),
                                              child: Text("Review",
                                                  style: Theme.of(context)
                                                      .textTheme
                                                      .headline4),
                                            ),
                                            Positioned(
                                              child: GestureDetector(
                                                onTap: () => {
                                                  Navigator.pop(context),
                                                },
                                                child: SizedBox(
                                                  child: Icon(
                                                    Icons.close,
                                                    color: Theme.of(context)
                                                        .colorScheme
                                                        .primary,
                                                    size: 30,
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                        Container(
                                            width: size.width,
                                            margin: EdgeInsets.only(
                                                top: size.height * 0.04),
                                            padding: const EdgeInsets.fromLTRB(
                                                20, 20, 20, 20),
                                            decoration: BoxDecoration(
                                                color: Theme.of(context)
                                                    .colorScheme
                                                    .surface,
                                                borderRadius:
                                                    BorderRadius.circular(15)),
                                            child: Column(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.start,
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              children: [
                                                Row(
                                                  mainAxisAlignment:
                                                      MainAxisAlignment
                                                          .spaceBetween,
                                                  children: [
                                                    Container(
                                                      padding:
                                                          EdgeInsets.symmetric(
                                                        vertical: 10,
                                                      ),
                                                      child: Text(
                                                        course!,
                                                        style: Theme.of(context)
                                                            .textTheme
                                                            .headline4,
                                                      ),
                                                    ),
                                                    Container(
                                                      width: size.width * 0.5,
                                                      alignment:
                                                          Alignment.centerRight,
                                                      // decoration: BoxDecoration(
                                                      //     border: Border.all(
                                                      //         color: Colors
                                                      //             .amber)),
                                                      child: Text(
                                                        instructor!,
                                                        style: Theme.of(context)
                                                            .textTheme
                                                            .subtitle1,
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                                Container(
                                                  padding: EdgeInsets.symmetric(
                                                    vertical: 10,
                                                  ),
                                                  child: Text(
                                                    description!,
                                                    style: Theme.of(context)
                                                        .textTheme
                                                        .subtitle1,
                                                  ),
                                                ),
                                                Container(
                                                  padding: EdgeInsets.symmetric(
                                                    vertical: 10,
                                                  ),
                                                  child: Row(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment
                                                            .spaceBetween,
                                                    children: [
                                                      Container(
                                                        child: Text(
                                                          "${month!} ${day!}",
                                                          style:
                                                              Theme.of(context)
                                                                  .textTheme
                                                                  .subtitle1,
                                                        ),
                                                      ),
                                                      Container(
                                                          child: state.quizAnswer
                                                                      .marks_obtained !=
                                                                  null
                                                              ? Text(
                                                                  "Marks Obtained: ${state.quizAnswer.marks_obtained}",
                                                                  style: Theme.of(
                                                                          context)
                                                                      .textTheme
                                                                      .caption,
                                                                )
                                                              : Text(
                                                                  "Marks Obtained: 0",
                                                                  style: Theme.of(
                                                                          context)
                                                                      .textTheme
                                                                      .caption,
                                                                )),
                                                    ],
                                                  ),
                                                ),
                                              ],
                                            )),
                                        ListView.builder(
                                            physics:
                                                const NeverScrollableScrollPhysics(),
                                            shrinkWrap: true,
                                            itemCount: state.quizViews.length,
                                            itemBuilder: (context, i) {
                                              return QuizViewCard(
                                                  toShow: false,
                                                  selectedAnswer: state
                                                      .quizAnswer
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
      ),
    );
  }

  void onPressed(BuildContext context, Map attemptedAnswers) {
    context.read<StudentQuizViewBloc>().add(StudentAnswerPost(
          postUrl: "quizanswer/$quiz_id",
          attempt: attemptedAnswers,
          quiz_id: quiz_id,
          token: BlocProvider.of<AuthBloc>(context).state.token,
        ));
    Navigator.pop(context);
  }
}
