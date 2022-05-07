import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/components/CustomFilledButton.dart';
import 'package:sikshyalaya/components/not_available.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/repository/models/submitted_assignment.dart';
import 'package:sikshyalaya/repository/teacher_assignment_review.dart';
import 'package:sikshyalaya/screens/Assignment/Teacher-Assignment/AssignmentReviewCard.dart';
import 'package:sikshyalaya/screens/Assignment/Teacher-Assignment/teacher_assignment_review_bloc.dart';
import 'package:url_launcher/url_launcher.dart';

class TAssignmentReview extends StatelessWidget {
  final String? title;
  final String? dueDate;
  final String? contents;
  final List<String>? files;
  final int? assignmentId;

  const TAssignmentReview({
    required this.assignmentId,
    required this.title,
    required this.dueDate,
    required this.contents,
    required this.files,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    print(files);
    Size size = MediaQuery.of(context).size;
    return BlocProvider(
      create: (context) => TeacherAssignmentReviewBloc(
        assignmentId: assignmentId!,
        teacherAssignmentReviewRepository: TeacherAssignmentReviewRepository(
          token: context.read<AuthBloc>().state.token,
        ),
      ),
      child: newMethod(context, size),
    );
  }

  Widget newMethod(BuildContext context, Size size) {
    return BlocBuilder<TeacherAssignmentReviewBloc,
        TeacherAssignmentReviewState>(
      builder: (context, state) {
        return SafeArea(
          child: Scaffold(
            body: Container(
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
                              Container(
                                width: size.width * 0.9,
                                padding: EdgeInsets.symmetric(
                                  vertical: 10,
                                ),
                                child: Text(
                                  title!,
                                  style: Theme.of(context).textTheme.headline4,
                                ),
                              ),
                              Container(
                                padding: EdgeInsets.symmetric(
                                  vertical: 10,
                                ),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Container(
                                      child: Text(
                                        dueDate!,
                                        style: Theme.of(context)
                                            .textTheme
                                            .subtitle1,
                                      ),
                                    ),
                                    Container(
                                        child: state.reviewList[0] ==
                                                SubmittedAssignment.empty
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
                            top: size.height * 0.04,
                            bottom: size.height * 0.02),
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
                              Container(),
                            ]),
                      ),
                    ],
                  ),
                  state.isLoaded
                      ? state.reviewList.isNotEmpty
                          ? ListView.builder(
                              physics: const NeverScrollableScrollPhysics(),
                              shrinkWrap: true,
                              itemCount: state.reviewList.length,
                              itemBuilder: (context, i) {
                                return AssignmentReviewCard(
                                  id: state.reviewList[i].id!,
                                  profile_image: state.reviewList[i].student!
                                          .profile_image ??
                                      "",
                                  assignment_id: assignmentId!,
                                  files: state.reviewList[i].files ?? [""],
                                  studentName:
                                      state.reviewList[i].student!.full_name!,
                                );
                              })
                          : Container(
                              alignment: Alignment.center,
                              child: CircularProgressIndicator())
                      : NotAvailable(size: size, text: "No attempts yet")
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
