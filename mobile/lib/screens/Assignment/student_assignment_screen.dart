import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/screens/Assignment/student_assignment_bloc.dart';
import 'package:sikshyalaya/repository/student_assignment.dart';
import 'package:sikshyalaya/repository/models/student_assignment.dart';
import 'package:sikshyalaya/screens/Assignment/components/Assignments.dart';
import 'package:sikshyalaya/helpers/helper.dart';
import 'package:sikshyalaya/components/not_available.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';


class AssignmentScreen extends StatelessWidget {
  const AssignmentScreen({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StudentWrapper(
      pageName: "Assignment",
      child: BlocProvider(
        create: (context) => StudentAssignmentBloc(
          studentAssignmentRepository: StudentAssignmentRepository(
              token: context.read<AuthBloc>().state.token),
        ),
        child: body(context),
      ),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocBuilder<StudentAssignmentBloc, StudentAssignmentState>(
      buildWhen: (previous, current) => previous != current,
      builder: (context, state) {
        if (state.isLoaded) {
          // return Column(
          //   crossAxisAlignment: CrossAxisAlignment.start,
          //   children: [
          //     Container(
          //       margin: const EdgeInsets.fromLTRB(20, 0, 0, 20),
          //       child:
          //           Text("Due", style: Theme.of(context).textTheme.headline5),
          //     ),
          //     Flexible(
          //       child: state.assignmentList[0] == Assignment.empty
          //           ? NotAvailable(size: size, text: "No Assignments")
          //           : ListView.builder(
          //               itemCount: state.dueAssignmentList.length,
          //               shrinkWrap: true,
          //               itemBuilder: (context, index) {
          //                 return Assignments(
          //                   assignmentId: state.dueAssignmentList[index].id,
          //                   courseCode: state
          //                       .dueAssignmentList[index].course!.course_code!,
          //                   dueDate: dateHandler(state.dueAssignmentList[index]
          //                       .due_date!)["completeDate"],
          //                   title: state.dueAssignmentList[index].title!,
          //                   contents: state.dueAssignmentList[index].contents!,
          //                   instructor: studentInstructor(
          //                       state.dueAssignmentList[index].instructor!),
          //                   files: state.assignmentList[index].files ?? [],
          //                 );
          //               },
          //             ),
          //     ),
          //     Container(
          //       margin: const EdgeInsets.fromLTRB(20, 0, 0, 20),
          //       child: Text("Missing",
          //           style: Theme.of(context).textTheme.headline5),
          //     ),
          //     Flexible(
          //       child: state.assignmentList[0] == Assignment.empty
          //           ? NotAvailable(size: size, text: "No Assignments")
          //           : ListView.builder(
          //               itemCount: state.dueAssignmentList.length,
          //               shrinkWrap: true,
          //               itemBuilder: (context, index) {
          //                 return Assignments(
          //                   assignmentId: state.dueAssignmentList[index].id,
          //                   courseCode: state
          //                       .dueAssignmentList[index].course!.course_code!,
          //                   dueDate:
          //                       "${dateHandler(state.dueAssignmentList[index].due_date!)["passedDays"]} days ago",
          //                   title: state.dueAssignmentList[index].title!,
          //                   contents: state.dueAssignmentList[index].contents!,
          //                   instructor: studentInstructor(
          //                       state.dueAssignmentList[index].instructor!),
          //                   files: state.assignmentList[index].files ?? [],
          //                 );
          //               },
          //             ),
          //     ),
          //     Container(
          //       margin: const EdgeInsets.fromLTRB(20, 0, 0, 20),
          //       child:
          //           Text("Due", style: Theme.of(context).textTheme.headline5),
          //     ),
          //     Flexible(
          //       child: state.assignmentList[0] == Assignment.empty
          //           ? NotAvailable(size: size, text: "No Assignments")
          //           : ListView.builder(
          //               itemCount: state.dueAssignmentList.length,
          //               shrinkWrap: true,
          //               itemBuilder: (context, index) {
          //                 return Assignments(
          //                   assignmentId: state.dueAssignmentList[index].id,
          //                   courseCode: state
          //                       .dueAssignmentList[index].course!.course_code!,
          //                   dueDate: dateHandler(state.dueAssignmentList[index]
          //                       .due_date!)["completeDate"],
          //                   title: state.dueAssignmentList[index].title!,
          //                   contents: state.dueAssignmentList[index].contents!,
          //                   instructor: studentInstructor(
          //                       state.dueAssignmentList[index].instructor!),
          //                   files: state.assignmentList[index].files ?? [],
          //                 );
          //               },
          //             ),
          //     ),
          //   ],
          // );
          return SingleChildScrollView(
              physics: BouncingScrollPhysics(),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 0, 0, 20),
                    child: Text("Due",
                        style: Theme.of(context).textTheme.headline5),
                  ),
                  state.dueAssignmentList[0] == Assignment.empty
                      ? NotAvailable(
                          size: size, text: "No Due Assignments !! ;)")
                      : ListView.builder(
                          physics: NeverScrollableScrollPhysics(),
                          itemCount: state.dueAssignmentList.length,
                          shrinkWrap: true,
                          itemBuilder: (context, index) {
                            return Assignments(
                              assignmentid: state.dueAssignmentList[index].id!,
                              courseCode: state.dueAssignmentList[index].course!
                                  .course_code!,
                              dueDate: dateHandler(state
                                  .dueAssignmentList[index]
                                  .due_date!)["completeDate"],
                              title: state.dueAssignmentList[index].title!,
                              contents:
                                  state.dueAssignmentList[index].contents!,
                              instructor: studentInstructor(
                                  state.dueAssignmentList[index].instructor!),
                              files: state.dueAssignmentList[index].files ?? [],
                            );
                          },
                        ),
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 20, 0, 20),
                    child: Text("Missing",
                        style: Theme.of(context).textTheme.headline5),
                  ),
                  state.missedAssignmentList[0] == Assignment.empty
                      ? NotAvailable(
                          size: size, text: "No Missing Assignments ! :)")
                      : ListView.builder(
                          physics: NeverScrollableScrollPhysics(),
                          itemCount: state.missedAssignmentList.length,
                          shrinkWrap: true,
                          itemBuilder: (context, index) {
                            return Assignments(
                              assignmentid:
                                  state.missedAssignmentList[index].id!,
                              courseCode: state.missedAssignmentList[index]
                                  .course!.course_code!,
                              dueDate:
                                  "${dateHandler(state.missedAssignmentList[index].due_date!)["passedDays"]}",
                              title: state.missedAssignmentList[index].title!,
                              contents:
                                  state.missedAssignmentList[index].contents!,
                              instructor: studentInstructor(state
                                  .missedAssignmentList[index].instructor!),
                              files:
                                  state.missedAssignmentList[index].files ?? [],
                            );
                          },
                        ),
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 20, 0, 20),
                    child: Text("Submitted",
                        style: Theme.of(context).textTheme.headline5),
                  ),
                  state.submittedAssignmentList[0] == Assignment.empty
                      ? NotAvailable(
                          size: size, text: "No Submitted Assignments")
                      : ListView.builder(
                          physics: NeverScrollableScrollPhysics(),
                          itemCount: state.submittedAssignmentList.length,
                          shrinkWrap: true,
                          itemBuilder: (context, index) {
                            return Assignments(
                              submitted: true,
                              assignmentid:
                                  state.submittedAssignmentList[index].id!,
                              courseCode: state.submittedAssignmentList[index]
                                  .course!.course_code!,
                              dueDate: dateHandler(state
                                  .submittedAssignmentList[index]
                                  .due_date!)["completeDate"],
                              title:
                                  state.submittedAssignmentList[index].title!,
                              contents: state
                                  .submittedAssignmentList[index].contents!,
                              instructor: studentInstructor(state
                                  .submittedAssignmentList[index].instructor!),
                              files:
                                  state.submittedAssignmentList[index].files ??
                                      [],
                            );
                          },
                        ),
                ],
              ));
        } else {
          return Container(
              alignment: Alignment.center, child: CircularProgressIndicator());
        }
      },
    );
  }
}
