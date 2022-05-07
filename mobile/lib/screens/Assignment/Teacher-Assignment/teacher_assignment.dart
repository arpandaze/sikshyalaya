import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/repository/teacher_assignment.dart';
import 'package:sikshyalaya/repository/models/teacher_assignment.dart';
import 'package:sikshyalaya/screens/Assignment/Add-Assignment/add_assignment.dart';
import 'package:sikshyalaya/screens/Assignment/Teacher-Assignment/teacher_assignment_bloc.dart';
import 'package:sikshyalaya/screens/Assignment/components/Assignments.dart';
import 'package:sikshyalaya/helpers/helper.dart';
import 'package:sikshyalaya/components/not_available.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';

class TeacherAssignment extends StatelessWidget {
  const TeacherAssignment({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StudentWrapper(
      pageName: "Assignment",
      child: RepositoryProvider(
        create: (context) => TeacherAssignmentRepository(),
        child: BlocProvider(
          create: (context) => TeacherAssignmentBloc(
            teacherAssignmentRepository:
                context.read<TeacherAssignmentRepository>(),
          )..add(
              GetTeacherAssignment(url: 'assignment'),
            ),
          child: body(context),
        ),
      ),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocBuilder<TeacherAssignmentBloc, TeacherAssignmentState>(
        buildWhen: (previous, current) => previous != current,
        builder: (context, state) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                margin: EdgeInsets.fromLTRB(size.width * 0.05,
                    size.height * 0.025, size.width * 0.05, 20),
                padding: EdgeInsets.all(5),
                width: size.width * 0.9,
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.surface,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: <Widget>[
                    Container(
                      margin: EdgeInsets.fromLTRB(0, 0, size.width * 0.3, 0),
                      child: Text("Add Assignment",
                          style: Theme.of(context).textTheme.caption),
                    ),
                    Container(
                        child: IconButton(
                            onPressed: () => Navigator.of(context).push(
                                  PageRouteBuilder(
                                    pageBuilder:
                                        (context, animation1, animation2) =>
                                            AddAssignment(),
                                    transitionDuration: Duration.zero,
                                    reverseTransitionDuration: Duration.zero,
                                  ),
                                ),
                            icon: Icon(Icons.add)))
                  ],
                ),
              ),
              Container(
                margin: const EdgeInsets.fromLTRB(20, 0, 0, 20),
                child:
                    Text("Due", style: Theme.of(context).textTheme.headline5),
              ),
              Flexible(
                child: state.tAssignmentList[0] == TAssignment.empty
                    ? NotAvailable(size: size, text: "No Assignments")
                    : ListView.builder(
                        itemCount: state.tAssignmentList.length,
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          return Assignments(
                            assignmentid: state.tAssignmentList[index].id ?? 0,
                            files: state.tAssignmentList[index].files ?? [],
                            courseCode: state
                                .tAssignmentList[index].course!.course_code!,
                            dueDate: dateHandler(state.tAssignmentList[index]
                                .due_date!)["completeDate"],
                            title: state.tAssignmentList[index].title!,
                            contents: state.tAssignmentList[index].contents!,
                            instructor: studentInstructor(
                                state.tAssignmentList[index].instructor!),
                          );
                        },
                      ),
              ),
            ],
          );
        });
  }
}
