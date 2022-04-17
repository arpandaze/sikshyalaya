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
