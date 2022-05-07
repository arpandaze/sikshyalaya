import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/components/not_available.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/helpers/helper.dart';
import 'package:sikshyalaya/repository/models/student_dash.dart';
import 'package:sikshyalaya/repository/student_dash.dart';
import 'package:sikshyalaya/screens/Dashboard/resource_viewer.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'student_dashboard_bloc.dart';

class StudentDashboard extends StatelessWidget {
  const StudentDashboard({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StudentWrapper(
      pageName: "Dashboard",
      child: BlocProvider(
        create: (context) => StudentDashboardBloc(
          studentDashboardRepository: StudentDashboardRepository(
              token: context.read<AuthBloc>().state.token),
        ),
        child: body(context),
      ),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocBuilder<StudentDashboardBloc, StudentDashboardState>(
      buildWhen: (((previous, current) => (previous != current))),
      builder: (context, state) {
        if (state.isLoaded) {
          return ListView(
            padding: const EdgeInsets.fromLTRB(0, 10, 0, 20),
            children: <Widget>[
              Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: state.ongoing != ClassSession.empty
                        ? <Widget>[
                            Container(
                              width: size.width * 0.50,
                              height: 200,
                              decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(25),
                                  color: Theme.of(context).colorScheme.primary),
                              child: Column(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: [
                                  SizedBox(
                                    width: size.width * 0.40,
                                    child: Text(
                                      'Ongoing',
                                      style:
                                          Theme.of(context).textTheme.subtitle1,
                                      textAlign: TextAlign.right,
                                    ),
                                  ),
                                  SizedBox(
                                    width: size.width * 0.40,
                                    child: Text(
                                        state.ongoing.course?.course_code ?? '',
                                        style: Theme.of(context)
                                            .textTheme
                                            .headline5),
                                  ),
                                  Container(
                                    width: size.width * 0.40,
                                    child: Text(
                                        state.ongoing.course?.course_name ?? '',
                                        style: Theme.of(context)
                                            .textTheme
                                            .bodyText1),
                                  ),
                                  SizedBox(
                                    width: size.width * 0.40,
                                    child: Text(
                                      studentInstructor(
                                          state.ongoing.instructor),
                                      style:
                                          Theme.of(context).textTheme.subtitle1,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Container(
                              width: size.width * 0.40,
                              height: 200,
                              decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(25),
                                  color:
                                      Theme.of(context).colorScheme.background),
                              child: Column(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Container(
                                    child: Text(
                                      dateHandler(state.ongoing.start_time ??
                                          '')["hour"],
                                      style:
                                          Theme.of(context).textTheme.headline1,
                                    ),
                                  ),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceEvenly,
                                    children: [
                                      Container(
                                        child: Text(
                                          dateHandler(
                                              state.ongoing.start_time ??
                                                  '')["minute"],
                                          style: Theme.of(context)
                                              .textTheme
                                              .headline3,
                                        ),
                                      ),
                                      Container(
                                        child: Text(
                                          dateHandler(
                                              state.ongoing.start_time ??
                                                  '')["ampm"],
                                          style: Theme.of(context)
                                              .textTheme
                                              .headline3,
                                        ),
                                      ),
                                    ],
                                  ),
                                  Container(
                                    child: Text(
                                      dateHandler(state.ongoing.start_time ??
                                          '')["day"],
                                      style:
                                          Theme.of(context).textTheme.headline5,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ]
                        : <Widget>[
                            NotAvailable(
                                size: size, text: "No Ongoing Class Found")
                          ],
                  ),
                  Container(
                    height: state.ongoing != ClassSession.empty
                        ? size.height * 0.07
                        : 0,
                    child: state.ongoing != ClassSession.empty
                        ? GestureDetector(
                            onTap: () => {
                              // context
                              //     .read<StudentDashboardBloc>()
                              //     .add(GetStudentDash()),
                              Navigator.of(context).push(
                                PageRouteBuilder(
                                  pageBuilder:
                                      (context, animation1, animation2) =>
                                          ResourceViewer(
                                    classid: state.ongoing.id,
                                    title:
                                        state.ongoing.course?.course_name ?? '',
                                    description:
                                        state.ongoing.description ?? '',
                                    instructors: studentInstructor(
                                        state.ongoing.instructor),
                                    courseCode:
                                        state.ongoing.course?.course_code ?? '',
                                  ),
                                  transitionDuration: Duration.zero,
                                  reverseTransitionDuration: Duration.zero,
                                ),
                              ),
                            },
                            child: Container(
                              decoration: BoxDecoration(
                                  border: Border.all(
                                      color: Theme.of(context)
                                          .colorScheme
                                          .background)),
                              width: size.width * 0.90,
                              alignment: Alignment.center,
                              child: Text("View Resources",
                                  style: Theme.of(context).textTheme.subtitle1),
                            ),
                          )
                        : null,
                  ),
                  Divider(
                    color: Colors.grey,
                  )
                ],
              ),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Container(
                    margin: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                    child: Text(
                      'Upcoming Classes',
                      style: Theme.of(context).textTheme.headline4,
                    ),
                  ),
                  Container(
                    width: size.width * 0.3,
                  )
                ],
              ),
              // ListView.builder(
              //   itemCount: 6,
              //   itemBuilder: (context, i) {
              //     return Text('${i}th Box');
              //   },
              // ),
              SizedBox(
                child: state.upcoming[0] == ClassSession.empty
                    ? NotAvailable(
                        size: size, text: "No Upcoming Classess Found")
                    : ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        shrinkWrap: true,
                        itemCount: state.upcoming.length,
                        itemBuilder: (context, i) {
                          return GestureDetector(
                            onTap: () => {
                              Navigator.of(context).push(
                                PageRouteBuilder(
                                  pageBuilder:
                                      (context, animation1, animation2) =>
                                          ResourceViewer(
                                    classid: state.upcoming[i].id,
                                    title:
                                        state.upcoming[i].course?.course_name ??
                                            '',
                                    description:
                                        state.upcoming[i].description ?? '',
                                    instructors: studentInstructor(
                                        state.upcoming[i].instructor),
                                    courseCode:
                                        state.upcoming[i].course?.course_code ??
                                            '',
                                  ),
                                  transitionDuration: Duration.zero,
                                  reverseTransitionDuration: Duration.zero,
                                ),
                              ),
                            },
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                Container(
                                  margin:
                                      const EdgeInsets.fromLTRB(0, 15, 0, 0),
                                  width: size.width * 0.90,
                                  height: 100,
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(25),
                                      color: Theme.of(context)
                                          .colorScheme
                                          .surface),
                                  child: Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Container(
                                        width: size.width * 0.45,
                                        
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceEvenly,
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Container(
                                              margin: const EdgeInsets.fromLTRB(
                                                  20, 0, 0, 0),
                                              child: Text(
                                                state.upcoming[i].course!
                                                        .course_code ??
                                                    '',
                                                style: Theme.of(context)
                                                    .textTheme
                                                    .headline5,
                                              ),
                                            ),
                                            Container(
                                              margin: const EdgeInsets.fromLTRB(
                                                  20, 0, 0, 0),
                                              child: Text(
                                                studentInstructor(state
                                                    .upcoming[i].instructor),
                                                style: Theme.of(context)
                                                    .textTheme
                                                    .subtitle2,
                                              ),
                                            )
                                          ],
                                        ),
                                      ),
                                      Container(
                                        padding: EdgeInsets.only(right: 10),
                                        alignment: Alignment.centerLeft,
                                        child: Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          crossAxisAlignment:
                                              CrossAxisAlignment.center,
                                          children: [
                                            const Icon(
                                              Icons.calendar_today,
                                              size: 20,
                                            ),
                                            Container(
                                              padding:
                                                  EdgeInsets.only(left: 10),

                                              // margin: const EdgeInsets.fromLTRB(
                                              //     8, 0, 20, 0),
                                              child: Text(
                                                dateHandler(state.upcoming[i]
                                                        .start_time ??
                                                    '')["completeDate"],
                                                style: Theme.of(context)
                                                    .textTheme
                                                    .subtitle2,
                                              ),
                                            )
                                          ],
                                        ),
                                      )
                                    ],
                                  ),
                                )
                              ],
                            ),
                          );
                        }),
              ),
            ],
          );
        } else {
          return Container(
            alignment: Alignment.center,
            child: CircularProgressIndicator(),
          );
        }
      },
    );
  }
}
