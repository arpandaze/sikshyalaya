import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/repository/models/quiz_view.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz_bloc.dart';
import 'package:sikshyalaya/screens/Quiz/student_quizview.dart';
import 'package:sikshyalaya/screens/Signup/signup_screen.dart';
import 'package:sikshyalaya/components/CustomFilledButton.dart';

class QuizPreviewCard extends StatelessWidget {
  final Color colorType;
  final String month;
  final String day;
  final String course;
  final String description;
  final String instructor;

  const QuizPreviewCard({
    Key? key,
    required this.id,
    required this.size,
    required this.colorType,
    required this.month,
    required this.day,
    required this.course,
    required this.description,
    required this.instructor,
    this.isActive = false,
    this.endDate,
  }) : super(key: key);

  final endDate;
  final Size size;
  final int id;
  final bool isActive;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          margin: const EdgeInsets.fromLTRB(10, 10, 0, 10),
          width: size.width * 0.20,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                margin: const EdgeInsets.all(0),
                padding: EdgeInsets.symmetric(
                  vertical: 10,
                ),
                child:
                    Text(month, style: Theme.of(context).textTheme.subtitle1),
              ),
              Container(
                height: size.width * 0.11,
                decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                        color: Theme.of(context).colorScheme.onBackground)),
                child: Align(
                  alignment: Alignment.center,
                  child: Text(
                    day,
                    style: Theme.of(context).textTheme.subtitle1,
                  ),
                ),
              )
            ],
          ),
        ),
        GestureDetector(
            child: Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.fromLTRB(0, 20, 0, 20),
              margin: const EdgeInsets.fromLTRB(0, 10, 10, 20),
              width: size.width * 0.65,
              // height: 200,
              decoration: BoxDecoration(
                color: colorType,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 10, 10, 5),
                    width: size.width * 0.55,
                    child: Text(
                      course,
                      style: Theme.of(context).textTheme.headline5,
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 0, 10, 5),
                    width: size.width * 0.55,
                    child: Text(
                      description,
                      style: Theme.of(context).textTheme.subtitle1,
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 0, 10, 5),
                    width: size.width * 0.55,
                    child: Text(
                      instructor,
                      style: Theme.of(context).textTheme.caption,
                    ),
                  ),
                ],
              ),
            ),
            onTap: () => {
                  Navigator.of(context).push(
                    PageRouteBuilder(
                      pageBuilder: (context, animation1, animation2) =>
                          StudentQuizView(
                              endDate: endDate,
                              quiz_id: id,
                              isActive: isActive,
                              description: description,
                              instructor: instructor,
                              course: course,
                              day: day,
                              month: month),
                      transitionDuration: Duration.zero,
                      reverseTransitionDuration: Duration.zero,
                    ),
                  ),
                }),
      ],
    );
  }
}
