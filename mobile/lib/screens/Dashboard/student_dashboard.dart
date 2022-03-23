import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class StudentDashboard extends StatelessWidget {
  const StudentDashboard({
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
              width: size.width * 0.50,
              height: 200,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(25),
                  color: Theme.of(context).colorScheme.primary),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Container(
                    width: size.width * 0.40,
                    child: Text(
                      'Ongoing',
                      style: Theme.of(context).textTheme.headline6,
                      textAlign: TextAlign.right,
                    ),
                  ),
                  Container(
                    width: size.width * 0.40,
                    child: Text(
                      'COMP 204',
                      style: Theme.of(context).textTheme.headline5,
                    ),
                  ),
                  Container(
                    width: size.width * 0.40,
                    child: Text(
                      'Microprocessor and Assembly Language',
                      style: Theme.of(context).textTheme.headline6,
                    ),
                  ),
                  Container(
                    width: size.width * 0.40,
                    child: Text(
                      'Dr. Gajendra Sharma',
                      style: Theme.of(context).textTheme.headline6,
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
                  color: Theme.of(context).colorScheme.surface),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Container(
                    child: Text(
                      "11",
                      style: Theme.of(context).textTheme.headline2,
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Container(
                        child: Text(
                          "45",
                          style: Theme.of(context).textTheme.headline4,
                        ),
                      ),
                      Container(
                        child: Text(
                          "PM",
                          style: Theme.of(context).textTheme.headline4,
                        ),
                      ),
                    ],
                  ),
                  Container(
                    child: Text(
                      "Sunday",
                      style: Theme.of(context).textTheme.headline5,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Container(
              margin: const EdgeInsets.fromLTRB(0, 30, 0, 0),
              child: Text(
                'Upcomming Classes',
                style: Theme.of(context).textTheme.headline5,
              ),
            ),
            Container(
              width: size.width * 0.3,
            )
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Container(
              margin: const EdgeInsets.fromLTRB(0, 15, 0, 0),
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
                          'COMP 207',
                          style: Theme.of(context).textTheme.headline5,
                        ),
                      ),
                      Container(
                        margin: EdgeInsets.fromLTRB(20, 0, 0, 0),
                        child: Text(
                          'Dr. Satyendra Lohani',
                          style: Theme.of(context).textTheme.headline6,
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
                        margin: EdgeInsets.fromLTRB(8, 0, 20, 0),
                        child: Text(
                          'Today 8:45 am',
                          style: Theme.of(context).textTheme.headline6,
                        ),
                      )
                    ],
                  )
                ],
              ),
            )
          ],
        ),
      ],
    );
  }
}
