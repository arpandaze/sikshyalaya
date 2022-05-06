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
    on<TitleChanged>(_onTitleChanged);
    on<MarksChanged>(_onMarksChanged);

    add(FetchGroup());
    add(FetchCourse());
  }

  void _onEndTimeChanged(
      EndTimeChanged event, Emitter<AddAssignmentState> emit) {
    emit(state.copyWith(end_time: event.end_time));
  }

  void _onGroupChanged(GroupChanged event, Emitter<AddAssignmentState> emit) {
    emit(state.copyWith(group: event.group));
  }

  void _onMarksChanged(MarksChanged event, Emitter<AddAssignmentState> emit) {
    emit(state.copyWith(marks: event.marks));
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

  void _onSubmit(_, Emitter<AddAssignmentState> emit) async {
    if (state.end_time != null &&
            state.description != null &&
            state.group != null
        //state.instructor != null
        ) {
      final Map<dynamic, dynamic> values = {
        "due_date": state.end_time,
        // "instructor": [],
        // "instructor": state.instructor?.map((e) => e).toList(),
        "contents": state.description,
        // "files": "",
        "group": state.group,
        "title": state.title,
        "marks": state.marks,
        "course": state.course
      };
      final client = http.Client();
      final submitUri = Uri.parse("$backendBase/class_session/");
      final groupResp = http.MultipartRequest(
        'POST',
        submitUri,
      )
        ..fields['start_time'] = values['start_time']
        ..fields['end_time'] = values['end_time']
        ..fields['description'] = values['description']
        ..fields['group'] = values['group'].toString()
        ..fields['title'] = values['title']
        ..fields['marks'] = values['marks'].toString()
        ..fields['course'] = values['course'].toString();

      groupResp.headers['Cookie'] = "session=$token";
      var response = await groupResp.send();
    }
  }
}
