import 'dart:convert';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/repository/teacher_quiz.dart';
import 'package:sikshyalaya/screens/Teacher-Quiz/teacher_quiz_bloc.dart';
import 'package:sikshyalaya/screens/Teacher-Quiz/teacher_quiz_review.dart';
import 'package:url_launcher/url_launcher.dart';

class AssignmentReviewCard extends StatefulWidget {
  const AssignmentReviewCard({
    Key? key,
    required this.id,
    required this.files,
    required this.profile_image,
    required this.assignment_id,
    required this.studentName,
    this.isLoadedTeacher = false,
    
  }) : super(key: key);
  final int id;
  final int assignment_id;
  final String studentName;
  final String profile_image;
  final List<String> files;
  final bool isLoadedTeacher;

  @override
  State<AssignmentReviewCard> createState() => _AssignmentReviewCardState();
}

class _AssignmentReviewCardState extends State<AssignmentReviewCard> {
  var _visible = false;

  @override
  Widget build(BuildContext context) {
    final _files = jsonDecode(widget.files.toString());
    print(_files);
    print(_files[0]["name"].split(".")[1]);
    Size size = MediaQuery.of(context).size;
    return Container(
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        border: Border(
            bottom: BorderSide(
          width: 1.0,
          color: Color.fromARGB(255, 214, 213, 213),
        )),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            Container(
                child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: EdgeInsets.only(right: 10),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(50), // Image border
                    child: SizedBox.fromSize(
                      size: const Size.fromRadius(18), // Image radius
                      child: getProfileImage(widget.profile_image),
                    ),
                  ),
                ),
                Container(
                  child: Text(
                    widget.studentName,
                    style: TextStyle(
                        fontSize: 15,
                        fontFamily: "OpenSans",
                        color: Colors.black),
                  ),
                )
              ],
            )),
            GestureDetector(
              onTap: () => setState(() {
                _visible = !_visible;
                print("lol");
              }),
              child: AbsorbPointer(
                child: Container(
                  child: Text(
                    "Review",
                    style: TextStyle(
                        decoration: _visible ? TextDecoration.underline : null,
                        fontSize: 15,
                        fontFamily: "OpenSans",
                        color: Color(0xFFF14B4B)),
                  ),
                ),
              ),
            ),
          ]),
          Visibility(
              child: Container(
                margin: EdgeInsets.fromLTRB(0, 10, 0, 0),
                // padding: EdgeInsets.fromLTRB(0, 10, 0, 0),
                // width: size.width * 0.8,
                // height: size.height * 0.1,
                decoration: BoxDecoration(
                    border: Border.all(
                        color: Theme.of(context).colorScheme.surface),
                    borderRadius: BorderRadius.circular(10)),
                child: (ListView.builder(
                  physics: const NeverScrollableScrollPhysics(),
                  // padding: const EdgeInsets.fromLTRB(10, 10, 20, 10),
                  shrinkWrap: true,
                  itemCount: _files == null ? 0 : _files!.length,
                  itemBuilder: (BuildContext context, int index) {
                    return Container(
                      padding: EdgeInsets.fromLTRB(5, 10, 5, 10),
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
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Container(
                                        padding: EdgeInsets.only(right: 10),
                                        // decoration: BoxDecoration(
                                        //     border: Border.all(
                                        //         color: Color.fromARGB(
                                        //             255, 26, 25, 25))),
                                        child: Container(
                                          child: iconPicker(_files![index]
                                                  ["name"]
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
                                                  color: Theme.of(context)
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
              visible: _visible),
        ],
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
          height: 30,
          color: Colors.red,
        );
      case ("docx"):
        return SvgPicture.asset(
          "assets/images/doc.svg",
          height: 20,
        );
      case "pptx":
        return SvgPicture.asset(
          "assets/images/ppt.svg",
          height: 20,
        );
      case "xlsx":
        return SvgPicture.asset(
          "assets/images/xls.svg",
          height: 20,
        );
      case "zip":
        return SvgPicture.asset(
          "assets/images/zip.svg",
          height: 20,
        );
      default:
        return SvgPicture.asset(
          "assets/images/file.svg",
          height: 20,
        );
    }
  }

  Widget getProfileImage(String? profilePath) {
    if (profilePath != null) {
      return CachedNetworkImage(
        imageUrl: '$fileServerBase/$profilePath',
        imageBuilder: (context, imageProvider) => Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: imageProvider,
              fit: BoxFit.contain,
            ),
          ),
        ),
        placeholder: (context, url) => const CircularProgressIndicator(),
        errorWidget: (context, url, error) => const Icon(Icons.error),
      );
    } else {
      return SvgPicture.asset(
        "assets/images/defaultProfile.svg",
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
