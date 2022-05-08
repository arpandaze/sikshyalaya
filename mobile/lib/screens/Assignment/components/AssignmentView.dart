import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/components/not_available.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/helpers/helper.dart';
import 'package:sikshyalaya/screens/Assignment/assignment_upload_bloc.dart';
import 'package:url_launcher/url_launcher.dart';

class AssignmentSubmissionView extends StatelessWidget {
  final String? title;
  final String? dueDate;
  final String? contents;
  final List<String>? files;
  final int assignmentid;

  const AssignmentSubmissionView({
    required this.assignmentid,
    required this.title,
    required this.dueDate,
    required this.contents,
    required this.files,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) =>
          AssignmentUploadBloc(token: context.read<AuthBloc>().state.token)
            ..add(GetAssignmentUpload(assignmentid: assignmentid)),
      child: SafeArea(
        top: true,
        bottom: true,
        child: body(context),
      ),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocBuilder<AssignmentUploadBloc, AssignmentUploadState>(
      buildWhen: (previous, current) => previous != current,
      builder: (context, state) {
        return Scaffold(
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
                        width: size.width * 0.89,
                        margin: const EdgeInsets.fromLTRB(20, 0, 20, 0),
                        alignment: Alignment.topLeft,
                        padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
                        child: Column(
                          children: <Widget>[
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text("Due, ${dueDate!}",
                                    style:
                                        Theme.of(context).textTheme.subtitle2),
                                Text(
                                  "Submitted : ${dateHandler(state.assignmentUpload["submission_date"] ?? "")["completeDate"]}",
                                  style: Theme.of(context).textTheme.subtitle2,
                                ),
                              ],
                            ),
                            Container(
                                margin: const EdgeInsets.fromLTRB(0, 30, 0, 20),
                                child: Text(
                                  contents!,
                                  style: Theme.of(context).textTheme.bodyText1,
                                )),
                            Container(
                              // decoration: BoxDecoration(
                              //     border: Border.all(color: Colors.black)),
                              // padding: EdgeInsets.symmetric(
                              //     vertical: 10, horizontal: 0),
                              child: (ListView.builder(
                                physics: const NeverScrollableScrollPhysics(),
                                // padding:
                                //     const EdgeInsets.fromLTRB(20, 10, 20, 10),
                                shrinkWrap: true,
                                itemCount: files == null ? 0 : files!.length,
                                itemBuilder: (BuildContext context, int index) {
                                  return Container(
                                    // padding: EdgeInsets.fromLTRB(5, 10, 5, 10),
                                    child: files == null && files!.length == 0
                                        ? null
                                        : Container(
                                            width: size.width,
                                            decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(10),
                                              border: Border.all(
                                                  color:
                                                      const Color(0xFFB4B4B4)),
                                            ),
                                            child: InkWell(
                                              onTap: () => _launchUrl(
                                                  '$fileServerBase/${jsonDecode(files![index])["path"]}'),
                                              child: Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceEvenly,
                                                children: [
                                                  Container(
                                                    padding:
                                                        EdgeInsets.fromLTRB(
                                                            5, 10, 5, 10),
                                                    child: iconPicker(
                                                        jsonDecode(files![
                                                                index])["name"]
                                                            .split(".")
                                                            .last),
                                                  ),
                                                  Container(
                                                    width: size.width * 0.7,
                                                    alignment:
                                                        Alignment.centerLeft,
                                                    child: Text(
                                                      ' ${jsonDecode(files![index])["name"]}',
                                                      style: (Theme.of(context)
                                                              .textTheme
                                                              .subtitle1)!
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
                              child: Text('Your Work(s)',
                                  style: Theme.of(context).textTheme.headline5),
                            ),
                            Container(
                              alignment: Alignment.center,
                              // decoration: BoxDecoration(
                              //     border: Border.all(color: Colors.black)),
                              padding: EdgeInsets.symmetric(
                                  vertical: 10, horizontal: 0),
                              child: state.assignmentUploadLoading
                                  ? ListView.builder(
                                      physics:
                                          const NeverScrollableScrollPhysics(),
                                      // padding: const EdgeInsets.fromLTRB(
                                      //     20, 10, 20, 10),
                                      shrinkWrap: true,
                                      itemCount:
                                          state.assignmentUpload["files"] ==
                                                  null
                                              ? 0
                                              : state.assignmentUpload["files"]
                                                  .length,
                                      itemBuilder:
                                          (BuildContext context, int index) {
                                        return Container(
                                          // padding:
                                          //     EdgeInsets.fromLTRB(5, 10, 5, 10),
                                          child: state.assignmentUpload[
                                                          "files"] ==
                                                      null &&
                                                  state
                                                          .assignmentUpload[
                                                              "files"]
                                                          .length !=
                                                      0
                                              ? null
                                              : Container(
                                                  margin:
                                                      EdgeInsets.only(top: 10),
                                                  padding: EdgeInsets.fromLTRB(
                                                      5, 10, 5, 10),
                                                  decoration: BoxDecoration(
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              10),
                                                      border: Border.all(
                                                          color: const Color(
                                                              0xFFB4B4B4))),
                                                  child: InkWell(
                                                    onTap: () => _launchUrl(
                                                        '$fileServerBase/${state.assignmentUpload["files"][index]["path"]}'),
                                                    child: Row(
                                                      children: [
                                                        Container(
                                                          padding:
                                                              EdgeInsets.only(
                                                                  right: 10),
                                                          child: iconPicker(
                                                              "${state.assignmentUpload["files"][index]["name"].split(".").last}"),
                                                        ),
                                                        Container(
                                                          child: Text(
                                                            '${state.assignmentUpload["files"][index]["name"]}',
                                                            style: (Theme.of(
                                                                        context)
                                                                    .textTheme
                                                                    .subtitle1)!
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
                                        );
                                      },
                                    )
                                  : CircularProgressIndicator(
                                      color:
                                          Theme.of(context).colorScheme.primary,
                                    ),
                            ),
                          ],
                        ),
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
        );
      },
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
