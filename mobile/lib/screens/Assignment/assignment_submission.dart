import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/components/nav_bar.dart';
import 'package:sikshyalaya/components/top_bar.dart';

class AssignmentSubmission extends StatelessWidget {
  const AssignmentSubmission({
    Key? key,
    required this.size,
  }) : super(key: key);

  final Size size;
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: true,
      bottom: true,
      child: Scaffold(
        backgroundColor: Theme.of(context).colorScheme.background,
        body: SizedBox(
          width: double.infinity,
          height: size.height,
          child: Stack(
            alignment: Alignment.center,
            children: <Widget>[
              Container(
                padding: EdgeInsets.fromLTRB(
                    0, size.height * 0.04, 0, size.height * 0.12),
                child: ListView(
                  children: <Widget>[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Container(
                          width: size.width * 0.8,
                          alignment: Alignment.topLeft,
                          padding: const EdgeInsets.fromLTRB(20, 20, 0, 20),
                          child: Text("COMP 207 Assignment II",
                              style: Theme.of(context).textTheme.headline4),
                        ),
                        Container(
                          width: size.width * 0.14,
                        )
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(25),
                              color: Theme.of(context).colorScheme.surface),
                          width: size.width * 0.9,
                          margin: const EdgeInsets.fromLTRB(20, 0, 20, 0),
                          alignment: Alignment.topLeft,
                          padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
                          child: Column(
                            children: <Widget>[
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text("Due April 1st",
                                      style: Theme.of(context)
                                          .textTheme
                                          .subtitle2),
                                  Text(
                                    "Assigned",
                                    style:
                                        Theme.of(context).textTheme.subtitle2,
                                  )
                                ],
                              ),
                              Container(
                                  margin:
                                      const EdgeInsets.fromLTRB(0, 30, 0, 20),
                                  child: Text(
                                    "Virus Corona (COVID-19) yang menyerang manusia muncul di negara… pada awaltahun 2020.Virus Corona (COVID-19) yang menyerang manusia muncul di negara… pada awaltahun 2020.Virus Corona (COVID-19) yang menyerang manusia muncul di negara… pada awaltahun 2020.",
                                    style:
                                        Theme.of(context).textTheme.bodyText1,
                                  )),
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Image.asset(
                                    "assets/images/logo.png",
                                    width: 150,
                                    height: 150,
                                  ),
                                  Image.asset(
                                    "assets/images/logo.png",
                                    width: 150,
                                    height: 150,
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: size.width * 0.9,
                          height: size.height * 0.2,
                          margin: const EdgeInsets.fromLTRB(20, 20, 20, 0),
                          padding: const EdgeInsets.fromLTRB(20, 10, 20, 20),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(
                                color: Theme.of(context).colorScheme.surface),
                          ),
                          child: Column(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: <Widget>[
                                Text('Your Work',
                                    style:
                                        Theme.of(context).textTheme.headline5),
                                Container(
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(10),
                                      color: Theme.of(context)
                                          .colorScheme
                                          .onBackground),
                                  margin:
                                      const EdgeInsets.fromLTRB(80, 20, 20, 0),
                                  padding:
                                      const EdgeInsets.fromLTRB(50, 10, 50, 20),
                                  child: Text('Upload file',
                                      textAlign: TextAlign.center,
                                      style:
                                          Theme.of(context).textTheme.button),
                                ),
                              ]),
                        ),
                      ],
                    )
                  ],
                ),
              ),
              //TopBar

              //NavBar
              Positioned(bottom: 0, left: 0, child: NavBar(size: size))
            ],
          ),
        ),
      ),
    );
  }
}
