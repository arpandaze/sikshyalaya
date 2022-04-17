part of 'student_quiz_view_bloc.dart';

abstract class StudentQuizViewEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetStudentQuizView extends StudentQuizViewEvent {
  final String urlAnswer;
  final String urlView;

  GetStudentQuizView({required this.urlAnswer, required this.urlView});

  @override
  List<Object> get props => [urlAnswer, urlView];
}

class StudentAnswerPost extends StudentQuizViewEvent {
  final Map attempt;
  final String postUrl;

  StudentAnswerPost({required this.postUrl, required this.attempt});

  @override
  List<Object> get props => [postUrl, attempt];
}
