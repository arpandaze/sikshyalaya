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
  final int quiz_id;
  final String postUrl;
  final String? token;

  StudentAnswerPost({
    required this.postUrl,
    required this.attempt,
    required this.quiz_id,
    this.token,
  });

  @override
  List<Object> get props => [postUrl, attempt];
}
