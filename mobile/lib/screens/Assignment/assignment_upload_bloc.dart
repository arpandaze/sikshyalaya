import 'dart:io';
import 'package:equatable/equatable.dart';
import 'dart:convert';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:path/path.dart' as path;
import 'package:mime/mime.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:http_parser/http_parser.dart';

part 'assignment_upload_state.dart';
part 'assignment_upload_event.dart';

class AssignmentUploadBloc
    extends Bloc<AssignmentUploadEvent, AssignmentUploadState> {
  AssignmentUploadBloc({
    required this.token,
  }) : super(const AssignmentUploadState()) {
    on<GetAssignmentUpload>(_onGetAssignmentUpload);
    on<NewFilePicked>(_onNewFilePicked);
    on<RemoveFile>(_onRemoveFile);
    on<SubmitAssignment>(_onSubmitAssignment);
  }

  final String? token;
  final Client httpClient = http.Client();

  void _onGetAssignmentUpload(
      GetAssignmentUpload event, Emitter<AssignmentUploadState> emit) async {
    print("Here");

    if (token != null) {
      print("SSS");
      final headers = {"Cookie": "session=$token"};
      final response = await httpClient.get(
          Uri.parse('$backendBase/assignmentupload/${event.assignmentid}'),
          headers: headers);
      if (response.statusCode != 200) {
        throw Exception(
            'Retrieve Failed! Error getting student dashboard info.');
      } else {
        var decodedResponse = jsonDecode(response.body);
        print(decodedResponse);
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
    var oldFile = [...state.toUpload];
    print("Here");
    print(event.file);
    event.file.forEach((element) => oldFile.add(element));

    var oldpaths = [...state.paths];
    event.paths.forEach((element) => oldpaths.add(element));

    emit(state.copyWith(toUpload: oldFile, paths: oldpaths));
  }

  void _onRemoveFile(RemoveFile event, Emitter<AssignmentUploadState> emit) {
    var oldFile = [...state.toUpload];
    oldFile.removeAt(event.index);

    var oldpaths = [...state.paths];
    oldpaths.removeAt(event.index);

    emit(state.copyWith(toUpload: oldFile, paths: oldpaths));
  }

  void _onSubmitAssignment(
      SubmitAssignment event, Emitter<AssignmentUploadState> emit) async {
    emit(state.copyWith(uploadStat: uploadStatus.uploadStart));

    if (token != null) {
      final submitUri = Uri.parse(
          "$backendBase/assignmentupload/${event.assignmentid}/upload");

      var request = http.MultipartRequest(
        'POST',
        submitUri,
      );
      // ..files.add(
      //     await http.MultipartFile.fromPath(
      //       "profile_photo",
      //       state.newProfile!.path,
      //       contentType: MediaType.parse(
      //         lookupMimeType(state.newProfile!.path)!,
      //       ),
      //     ),
      //   );

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
        print(response.stream.toString());
      } else {
        emit(state.copyWith(uploadStat: uploadStatus.uploadFailed));
        throw Exception("Submit Failed");
      }
    }
  }

  String getFileName(String _path) {
    return path.basename(_path);
  }
}
