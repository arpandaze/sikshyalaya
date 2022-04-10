import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/components/nav_bloc.dart';
import 'package:sikshyalaya/screens/Assignment/student_assignment_submission.dart';
import 'package:sikshyalaya/components/not_available.dart';

class Assignments extends StatelessWidget {
  const Assignments({
    Key? key,
    required this.title,
    required this.courseCode,
    required this.dueDate,
    required this.instructor,
    required this.contents,
  }) : super(key: key);

  final String? title;
  final String dueDate;
  final String courseCode;
  final String instructor;
  final String contents;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return GestureDetector(
      child: Container(
        margin: const EdgeInsets.fromLTRB(20, 10, 20, 5),
        width: size.width * 0.90,
        height: 100,
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(25),
            color: Theme.of(context).colorScheme.surface),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  margin: EdgeInsets.fromLTRB(20, 0, 0, 0),
                  child: Text(
                    courseCode,
                    style: Theme.of(context).textTheme.headline5,
                  ),
                ),
                Container(
                  width: size.width * 0.40,
                  margin: EdgeInsets.fromLTRB(20, 0, 0, 0),
                  child: Text(
                    instructor,
                    style: Theme.of(context).textTheme.subtitle2,
                  ),
                )
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Icon(
                  Icons.calendar_today,
                  size: 20,
                ),
                Container(
                  width: size.width * 0.3,
                  margin: EdgeInsets.fromLTRB(8, 0, 20, 0),
                  child: Text(
                    dueDate,
                    style: Theme.of(context).textTheme.subtitle2,
                  ),
                )
              ],
            )
          ],
        ),
      ),
      onTap: () => {
        context.read<NavBloc>().add(NavChangeEvent(
            page: AssignmentSubmission(
                title: title, dueDate: dueDate, contents: contents, files: "")))
      },
    );
  }
}
