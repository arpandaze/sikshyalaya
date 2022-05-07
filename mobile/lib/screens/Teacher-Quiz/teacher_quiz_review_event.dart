// ignore_for_file: non_constant_identifier_names

part of 'teacher_quiz_review_bloc.dart';

abstract class TeacherQuizReviewEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetTeacherQuizReview extends TeacherQuizReviewEvent {
  final int quizId;

  GetTeacherQuizReview({required this.quizId});

  @override
  List<Object> get props => [quizId];
}
