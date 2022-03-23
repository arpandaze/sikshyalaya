import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/screens/Quiz/components/QuizCard.dart';

class StudentQuizView extends StatelessWidget {
  const StudentQuizView({
    Key? key,
    required this.size,
  }) : super(key: key);

  final Size size;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: EdgeInsets.fromLTRB(8.0, 8.0, size.width * 0.06, 8.0),
      children: <Widget>[
        QuizCard(size: size),
        Divider(color: Theme.of(context).colorScheme.surface),
        QuizCard(size: size),
        Divider(color: Theme.of(context).colorScheme.surface),
        QuizCard(size: size),
        Divider(color: Theme.of(context).colorScheme.surface),
        QuizCard(size: size),
      ],
    );
  }
}
