import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';
import 'package:sikshyalaya/screens/Quiz/QuizPreviewCard.dart';

class StudentQuiz extends StatelessWidget {
  const StudentQuiz({
    Key? key,
    required this.size,
  }) : super(key: key);

  final Size size;
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            Container(
              width: size.width,
              child: Container(
                  child: const CustomTextField(
                placeHolder: "Search Quiz",
                margin: const EdgeInsets.fromLTRB(20, 5, 20, 5),
              )),
            )
          ],
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
                  "Active Quiz",
                  style: Theme.of(context).textTheme.headline5,
                ),
              ),
            )
          ],
        ),
        //Active Quiz
        QuizPreviewCard(
          size: size,
          colorType: Theme.of(context).colorScheme.primary,
          month: "Mar",
          day: "12",
          course: "COMP 204",
          description: "Second Inteeernal",
          instructor: "Dr. Gajendra Sharma",
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
        QuizPreviewCard(
          size: size,
          colorType: Theme.of(context).colorScheme.error,
          month: "Mar",
          day: "12",
          course: "COMP 204",
          description: "Second Inteeernal",
          instructor: "Dr. Gajendra Sharma",
        ),
      ],
    );
  }
}
