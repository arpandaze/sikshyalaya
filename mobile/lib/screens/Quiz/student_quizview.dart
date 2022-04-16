import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/repository/models/quiz_view.dart';
import 'package:sikshyalaya/repository/student_quiz_view.dart';
import 'package:sikshyalaya/screens/Quiz/components/QuizCard.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz_bloc.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz_view_bloc.dart';

class StudentQuizView extends StatelessWidget {
  const StudentQuizView({
    Key? key,
    required this.size,
    required this.quiz_id,
  }) : super(key: key);

  final Size size;
  final int quiz_id;

  @override
  Widget build(BuildContext context) {
    return body(context);
    // return RepositoryProvider(
    //   create: (context) => StudentQuizViewRepository(),
    //   child: BlocProvider(
    //     create: (context) => StudentQuizViewBloc(
    //         studentQuizViewRepository:
    //             context.read<StudentQuizViewRepository>())
    //       ..add(GetStudentQuizView(
    //         url: '$quiz_id/question',
    //       )),
    //     child: body(context),
    //   ),
    // );
  }

  Widget body(BuildContext context) {
    // return BlocBuilder<StudentQuizViewBloc, StudentQuizViewState>(
    //   buildWhen: (previous, current) => previous != current,
    //   builder: (context, state) {
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
    //   },
    // );
  }
}
