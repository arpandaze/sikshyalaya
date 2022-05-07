// ignore_for_file: non_constant_identifier_names

part of 'student_assignment_bloc.dart';

abstract class StudentAssignmentEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetStudentAssignment extends StudentAssignmentEvent {
  final String url;

  GetStudentAssignment({required this.url});

  @override
  List<Object> get props => [url];
}

class GetStudentAssignmentUploads extends StudentAssignmentEvent {
  final int assignmentid;

  GetStudentAssignmentUploads({required this.assignmentid});
  @override
  List<Object> get props => [assignmentid];
}
