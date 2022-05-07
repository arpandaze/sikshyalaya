// ignore_for_file: non_constant_identifier_names

part of 'teacher_assignment_review_bloc.dart';

abstract class TeacherAssignmentReviewEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetTeacherAssignmentReview extends TeacherAssignmentReviewEvent {
  final int assignmentId;

  GetTeacherAssignmentReview({required this.assignmentId});

  @override
  List<Object> get props => [assignmentId];
}
