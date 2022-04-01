import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/main.dart';

class Profile extends StatelessWidget {
  const Profile({
    Key? key,
    required this.size,
  }) : super(key: key);

  final Size size;
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Container(
          decoration:
              BoxDecoration(color: Theme.of(context).colorScheme.background),
          child: Column(children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  margin: const EdgeInsets.fromLTRB(8, 0, 0, 0),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(80), // Image border
                    child: SizedBox.fromSize(
                      size: const Size.fromRadius(85), // Image radius
                      child: Image.asset('assets/images/pp.jpg',
                          fit: BoxFit.contain),
                    ),
                  ),
                )
              ],
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  margin: EdgeInsets.fromLTRB(0, size.height * 0.018, 0, 0),
                  child: Text("Yugesh Upadhyaya Luitel",
                      style: Theme.of(context).textTheme.headline5),
                ),
                Container(
                  margin: EdgeInsets.fromLTRB(0, size.height * 0.018, 0, 0),
                  child: Text("Computer Science II/II",
                      style: Theme.of(context).textTheme.bodyText1),
                )
              ],
            ),
            Container(
              width: size.width * 0.95,
              height: size.height * 0.38,
              decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.surface,
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(15),
                    topRight: Radius.circular(15),
                  )),
              margin: EdgeInsets.fromLTRB(0, size.height * 0.04, 0, 0),
              child: Container(
                margin: EdgeInsets.fromLTRB(0, size.height * 0.02, 0, 0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                          width: size.width * 0.78,
                          height: size.height * 0.086,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                width: size.width * 0.1,
                                height: size.width * 0.1,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    color: Theme.of(context)
                                        .colorScheme
                                        .background),
                                child: const Icon(
                                  Icons.person,
                                  color: Color(0xFF000000),
                                ),
                              ),
                              SizedBox(
                                width: size.width * 0.55,
                                child: Text(
                                  "Personal Info",
                                  style: Theme.of(context).textTheme.headline6,
                                ),
                              ),
                              const Icon(
                                Icons.keyboard_arrow_right_rounded,
                                color: Color(0xFF000000),
                              ),
                            ],
                          ),
                        ),
                        SizedBox(
                          width: size.width * 0.78,
                          height: size.height * 0.086,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                width: size.width * 0.1,
                                height: size.width * 0.1,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    color: Theme.of(context)
                                        .colorScheme
                                        .background),
                                child: const Icon(
                                  Icons.lock,
                                  color: Color(0xFF000000),
                                ),
                              ),
                              SizedBox(
                                width: size.width * 0.55,
                                child: Text(
                                  "Change your password",
                                  style: Theme.of(context).textTheme.headline6,
                                ),
                              ),
                              const Icon(
                                Icons.keyboard_arrow_right_rounded,
                                color: Color(0xFF000000),
                              ),
                            ],
                          ),
                        ),
                        SizedBox(
                          width: size.width * 0.78,
                          height: size.height * 0.086,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                width: size.width * 0.1,
                                height: size.width * 0.1,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    color: Theme.of(context)
                                        .colorScheme
                                        .background),
                                child: const Icon(
                                  Icons.laptop_mac,
                                  color: Color(0xFF000000),
                                ),
                              ),
                              SizedBox(
                                width: size.width * 0.55,
                                child: Text(
                                  "Sessions",
                                  style: Theme.of(context).textTheme.headline6,
                                ),
                              ),
                              const Icon(
                                Icons.keyboard_arrow_right_rounded,
                                color: Color(0xFF000000),
                              ),
                            ],
                          ),
                        ),
                        SizedBox(
                          width: size.width * 0.78,
                          height: size.height * 0.086,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                width: size.width * 0.1,
                                height: size.width * 0.1,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    color: Theme.of(context)
                                        .colorScheme
                                        .background),
                                child: const Icon(
                                  Icons.subdirectory_arrow_right,
                                  color: Color(0xFF000000),
                                ),
                              ),
                              SizedBox(
                                width: size.width * 0.55,
                                child: Text(
                                  "Log Out",
                                  style: Theme.of(context).textTheme.headline6,
                                ),
                              ),
                              const Icon(
                                Icons.keyboard_arrow_right_rounded,
                                color: Color(0xFF000000),
                              ),
                            ],
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ),
            )
          ]),
        )
      ],
    );
  }
}
