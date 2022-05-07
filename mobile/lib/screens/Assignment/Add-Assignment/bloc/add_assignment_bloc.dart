import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'dart:convert';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/group.dart';
import 'package:sikshyalaya/repository/models/course.dart';
import 'package:sikshyalaya/repository/models/instructor.dart';
import 'package:http/http.dart' as http;
import 'package:mime/mime.dart';
import 'package:path/path.dart' as path;
import 'package:http_parser/http_parser.dart';
import 'dart:io';

part 'add_assignment_event.dart';
part 'add_assignment_state.dart';

class AddAssignmentBloc extends Bloc<AddAssignmentEvent, AddAssignmentState> {
  final String? token;
  AddAssignmentBloc({required this.token}) : super(AddAssignmentState()) {
    on<EndTimeChanged>(_onEndTimeChanged);
    on<GroupChanged>(_onGroupChanged);
    on<DescriptionChanged>(_onDescriptionChanged);
    on<FetchGroup>(_onFetchGroup);
    on<CourseChanged>(_onCourseChanged);
    on<Submit>(_onSubmit);
    on<FetchCourse>(_onFetchCourse);
    on<FetchInstructor>(_onFetchInstructor);
    on<InstructorChanged>(_onInstructorChanged);
    on<TitleChanged>(_onTitleChanged);
    on<NewFilePicked>(_onNewFilePicked);
    on<RemoveFile>(_onRemoveFile);
    on<Success>(_onSuccess);

    add(FetchGroup());
    add(FetchInstructor());
    add(FetchCourse());
  }

  void _onEndTimeChanged(
      EndTimeChanged event, Emitter<AddAssignmentState> emit) {
    emit(state.copyWith(end_time: event.end_time));
  }

  void _onGroupChanged(GroupChanged event, Emitter<AddAssignmentState> emit) {
    emit(state.copyWith(group: event.group));
  }

  void _onInstructorChanged(
      InstructorChanged event, Emitter<AddAssignmentState> emit) {
    emit(state.copyWith(instructor: event.instructor));
  }

  void _onCourseChanged(CourseChanged event, Emitter<AddAssignmentState> emit) {
    emit(state.copyWith(course: event.course));
  }

  void _onDescriptionChanged(
      DescriptionChanged event, Emitter<AddAssignmentState> emit) {
    emit(state.copyWith(description: event.description));
  }

  void _onTitleChanged(TitleChanged event, Emitter<AddAssignmentState> emit) {
    emit(state.copyWith(title: event.title));
  }

  void _onFetchGroup(FetchGroup event, Emitter<AddAssignmentState> emit) async {
    final client = http.Client();
    final headers = {"Cookie": "session=$token"};
    final groupUri = Uri.parse("$backendBase/group");
    final groupResp = await client.get(groupUri, headers: headers);
    assert(groupResp.statusCode == 200);
    var group = jsonDecode(groupResp.body);
    List<Group>? tempList = [];
    group.forEach((element) => {tempList.add(Group.fromJson((element)))});
    emit(state.copyWith(groupList: tempList));
  }

  void _onFetchCourse(
      FetchCourse event, Emitter<AddAssignmentState> emit) async {
    final client = http.Client();
    final headers = {"Cookie": "session=$token"};
    final groupUri = Uri.parse("$backendBase/course");
    final courseResp = await client.get(groupUri, headers: headers);
    assert(courseResp.statusCode == 200);
    var course = jsonDecode(courseResp.body);
    List<Course>? tempList = [];
    course.forEach((element) => {tempList.add(Course.fromJson((element)))});
    emit(state.copyWith(courseList: tempList));
  }

  void _onFetchInstructor(
      FetchInstructor event, Emitter<AddAssignmentState> emit) async {
    final client = http.Client();

    final headers = {"Cookie": "session=$token"};
    final instructorUri = Uri.parse("$backendBase/users/teacher");
    final instructorResp = await client.get(instructorUri, headers: headers);
    assert(instructorResp.statusCode == 200);
    var instructor = jsonDecode(instructorResp.body);
    List<Instructor>? tempList = [];
    instructor
        .forEach((element) => {tempList.add(Instructor.fromJson(element))});
    emit(state.copyWith(
      instructorList: tempList,
    ));
  }

  void _onSuccess(Success event, Emitter<AddAssignmentState> emit) {
    emit(state.copyWith(success: event.success));
  }

  void _onNewFilePicked(NewFilePicked event, Emitter<AddAssignmentState> emit) {
    var oldFile = [...state.toUpload];
    event.file.forEach((element) => oldFile.add(element));

    var oldpaths = [...state.paths];
    event.paths.forEach((element) => oldpaths.add(element));

    emit(state.copyWith(toUpload: oldFile, paths: oldpaths));
  }

  void _onRemoveFile(RemoveFile event, Emitter<AddAssignmentState> emit) {
    var oldFile = [...state.toUpload];
    oldFile.removeAt(event.index);

    var oldpaths = [...state.paths];
    oldpaths.removeAt(event.index);

    emit(state.copyWith(toUpload: oldFile, paths: oldpaths));
  }

  void _onSubmit(_, Emitter<AddAssignmentState> emit) async {
    print(state.paths);
    if (state.end_time != null &&
            state.description != null &&
            state.group != null
        //state.instructor != null
        ) {
      emit(state.copyWith(uploadStat: uploadStatus.uploadStart));
      var groupList = [];
      groupList.add(state.group);

      final Map<dynamic, dynamic> values = {
        "due_date": state.end_time,
        "contents": state.description,
        // "files": "",
        "group": groupList,
        "instructor": state.instructor == []
            ? []
            : state.instructor.map((e) => e as int).toList(),
        "title": state.title,
        "course_id": state.course,
        "marks": 0,
      };
      final client = http.Client();
      final submitUri = Uri.parse("$backendBase/assignment/");
      final submitResp = await client.post(
        submitUri,
        headers: {
          "Content-Type": "application/json",
          "Cookie": "session=$token"
        },
        body: jsonEncode(values),
      );
      if (submitResp.statusCode == 200) {
        int id = jsonDecode(submitResp.body)['id'];
        final filesUri = Uri.parse("$backendBase/assignment/$id/files/");
        var request = http.MultipartRequest(
          'POST',
          filesUri,
        );
        state.paths.forEach(
          (e) async => request.files.add(
            await http.MultipartFile.fromPath(
              "files",
              e!,
              contentType: MediaType.parse(
                lookupMimeType(e)!,
              ),
            ),
          ),
        );
        request.headers['Cookie'] = "session=$token";
        var response = await request.send();

        print(response.statusCode);
        if (response.statusCode == 200) {
          emit(state.copyWith(uploadStat: uploadStatus.uploadSuccess));
        } else {
          emit(state.copyWith(uploadStat: uploadStatus.uploadFailed));
        }
      }

      if (submitResp.statusCode == 200) {
        emit(state.copyWith(success: true));
      } else {
        throw Exception("Submit Failed");
      }
    }
  }
}
