import 'package:flutter/material.dart';
import 'package:sikshyalaya/components/CustomTextField.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';

import '../../components/CustomFilledButton.dart';

class ClassCreator extends StatelessWidget {
  const ClassCreator({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: true,
      bottom: true,
      child: Scaffold(body: body(context)),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Stack(
      children: <Widget>[
        ListView(
          padding: EdgeInsets.fromLTRB(0, size.width * 0.10, 0, 0),
          scrollDirection: Axis.vertical,
          children: <Widget>[
            Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                Container(
                  margin: EdgeInsets.fromLTRB(size.width * 0.05, 0, 0, 10),
                  alignment: Alignment.centerLeft,
                  child: Text("Class Creator",
                      style: Theme.of(context).textTheme.headline5),
                ),
                Container(
                  width: size.width * 0.80,
                  padding: const EdgeInsets.fromLTRB(0, 20, 0, 20),
                  margin: const EdgeInsets.fromLTRB(0, 10, 10, 20),
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.surface,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: <Widget>[
                      Container(
                        alignment: Alignment.centerLeft,
                        margin: EdgeInsets.fromLTRB(0, 0, 0, 8),
                        width: size.width * 0.8,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: <Widget>[
                            Container(
                              width: size.width * 0.2,
                              child: Text("Start time",
                                  style: Theme.of(context).textTheme.caption),
                            ),
                            Container(
                              child: Text("date picker"),
                            ),
                            Container(
                              child: Icon(Icons.timer_outlined),
                            )
                          ],
                        ),
                      ),
                      Container(
                        alignment: Alignment.centerLeft,
                        margin: EdgeInsets.fromLTRB(0, 0, 0, 8),
                        width: size.width * 0.8,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: <Widget>[
                            Container(
                              width: size.width * 0.2,
                              child: Text("End time",
                                  style: Theme.of(context).textTheme.caption),
                            ),
                            Container(
                              child: Text("date picker"),
                            ),
                            Container(
                              child: Icon(Icons.hourglass_bottom_rounded),
                            )
                          ],
                        ),
                      ),
                      Container(
                        alignment: Alignment.centerLeft,
                        margin: EdgeInsets.fromLTRB(0, 0, 0, 8),
                        width: size.width * 0.8,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: <Widget>[
                            Container(
                              width: size.width * 0.2,
                              child: Text("Group",
                                  style: Theme.of(context).textTheme.caption),
                            ),
                            Container(
                              child: Text("Dropdown"),
                            ),
                            Container(
                              width: size.width * 0.06,
                            ),
                          ],
                        ),
                      )
                    ],
                  ),
                )
              ],
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Container(
                  margin: EdgeInsets.fromLTRB(size.width * 0.05, 0, 0, 0),
                  alignment: Alignment.centerLeft,
                  child: Text("Description",
                      style: Theme.of(context).textTheme.headline5),
                ),
                Container(
                  child: CustomTextField(
                    margin: EdgeInsets.all(20),
                    height: size.height * 0.04,
                  ),
                )
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: size.width * 0.89,
                  margin: const EdgeInsets.fromLTRB(20, 10, 20, 0),
                  padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: const Color(0xFFB4B4B4)),
                  ),
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Container(
                          padding: const EdgeInsets.fromLTRB(0, 20, 0, 20),
                          child: Text('Session Files',
                              style: Theme.of(context).textTheme.headline5),
                        ),
                        Container(
                          margin: const EdgeInsets.fromLTRB(70, 0, 70, 0),
                          width: size.width * 0.5,
                          child: const CustomFilledButton(
                            colorType: Colors.black,
                            textColor: Colors.white,
                            buttonText: "Upload File(s)",
                          ),
                        ),
                      ]),
                ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: size.width * 0.89,
                  margin: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                  padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: const Color(0xFFB4B4B4)),
                  ),
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Container(
                          padding: const EdgeInsets.fromLTRB(0, 20, 0, 20),
                          child: Text('Add Instructor',
                              style: Theme.of(context).textTheme.headline5),
                        ),
                        Container(
                          margin: const EdgeInsets.fromLTRB(70, 0, 70, 0),
                          width: size.width * 0.5,
                          child: const CustomFilledButton(
                            colorType: Colors.black,
                            textColor: Colors.white,
                            buttonText: "Add",
                          ),
                        ),
                      ]),
                ),
              ],
            )
          ],
        ),
        Positioned(
          top: size.height * 0.02,
          right: 10,
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
        )
      ],
    );
  }
}
