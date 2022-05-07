import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/components/not_available.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/repository/models/answer.dart';
import 'package:sikshyalaya/repository/teacher_quiz.dart';
import 'package:sikshyalaya/repository/teacher_quiz_review.dart';
import 'package:sikshyalaya/screens/Teacher-Quiz/QuizReviewCard.dart';
import 'package:sikshyalaya/screens/Teacher-Quiz/teacher_quiz_bloc.dart';
import 'package:sikshyalaya/screens/Teacher-Quiz/teacher_quiz_review_bloc.dart';

class TeacherQuizReview extends StatelessWidget {
  const TeacherQuizReview({
    Key? key,
    required this.quizId,
    required this.month,
    required this.day,
    required this.course,
    required this.description,
    required this.instructor,
  }) : super(key: key);
  final int quizId;
  final String month;
  final String day;
  final String course;
  final String description;
  final String instructor;

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => TeacherQuizReviewBloc(
          teacherQuizReviewRepository: TeacherQuizReviewRepository(
            token: context.read<AuthBloc>().state.token,
          ),
          quizId: quizId),
      child: SafeArea(
          child: Scaffold(
        body: newMethod(context),
      )),
    );
  }

  Widget newMethod(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocBuilder<TeacherQuizReviewBloc, TeacherQuizReviewState>(
      builder: (context, state) {
        print("hi ${state.reviewList}");
        return Container(
          padding: EdgeInsets.all(10),
          child: ListView(
            children: <Widget>[
              Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: EdgeInsets.only(left: 10),
                        child: Text("Review",
                            style: Theme.of(context).textTheme.headline4),
                      ),
                      Positioned(
                        child: GestureDetector(
                          onTap: () => {
                            Navigator.pop(context),
                          },
                          child: SizedBox(
                            child: Icon(
                              Icons.close,
                              color: Theme.of(context).colorScheme.primary,
                              size: 30,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  Container(
                      width: size.width,
                      margin: EdgeInsets.only(top: size.height * 0.04),
                      padding: const EdgeInsets.fromLTRB(20, 20, 15, 20),
                      decoration: BoxDecoration(
                          color: Theme.of(context).colorScheme.surface,
                          borderRadius: BorderRadius.circular(15)),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                padding: EdgeInsets.symmetric(
                                  vertical: 10,
                                ),
                                child: Text(
                                  course,
                                  style: Theme.of(context).textTheme.headline4,
                                ),
                              ),
                              Container(
                                width: size.width * 0.4,
                                alignment: Alignment.centerRight,
                                // decoration: BoxDecoration(
                                //     border: Border.all(
                                //         color: Colors
                                //             .amber)),
                                child: Text(
                                  instructor,
                                  style: TextStyle(
                                      fontSize: 10, color: Colors.black),
                                ),
                              ),
                            ],
                          ),
                          Container(
                            padding: EdgeInsets.symmetric(
                              vertical: 10,
                            ),
                            child: Text(
                              description,
                              style: Theme.of(context).textTheme.subtitle1,
                            ),
                          ),
                          Container(
                            padding: EdgeInsets.symmetric(
                              vertical: 10,
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Container(
                                  child: Text(
                                    "$month $day",
                                    style:
                                        Theme.of(context).textTheme.subtitle1,
                                  ),
                                ),
                                Container(
                                    child: state.reviewList[0] == Answer.empty
                                        ? Text(
                                            "Total Attempts: 0",
                                            style: Theme.of(context)
                                                .textTheme
                                                .caption,
                                          )
                                        : Text(
                                            "Total Attempts: ${state.reviewList.length}",
                                            style: Theme.of(context)
                                                .textTheme
                                                .caption,
                                          )),
                              ],
                            ),
                          ),
                        ],
                      )),
                  Container(
                    decoration: BoxDecoration(
                      border: Border(
                          bottom: BorderSide(
                        width: 2.0,
                        color: Color(0xFFF14B4B),
                      )),
                    ),
                    padding: EdgeInsets.symmetric(
                      vertical: 10,
                    ),
                    margin: EdgeInsets.only(
                        top: size.height * 0.04, bottom: size.height * 0.02),
                    child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            padding: EdgeInsets.only(left: 10),
                            child: Text("Students",
                                style: TextStyle(
                                    fontSize: 20,
                                    fontFamily: "OpenSans",
                                    color: Colors.black)),
                          ),
                          Container(

                            padding: EdgeInsets.only(top: 10, right: 10),
                            child: Text("Marks",
                                style: TextStyle(
                                    fontSize: 15,
                                    fontFamily: "OpenSans",
                                    color: Color.fromARGB(255, 121, 119, 119))),
                          ),
                        ]),
                  ),
                  state.isLoaded
                      ? state.reviewList[0] != Answer.empty
                          ? ListView.builder(
                              physics: const NeverScrollableScrollPhysics(),
                              shrinkWrap: true,
                              itemCount: state.reviewList.length,
                              itemBuilder: (context, i) {
                                return QuizReviewCard(
                                  id: state.reviewList[i].id!,
                                  profile_image: state
                                          .reviewList[i].student!
                                          .profile_image ??
                                      "",
                                  quiz_id: quizId,
                                  studentName:
                                      state.reviewList[i].student!.full_name!,
                                  marks_obtained:
                                      state.reviewList[i].marks_obtained!,
                                );
                              })
                          : Container(
                              alignment: Alignment.center,
                              child: CircularProgressIndicator())
                      : NotAvailable(size: size, text: "No attempts yet")
                ],
              ),
            ],
          ),
        );
      },
    );
  }
}
