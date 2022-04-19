// ignore_for_file: non_constant_identifier_names

part of 'teacher_assignment_bloc.dart';

abstract class TeacherAssignmentEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetTeacherAssignment extends TeacherAssignmentEvent {
  final String url;

  GetTeacherAssignment({required this.url});

  @override
  List<Object> get props => [url];
}
