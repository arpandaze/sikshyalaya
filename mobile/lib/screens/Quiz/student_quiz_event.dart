part of 'student_quiz_bloc.dart';

abstract class StudentQuizEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetStudentQuiz extends StudentQuizEvent {
  final String url;

  GetStudentQuiz({required this.url});

  @override
  List<Object> get props => [url];
}
