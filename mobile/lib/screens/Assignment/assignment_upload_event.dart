// ignore_for_file: non_constant_identifier_names

part of 'assignment_upload_bloc.dart';

abstract class AssignmentUploadEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetAssignmentUpload extends AssignmentUploadEvent {
  final int assignmentid;

  GetAssignmentUpload({required this.assignmentid});

  @override
  List<Object> get props => [assignmentid];
}

class NewFilePicked extends AssignmentUploadEvent {
  final List<File> file;
  final List<String?> paths;
  NewFilePicked({required this.file, required this.paths});

  @override
  List<Object> get props => [file, paths];
}

class RemoveFile extends AssignmentUploadEvent {
  final int index;

  RemoveFile({required this.index});

  @override
  List<Object> get props => [index];
}

class SubmitAssignment extends AssignmentUploadEvent {
  final int assignmentid;

  SubmitAssignment({required this.assignmentid});

  @override
  List<Object> get props => [assignmentid];
}
