part of 'teacher_quiz_bloc.dart';

abstract class TeacherQuizEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetTeacherQuiz extends TeacherQuizEvent {
  final String url;

  GetTeacherQuiz({required this.url});

  @override
  List<Object> get props => [url];
}
class DeleteQuiz extends TeacherQuizEvent {
  final int quiz_id;

  DeleteQuiz({required this.quiz_id});

  @override
  List<Object> get props => [quiz_id];
}
