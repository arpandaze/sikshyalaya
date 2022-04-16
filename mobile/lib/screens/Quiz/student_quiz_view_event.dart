part of 'student_quiz_view_bloc.dart';

abstract class StudentQuizViewEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetStudentQuizView extends StudentQuizViewEvent {
  final String url;

  GetStudentQuizView({required this.url});

  @override
  List<Object> get props => [url];
}
