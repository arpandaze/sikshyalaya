import 'dart:convert';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/components/CustomFilledButton.dart';
import 'package:sikshyalaya/components/CustomFilledButtonSecond.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/screens/Assignment/assignment_upload_bloc.dart';
import 'package:sikshyalaya/screens/Assignment/student_assignment_bloc.dart';
import 'package:url_launcher/url_launcher.dart';
import 'dart:async';
import 'dart:io';

class AssignmentSubmission extends StatelessWidget {
  final int? assignmentid;
  final String? title;
  final String? dueDate;
  final String? contents;
  final List<String>? files;

  const AssignmentSubmission({
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
          AssignmentUploadBloc(token: context.read<AuthBloc>().state.token),
      child: body(context),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    final _files = jsonDecode(files.toString());
    print(_files);

    // return SafeArea(
    //   top: true,
    //   bottom: true,
    //   child: Scaffold(
    //     body: Stack(
    //       alignment: Alignment.center,
    //       children: <Widget>[
    //         ListView(
    //           padding: EdgeInsets.fromLTRB(0, size.width * 0.10, 0, 0),
    //           scrollDirection: Axis.vertical,

    return BlocConsumer<AssignmentUploadBloc, AssignmentUploadState>(
        listener: (context, state) {
            if(state.uploadStat == uploadStatus.uploadSuccess){
                Navigator.of(context).pushReplacementNamed("/student_assignment");
              }
          },
        builder: (context, state) {
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
                      //     Container(
                      //       width: size.width * 0.14,
                      //     )
                      //   ],
                      // ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(25),
                                color: Theme.of(context).colorScheme.surface),
                            width: size.width * 0.9,
                            alignment: Alignment.topLeft,
                            padding: const EdgeInsets.fromLTRB(10, 20, 10, 20),
                            child: Column(
                              children: <Widget>[
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text("Due, ${dueDate!}",
                                        style: Theme.of(context)
                                            .textTheme
                                            .caption),
                                    Text(
                                      "Assigned",
                                      style:
                                          Theme.of(context).textTheme.subtitle2,
                                    )
                                  ],
                                ),
                                Container(
                                    alignment: Alignment.centerLeft,
                                    margin:
                                        const EdgeInsets.fromLTRB(0, 10, 0, 10),
                                    child: Text(
                                      contents!,
                                      style:
                                          Theme.of(context).textTheme.bodyText1,
                                    )),
                                Container(
                                  // decoration: BoxDecoration(
                                  //     border: Border.all(color: Colors.black)),
                                  // padding: EdgeInsets.symmetric(
                                  //     vertical: 10, horizontal: 0),
                                  child: (ListView.builder(
                                    physics:
                                        const NeverScrollableScrollPhysics(),
                                    // padding: const EdgeInsets.fromLTRB(10, 10, 20, 10),
                                    shrinkWrap: true,
                                    itemCount:
                                        _files == null ? 0 : _files!.length,
                                    itemBuilder:
                                        (BuildContext context, int index) {
                                      return Container(
                                        decoration: BoxDecoration(
                                            borderRadius:
                                                BorderRadius.circular(10),
                                            border: Border.all(
                                              color: Color.fromARGB(
                                                  195, 244, 67, 54),
                                            )),
                                        padding:
                                            EdgeInsets.fromLTRB(5, 10, 5, 10),
                                        margin: EdgeInsets.only(top: 10),
                                        child: _files == null &&
                                                _files!.length == 0
                                            ? null
                                            : GestureDetector(
                                                onTap: () => _launchUrl(
                                                    '$fileServerBase/${_files![index]["path"]}'),
                                                child: AbsorbPointer(
                                                  child: Container(
                                                    // width: size.width,
                                                    child: Row(
                                                      mainAxisAlignment:
                                                          MainAxisAlignment
                                                              .spaceBetween,
                                                      children: [
                                                        Container(
                                                          padding:
                                                              EdgeInsets.only(
                                                                  right: 10),
                                                          // decoration: BoxDecoration(
                                                          //     border: Border.all(
                                                          //         color: Color.fromARGB(
                                                          //             255, 26, 25, 25))),
                                                          child: Container(
                                                            child: iconPicker(
                                                                _files![index]
                                                                        ["name"]
                                                                    .split(
                                                                        ".")[1]),
                                                          ),
                                                        ),
                                                        Container(
                                                          width:
                                                              size.width * 0.7,
                                                          child: Text(
                                                            '${_files[index]["name"]}',
                                                            style: (Theme.of(
                                                                        context)
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
                            padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
                            width: size.width * 0.89,
                            margin: const EdgeInsets.fromLTRB(20, 20, 20, 0),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10),
                              border:
                                  Border.all(color: const Color(0xFFB4B4B4)),
                            ),
                            child: Column(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceAround,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: <Widget>[
                                  Container(
                                    padding:
                                        const EdgeInsets.fromLTRB(0, 20, 0, 20),
                                    child: Text('Your Work',
                                        style: Theme.of(context)
                                            .textTheme
                                            .headline5),
                                  ),
                                  Container(
                                    child: ListView.builder(
                                      physics: NeverScrollableScrollPhysics(),
                                      shrinkWrap: true,
                                      itemCount: state.toUpload.length,
                                      itemBuilder: (context, index) =>
                                          Container(
                                              decoration: BoxDecoration(
                                                  borderRadius:
                                                      BorderRadius.circular(10),
                                                  border: Border.all(
                                                      color: Colors.grey)),
                                              padding: EdgeInsets.symmetric(
                                                  vertical: 10, horizontal: 5),
                                              margin: EdgeInsets.symmetric(
                                                  vertical: 10, horizontal: 0),
                                              child: Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceBetween,
                                                children: [
                                                  Container(
                                                    child: iconPicker(
                                                        "${state.toUpload[index].path.split('/').last.split(".").last}"),
                                                  ),
                                                  Container(
                                                    alignment: Alignment.center,
                                                    width: size.width * 0.6,
                                                    child: Text(
                                                      "${state.toUpload[index].path.split('/').last}",
                                                      style: Theme.of(context)
                                                          .textTheme
                                                          .subtitle1,
                                                    ),
                                                  ),
                                                  GestureDetector(
                                                    child: Icon(
                                                      Icons
                                                          .delete_forever_outlined,
                                                      size: size.height * 0.03,
                                                      color: Theme.of(context)
                                                          .colorScheme
                                                          .primary,
                                                    ),
                                                    onTap: () => context
                                                        .read<
                                                            AssignmentUploadBloc>()
                                                        .add(RemoveFile(
                                                            index: index)),
                                                  ),
                                                ],
                                              )),
                                    ),
                                  ),
                                  Container(
                                    padding:
                                        const EdgeInsets.fromLTRB(0, 20, 0, 10),
                                    margin:
                                        const EdgeInsets.fromLTRB(70, 0, 70, 0),
                                    width: size.width * 0.5,
                                    child: CustomFilledButtonSecond(
                                      colorType:
                                          Theme.of(context).colorScheme.primary,
                                      textColor:
                                          Theme.of(context).colorScheme.primary,
                                      buttonText: "Upload File(s)",
                                      onPressed: () async {
                                        FilePickerResult? result =
                                            await FilePicker.platform
                                                .pickFiles(allowMultiple: true);

                                        if (result != null) {
                                          List<File> files = result.paths
                                              .map((path) => File(path!))
                                              .toList();

                                          context
                                              .read<AssignmentUploadBloc>()
                                              .add(NewFilePicked(
                                                  file: files,
                                                  paths: result.paths));
                                        } else {
                                          // User canceled the picker
                                        }
                                      },
                                    ),
                                  ),
                                ]),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.fromLTRB(0, 20, 0, 10),
                        margin: const EdgeInsets.fromLTRB(70, 0, 70, 0),
                        width: size.width * 0.5,
                        child: state.uploadStat == uploadStatus.uploadNotStarted
                            ? CustomFilledButtonSecond(
                                colorType:
                                    Theme.of(context).colorScheme.primary,
                                textColor: Colors.black,
                                buttonText: "Submit",
                                onPressed: () async {
                                  if (state.toUpload.length > 0) {
                                    context.read<AssignmentUploadBloc>().add(
                                          SubmitAssignment(
                                              assignmentid: assignmentid ?? 0),
                                        );
                                  } else {
                                    //donot allow post
                                  }
                                },
                              )
                            : state.uploadStat == uploadStatus.uploadStart
                                ? Container(
                                    child: Center(
                                    child: CircularProgressIndicator(),
                                  ))
                                : state.uploadStat == uploadStatus.uploadFailed
                                    ? Column(
                                        children: [
                                          Center(
                                            child: Text('Upload Failed'),
                                          ),
                                          CustomFilledButtonSecond(
                                            colorType: Theme.of(context)
                                                .colorScheme
                                                .primary,
                                            textColor: Colors.black,
                                            buttonText: "Submit",
                                            onPressed: () async {
                                              if (state.toUpload.length > 0) {
                                                context
                                                    .read<
                                                        AssignmentUploadBloc>()
                                                    .add(
                                                      SubmitAssignment(
                                                          assignmentid:
                                                              assignmentid ??
                                                                  0),
                                                    );
                                              } else {
                                                //donot allow post
                                              }
                                            },
                                          ),
                                        ],
                                      )
                                    : Container(
                                        width: size.width * 0.9,
                                        alignment: Alignment.center,
                                        child: Text(
                                          "Uploaded",
                                          style: Theme.of(context)
                                              .textTheme
                                              .subtitle1,
                                        ),
                                      ),
                      ),
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
                  ),
                ],
              ),
            ),
          );
        });
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
