import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/repository/models/student_dash.dart';
import 'package:sikshyalaya/repository/student_dash.dart';
import 'student_dashboard_bloc.dart';

class StudentDashboard extends StatelessWidget {
  const StudentDashboard({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return RepositoryProvider(
      create: (context) => StudentDashboardRepository(),
      child: BlocProvider(
        create: (context) => StudentDashboardBloc(
            studentDashboardRepository:
                context.read<StudentDashboardRepository>())
          ..add(
            GetStudentDash(url: 'class_session'),
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
        return ListView(
          children: <Widget>[
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
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            SizedBox(
                              width: size.width * 0.40,
                              child: Text(
                                'Ongoing',
                                style: Theme.of(context).textTheme.subtitle1,
                                textAlign: TextAlign.right,
                              ),
                            ),
                            SizedBox(
                              width: size.width * 0.40,
                              child: Text(
                                  state.ongoing.course?.course_code ?? '',
                                  style: Theme.of(context).textTheme.headline5),
                            ),
                            Container(
                              width: size.width * 0.40,
                              child: Text(
                                  state.ongoing.course?.course_name ?? '',
                                  style: Theme.of(context).textTheme.bodyText1),
                            ),
                            SizedBox(
                              width: size.width * 0.40,
                              child: Text(
                                studentInstructor(state.ongoing.instructor),
                                style: Theme.of(context).textTheme.subtitle1,
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
                            color: Theme.of(context).colorScheme.background),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Container(
                              child: Text(
                                dateHandler(
                                    state.ongoing.start_time ?? '')["hour"],
                                style: Theme.of(context).textTheme.headline1,
                              ),
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                Container(
                                  child: Text(
                                    dateHandler(state.ongoing.start_time ?? '')[
                                        "minute"],
                                    style:
                                        Theme.of(context).textTheme.headline3,
                                  ),
                                ),
                                Container(
                                  child: Text(
                                    dateHandler(
                                        state.ongoing.start_time ?? '')["ampm"],
                                    style:
                                        Theme.of(context).textTheme.headline3,
                                  ),
                                ),
                              ],
                            ),
                            Container(
                              child: Text(
                                dateHandler(
                                    state.ongoing.start_time ?? '')["day"],
                                style: Theme.of(context).textTheme.headline5,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ]
                  : <Widget>[],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Container(
                  margin: const EdgeInsets.fromLTRB(0, 30, 0, 0),
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
                  ? null
                  : ListView.builder(
                      physics: const NeverScrollableScrollPhysics(),
                      shrinkWrap: true,
                      itemCount: state.upcoming.length,
                      itemBuilder: (context, i) {
                        return Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Container(
                              margin: const EdgeInsets.fromLTRB(0, 15, 0, 20),
                              width: size.width * 0.90,
                              height: 100,
                              decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(25),
                                  color: Theme.of(context).colorScheme.surface),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Container(
                                    width: size.width * 0.48,
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
                                            studentInstructor(
                                                state.upcoming[i].instructor),
                                            style: Theme.of(context)
                                                .textTheme
                                                .subtitle2,
                                          ),
                                        )
                                      ],
                                    ),
                                  ),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.center,
                                    children: [
                                      const Icon(
                                        Icons.calendar_today,
                                        size: 20,
                                      ),
                                      Container(
                                        margin: const EdgeInsets.fromLTRB(
                                            8, 0, 20, 0),
                                        child: Text(
                                          dateHandler(
                                              state.upcoming[i].start_time ??
                                                  '')["completeDate"],
                                          style: Theme.of(context)
                                              .textTheme
                                              .subtitle2,
                                        ),
                                      )
                                    ],
                                  )
                                ],
                              ),
                            )
                          ],
                        );
                      }),
            ),
          ],
        );
      },
    );
  }

  String studentInstructor(instructors) {
    final List instructorNames = [];
    if (instructors.length > 0) {
      instructors.forEach((element) => instructorNames.add(element.full_name));
      return instructorNames.join(' and ');
    }
    return '';
  }

  Map dateHandler(String dateTime) {
    String hour = "";
    String minute = "";
    String ampm = "";
    int day;
    String weekDay = "";
    DateTime? dateTimeParsed;
    String completeDate = "";

    dateTimeParsed = DateTime.tryParse(dateTime);

    if (dateTimeParsed != null) {
      if (dateTimeParsed.hour > 12) {
        hour = (dateTimeParsed.hour - 12).toString().padLeft(2, '0');
        minute = dateTimeParsed.minute.toString().padLeft(2, '0');
        ampm = "PM";
        day = dateTimeParsed.weekday;
      } else {
        hour = dateTimeParsed.hour.toString().padLeft(2, '0');
        minute = dateTimeParsed.minute.toString().padLeft(2, '0');
        ampm = "AM";
        day = dateTimeParsed.weekday;
      }

      switch (day) {
        case 1:
          weekDay = "Monday";
          break;

        case 2:
          weekDay = "Tuesday";
          break;

        case 3:
          weekDay = "Wednesday";
          break;

        case 4:
          weekDay = "Thursday";
          break;

        case 5:
          weekDay = "Friday";
          break;

        case 6:
          weekDay = "Saturday";
          break;

        case 7:
          weekDay = "Sunday";
          break;

        default:
          weekDay = "";
          break;
      }

      completeDate = '$weekDay, $hour:$minute $ampm';
    }

    return {
      "hour": hour,
      "minute": minute,
      "ampm": ampm,
      "day": weekDay,
      "completeDate": completeDate,
    };
  }
}
