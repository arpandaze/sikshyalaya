import 'dart:convert';
import 'dart:io';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/group.dart';
import 'package:sikshyalaya/repository/models/instructor.dart';
import 'package:http/http.dart' as http;
import 'package:mime/mime.dart';
import 'package:http_parser/http_parser.dart';

part 'class_creator_event.dart';
part 'class_creator_state.dart';

class ClassCreatorBloc extends Bloc<ClassCreatorEvent, ClassCreatorState> {
  final String? token;
  ClassCreatorBloc({required this.token}) : super(ClassCreatorState()) {
    on<StartTimeChanged>(_onStartTimeChanged);
    on<EndTimeChanged>(_onEndTimeChanged);
    on<InstructorChanged>(_onInstructorChanged);
    on<GroupChanged>(_onGroupChanged);
    on<DescriptionChanged>(_onDescriptionChanged);
    on<FileChanged>(_onFileChanged);
    on<FetchInstructor>(_onFetchInstructor);
    on<FetchGroup>(_onFetchGroup);
    on<Submit>(_onSubmit);
    on<Success>(_onSuccess);
    on<NewFilePicked>(_onNewFilePicked);
    on<RemoveFile>(_onRemoveFile);

    add(FetchInstructor());
    add(FetchGroup());
  }

  void _onStartTimeChanged(
      StartTimeChanged event, Emitter<ClassCreatorState> emit) {
    emit(state.copyWith(start_time: event.start_time));
  }

  void _onEndTimeChanged(
      EndTimeChanged event, Emitter<ClassCreatorState> emit) {
    emit(state.copyWith(end_time: event.end_time));
  }

  void _onInstructorChanged(
      InstructorChanged event, Emitter<ClassCreatorState> emit) {
    emit(state.copyWith(instructor: event.instructor));
  }

  void _onGroupChanged(GroupChanged event, Emitter<ClassCreatorState> emit) {
    emit(state.copyWith(group: event.group));
  }

  void _onDescriptionChanged(
      DescriptionChanged event, Emitter<ClassCreatorState> emit) {
    emit(state.copyWith(description: event.description));
  }

  void _onFileChanged(FileChanged event, Emitter<ClassCreatorState> emit) {
    emit(state.copyWith(files: event.file));
  }

  void _onSuccess(Success event, Emitter<ClassCreatorState> emit) {
    emit(state.copyWith(success: event.success));
  }

  void _onNewFilePicked(NewFilePicked event, Emitter<ClassCreatorState> emit) {
    var oldFile = [...state.toUpload];
    event.file.forEach((element) => oldFile.add(element));

    var oldpaths = [...state.paths];
    event.paths.forEach((element) => oldpaths.add(element));

    emit(state.copyWith(toUpload: oldFile, paths: oldpaths));
  }

  void _onRemoveFile(RemoveFile event, Emitter<ClassCreatorState> emit) {
    var oldFile = [...state.toUpload];
    oldFile.removeAt(event.index);

    var oldpaths = [...state.paths];
    oldpaths.removeAt(event.index);

    emit(state.copyWith(toUpload: oldFile, paths: oldpaths));
  }

  void _onFetchInstructor(
      FetchInstructor event, Emitter<ClassCreatorState> emit) async {
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

  void _onFetchGroup(FetchGroup event, Emitter<ClassCreatorState> emit) async {
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

  void _onSubmit(_, Emitter<ClassCreatorState> emit) async {
    print(state.paths);
    if (state.start_time != null &&
        state.end_time != null &&
        state.description != null &&
        state.group != null) {
      final ins = state.instructor
          .map(
            (e) => e.toString(),
          )
          .toList();
      String csvID = ins.reduce((value, element) => value + "," + element);
      final Map<dynamic, dynamic> values = {
        "start_time": state.start_time,
        "end_time": state.end_time,
        "instructor": state.instructor == [] ? null : csvID,
        "description": state.description,
        // "files": "",
        "group": state.group,
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
        ..fields['instructor'] = values['instructor'];

      groupResp.headers['Cookie'] = "session=$token";
      var response = await groupResp.send();

      var id = await response.stream.bytesToString();
      int class_id = jsonDecode(id)['id'];

      if (response.statusCode == 200) {
        final filesUri =
            Uri.parse("$backendBase/class_session/$class_id/files");
        var request = http.MultipartRequest(
          'PUT',
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

      if (response.statusCode == 200) {
        emit(state.copyWith(success: true));
      }
    }
  }
}
