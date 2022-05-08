import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:multi_select_flutter/multi_select_flutter.dart';
import 'package:sikshyalaya/components/CustomNumberField.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/screens/Assignment/Add-Assignment/bloc/add_assignment_bloc.dart';
import 'dart:io';

import '../../../components/CustomDateButton.dart';
import '../../Login/components/CustomFilledButton.dart';
import '../../../components/CustomTextField.dart';

class AddAssignment extends StatelessWidget {
  const AddAssignment({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider<AddAssignmentBloc>(
      create: (context) =>
          AddAssignmentBloc(token: context.read<AuthBloc>().state.token),
      child: SafeArea(
        top: true,
        bottom: true,
        child: Scaffold(body: body(context)),
      ),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return BlocBuilder<AddAssignmentBloc, AddAssignmentState>(
      buildWhen: (previous, current) => previous != current,
      builder: (context, state) {
        if (state.success == true) {
          Navigator.pop(context);
        }
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
                      child: Text("Add Assignment",
                          style: Theme.of(context).textTheme.headline5),
                    ),
                    Container(
                      width: size.width * 0.90,
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
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              children: <Widget>[
                                Container(
                                  child: Text("Submission time",
                                      style:
                                          Theme.of(context).textTheme.caption),
                                ),
                                Container(
                                  child: CustomDateButton(
                                    onChangeVal: (value) => {
                                      context.read<AddAssignmentBloc>().add(
                                          EndTimeChanged(
                                              end_time:
                                                  value.toIso8601String()))
                                    },
                                    initialD: DateTime.now(),
                                    lastDate:
                                        DateTime.now().add(Duration(days: 120)),
                                    width: size.width * 0.27,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Container(
                            alignment: Alignment.centerLeft,
                            margin: EdgeInsets.fromLTRB(0, 0, 0, 8),
                            width: size.width * 0.8,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: <Widget>[
                                Container(
                                  margin: EdgeInsets.fromLTRB(
                                      0, 10, size.width * 0.2, 0),
                                  child: Text("Group",
                                      style:
                                          Theme.of(context).textTheme.caption),
                                ),
                                Container(
                                  margin:
                                      const EdgeInsets.fromLTRB(0, 10, 0, 0),
                                  width: size.width * 0.4,
                                  child: DropdownButton<int>(
                                    icon: const Icon(Icons.arrow_downward),
                                    elevation: 16,
                                    value: state.group,
                                    menuMaxHeight: size.height / 3,
                                    isExpanded: true,
                                    isDense: true,
                                    hint: const Text("Group"),
                                    onChanged: (value) {
                                      context
                                          .read<AddAssignmentBloc>()
                                          .add(GroupChanged(group: value));
                                    },
                                    items: state.groupList != null
                                        ? state.groupList!
                                            .map((group) => DropdownMenuItem(
                                                  child: Text(
                                                      "${group.program!.name}\nSem : ${group.sem}"),
                                                  value: group.id,
                                                ))
                                            .toList()
                                        : [],
                                  ),
                                ),
                                Container(
                                  width: size.width * 0.06,
                                ),
                              ],
                            ),
                          ),
                          Container(
                            alignment: Alignment.centerLeft,
                            margin: EdgeInsets.fromLTRB(0, 0, 0, 8),
                            width: size.width * 0.8,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: <Widget>[
                                Container(
                                  margin: EdgeInsets.fromLTRB(
                                      0, 20, size.width * 0.2, 0),
                                  child: Text("Course",
                                      style:
                                          Theme.of(context).textTheme.caption),
                                ),
                                Container(
                                  margin:
                                      const EdgeInsets.fromLTRB(0, 20, 0, 0),
                                  width: size.width * 0.4,
                                  child: DropdownButton<int>(
                                    icon: const Icon(Icons.arrow_downward),
                                    elevation: 16,
                                    value: state.course,
                                    menuMaxHeight: size.height / 3,
                                    isExpanded: true,
                                    isDense: true,
                                    enableFeedback: true,
                                    itemHeight: size.height * 0.08,
                                    hint: const Text("Course"),
                                    onChanged: (value) {
                                      context
                                          .read<AddAssignmentBloc>()
                                          .add(CourseChanged(course: value));
                                    },
                                    items: state.courseList != null
                                        ? state.courseList!
                                            .map((course) => DropdownMenuItem(
                                                  child: Text(
                                                      "${course.course_code}: ${course.course_name}"),
                                                  value: course.id,
                                                ))
                                            .toList()
                                        : [],
                                  ),
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
                      child: Text("Title",
                          style: Theme.of(context).textTheme.headline5),
                    ),
                    Container(
                      child: CustomTextField(
                        margin: EdgeInsets.all(20),
                        height: size.height * 0.03,
                        onChanged: (value) => {
                          context
                              .read<AddAssignmentBloc>()
                              .add(TitleChanged(title: value))
                        },
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
                        onChanged: (value) => {
                          context
                              .read<AddAssignmentBloc>()
                              .add(DescriptionChanged(description: value))
                        },
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
                              child: Text('Add File(s)',
                                  style: Theme.of(context).textTheme.headline5),
                            ),
                            Container(
                              child: ListView.builder(
                                physics: NeverScrollableScrollPhysics(),
                                shrinkWrap: true,
                                itemCount: state.toUpload.length,
                                itemBuilder: (context, index) => Container(
                                    padding: EdgeInsets.symmetric(
                                        vertical: 10, horizontal: 0),
                                    child: Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceEvenly,
                                      children: [
                                        Text(
                                          "${state.toUpload[index].path.split('/').last}",
                                          style: Theme.of(context)
                                              .textTheme
                                              .subtitle1,
                                        ),
                                        GestureDetector(
                                          child: Icon(
                                            Icons.delete_forever_outlined,
                                            size: size.height * 0.03,
                                            color: Theme.of(context)
                                                .colorScheme
                                                .primary,
                                          ),
                                          onTap: () => context
                                              .read<AddAssignmentBloc>()
                                              .add(RemoveFile(index: index)),
                                        ),
                                      ],
                                    )),
                              ),
                            ),
                            Container(
                              margin: const EdgeInsets.fromLTRB(70, 0, 70, 0),
                              width: size.width * 0.5,
                              child: CustomFilledButton(
                                onPressed: () async {
                                  FilePickerResult? result = await FilePicker
                                      .platform
                                      .pickFiles(allowMultiple: true);

                                  if (result != null) {
                                    List<File> files = result.paths
                                        .map(
                                          (path) => File(path!),
                                        )
                                        .toList();

                                    context.read<AddAssignmentBloc>().add(
                                        NewFilePicked(
                                            file: files, paths: result.paths));
                                  } else {
                                    // User canceled the picker
                                  }
                                },
                                text: "Upload File(s)",
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
                              child: MultiSelectBottomSheetField(
                                items: state.instructorList != null
                                    ? state.instructorList!
                                        .map((e) =>
                                            MultiSelectItem(e.id, e.full_name!))
                                        .toList()
                                    : [],
                                searchable: true,
                                onConfirm: (results) {
                                  context.read<AddAssignmentBloc>().add(
                                      InstructorChanged(instructor: results));
                                },
                                selectedColor:
                                    Theme.of(context).colorScheme.onSurface,
                              ),
                            ),
                          ]),
                    ),
                  ],
                ),
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      alignment: Alignment.center,
                      width: size.width * 0.5,
                      margin: const EdgeInsets.fromLTRB(70, 20, 70, 50),
                      child: CustomFilledButton(
                        text: "Submit",
                        onPressed: () =>
                            context.read<AddAssignmentBloc>().add(Submit()),
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
        );
      },
    );
  }
}
