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

  NewFilePicked({required this.file});

  @override
  List<Object> get props => [file];
}
