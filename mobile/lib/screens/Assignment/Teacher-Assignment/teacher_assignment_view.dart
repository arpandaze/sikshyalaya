import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/components/CustomFilledButton.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/screens/Assignment/Teacher-Assignment/teacher_assignment_review.dart';
import 'package:url_launcher/url_launcher.dart';

class TAssignmentView extends StatelessWidget {
  final String? title;
  final int? assignmentId;
  final String? dueDate;
  final String? contents;
  final List<String>? files;

  const TAssignmentView({
    required this.assignmentId,
    required this.title,
    required this.dueDate,
    required this.contents,
    required this.files,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final _files = jsonDecode(files.toString());

    print(files);
    Size size = MediaQuery.of(context).size;
    return SafeArea(
      top: true,
      bottom: true,
      child: Scaffold(
        body: Stack(
          alignment: Alignment.center,
          children: <Widget>[
            ListView(
              padding: EdgeInsets.fromLTRB(0, size.width * 0.10, 0, 0),
              scrollDirection: Axis.vertical,
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Container(
                      width: size.width * 0.8,
                      alignment: Alignment.topLeft,
                      padding: const EdgeInsets.fromLTRB(20, 20, 0, 20),
                      child: Text(title!,
                          style: Theme.of(context).textTheme.headline5),
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
                      width: size.width * 0.92,
                      alignment: Alignment.topLeft,
                      padding: const EdgeInsets.fromLTRB(15, 20, 10, 20),
                      child: Column(
                        children: <Widget>[
                          Row(
                            children: [
                              Container(
                                alignment: Alignment.topLeft,
                                child: Text("Due on:",
                                    style: TextStyle(
                                        color: Colors.black,
                                        fontSize: 12,
                                        fontWeight: FontWeight.w500)),
                              ),
                              Container(
                                alignment: Alignment.topLeft,
                                child: Text(" ${dueDate!}",
                                    style: TextStyle(
                                        color: Colors.black,
                                        fontSize: 12,
                                        fontWeight: FontWeight.w800)),
                              ),
                            ],
                          ),
                          Container(
                              margin: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                              child: Text(
                                contents!,
                                style: Theme.of(context).textTheme.bodyText1,
                              )),
                          Container(
                            // decoration: BoxDecoration(
                            // //     border: Border.all(color: Colors.black)),
                            // padding: EdgeInsets.symmetric(
                            //     vertical: 10, horizontal: 0),
                            child: (ListView.builder(
                              physics: const NeverScrollableScrollPhysics(),
                              // padding: const EdgeInsets.fromLTRB(10, 10, 20, 10),
                              shrinkWrap: true,
                              itemCount: _files == null ? 0 : _files!.length,
                              itemBuilder: (BuildContext context, int index) {
                                return Container(
                                  margin: EdgeInsets.only(top: 10),
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(10),
                                      border: Border.all(
                                        color: Color.fromARGB(195, 244, 67, 54),
                                      )),
                                  padding: EdgeInsets.fromLTRB(5, 10, 0, 10),
                                  child: _files == null && _files!.length == 0
                                      ? null
                                      : GestureDetector(
                                          onTap: () => _launchUrl(
                                              '$fileServerBase/${_files![index]}'),
                                          child: AbsorbPointer(
                                            child: Container(
                                              // width: size.width,
                                              child: Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceEvenly,
                                                children: [
                                                  Container(
                                                    padding: EdgeInsets.only(
                                                        right: 10),
                                                    // decoration: BoxDecoration(
                                                    //     border: Border.all(
                                                    //         color: Color.fromARGB(
                                                    //             255, 26, 25, 25))),
                                                    child: Container(
                                                      child: iconPicker(
                                                          _files![index]["name"]
                                                              .split(".")[1]),
                                                    ),
                                                  ),
                                                  Container(
                                                    width: size.width * 0.7,
                                                    child: Text(
                                                      '${_files[index]["name"]}',
                                                      style: (Theme.of(context)
                                                              .textTheme
                                                              .caption)!
                                                          .merge(TextStyle(
                                                              color: Theme.of(
                                                                      context)
                                                                  .colorScheme
                                                                  .primary)),
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                );
                              },
                            )),
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
                      width: size.width * 0.89,
                      margin: const EdgeInsets.fromLTRB(20, 20, 20, 0),
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
                              child: Text('Review Submissions',
                                  style: Theme.of(context).textTheme.headline6),
                            ),
                            GestureDetector(
                              onTap: () => Navigator.of(context).push(
                                PageRouteBuilder(
                                  pageBuilder:
                                      (context, animation1, animation2) =>
                                          TAssignmentReview(
                                    title: title,
                                    dueDate: dueDate,
                                    contents: contents,
                                    files: files,
                                    assignmentId: assignmentId,
                                  ),
                                ),
                              ),
                              child: AbsorbPointer(
                                child: Container(
                                  margin:
                                      const EdgeInsets.fromLTRB(70, 0, 70, 0),
                                  width: size.width * 0.5,
                                  child: const CustomFilledButton(
                                    colorType: Colors.black,
                                    textColor: Colors.white,
                                    buttonText: "Review",
                                  ),
                                ),
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
        ),
      ),
    );
  }

  Widget iconPicker(String filetype) {
    switch (filetype) {
      case "pdf":
        print("lmao");
        return SvgPicture.asset(
          "assets/images/pdf.svg",
          fit: BoxFit.cover,
          height: 20,
          color: Color.fromARGB(195, 244, 67, 54),
        );
      case ("docx"):
        return SvgPicture.asset(
          "assets/images/doc.svg",
          height: 20,
          color: Color.fromARGB(195, 244, 67, 54),
        );
      case "pptx":
        return SvgPicture.asset(
          "assets/images/ppt.svg",
          height: 20,
          color: Color.fromARGB(195, 244, 67, 54),
        );
      case "xlsx":
        return SvgPicture.asset(
          "assets/images/xls.svg",
          color: Color.fromARGB(195, 244, 67, 54),
          height: 20,
        );
      case "zip":
        return SvgPicture.asset(
          "assets/images/zip.svg",
          color: Color.fromARGB(195, 244, 67, 54),
          height: 20,
        );
      default:
        return SvgPicture.asset(
          "assets/images/file.svg",
          color: Color.fromARGB(195, 244, 67, 54),
          height: 25,
          fit: BoxFit.cover,
        );
    }
  }

  _launchUrl(String url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }
}
