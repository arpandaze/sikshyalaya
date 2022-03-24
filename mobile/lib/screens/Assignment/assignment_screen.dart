import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/components/nav_bar.dart';
import 'package:sikshyalaya/components/top_bar.dart';
import 'assignment_submission.dart';

class AssignmentScreen extends StatelessWidget {
  const AssignmentScreen({
    Key? key,
    required this.size,
  }) : super(key: key);

  final Size size;
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Row(
          children: <Widget>[
            Container(
              // top: size.height * 0.1,
              // left: size.width * 0.5,
              margin: const EdgeInsets.fromLTRB(20, 0, 0, 0),
              child: Text("Due", style: Theme.of(context).textTheme.headline5),
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            GestureDetector(
                onTap: () => {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) =>
                                  AssignmentSubmission(size: size)))
                    },
                child: Container(
                  margin: const EdgeInsets.fromLTRB(0, 30, 0, 0),
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
                ))
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            GestureDetector(
                onTap: () => {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) =>
                                  AssignmentSubmission(size: size)))
                    },
                child: Container(
                  margin: const EdgeInsets.fromLTRB(0, 10, 0, 0),
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
                ))
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            GestureDetector(
                onTap: () => {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) =>
                                  AssignmentSubmission(size: size)))
                    },
                child: Container(
                  margin: const EdgeInsets.fromLTRB(0, 10, 0, 0),
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
                ))
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            GestureDetector(
                onTap: () => {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) =>
                                  AssignmentSubmission(size: size)))
                    },
                child: Container(
                  margin: const EdgeInsets.fromLTRB(0, 10, 0, 0),
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
                ))
          ],
        ),
      ],
    );
  }
}
