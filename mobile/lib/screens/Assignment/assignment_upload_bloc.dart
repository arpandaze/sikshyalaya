import 'dart:io';

import 'package:equatable/equatable.dart';
import 'dart:convert';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';

import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/student_assignment.dart';
import 'package:sikshyalaya/repository/student_assignment.dart';

part 'assignment_upload_state.dart';
part 'assignment_upload_event.dart';

class AssignmentUploadBloc
    extends Bloc<AssignmentUploadEvent, AssignmentUploadState> {
  AssignmentUploadBloc({
    required this.token,
  }) : super(const AssignmentUploadState()) {
    on<GetAssignmentUpload>(_onGetAssignmentUpload);
    on<NewFilePicked>(_onNewFilePicked);
  }

  final String? token;
  final Client httpClient = http.Client();

  void _onGetAssignmentUpload(
      GetAssignmentUpload event, Emitter<AssignmentUploadState> emit) async {
    print("Here");

    if (token != null) {
      final headers = {"Cookie": "session=$token"};
      final response = await httpClient.get(
          Uri.parse('$backendBase/assignmentupload/${event.assignmentid}'),
          headers: headers);

      if (response.statusCode != 200) {
        throw Exception(
            'Retrieve Failed! Error getting student dashboard info.');
      } else {
        var decodedResponse = jsonDecode(response.body);

        emit(
          state.copyWith(
            assignmentUpload: decodedResponse,
            assignmentUploadLoading: true,
          ),
        );
      }
    } else {
      throw Exception("No Session found");
    }
  }

  void _onNewFilePicked(
      NewFilePicked event, Emitter<AssignmentUploadState> emit) {
    var oldFile = state.toUpload;
    print("Here");
    print(event.file);
    event.file.forEach((element) => oldFile.add(element));

    emit(state.copyWith(toUpload: oldFile));
    print(state.toUpload);
  }
}
