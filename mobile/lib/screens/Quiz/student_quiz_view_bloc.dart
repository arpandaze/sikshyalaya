import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/repository/models/quiz_answer.dart';
import 'package:sikshyalaya/repository/models/quiz_view.dart';
import 'package:sikshyalaya/repository/student_quiz_view.dart';

part 'student_quiz_view_event.dart';
part 'student_quiz_view_state.dart';

class StudentQuizViewBloc
    extends Bloc<StudentQuizViewEvent, StudentQuizViewState> {
  StudentQuizViewBloc({required this.studentQuizViewRepository})
      : super(const StudentQuizViewState()) {
    on<GetStudentQuizView>(_getStudentQuizView);
    on<StudentAnswerPost>(_studentAnswerPost);
  }

  final StudentQuizViewRepository studentQuizViewRepository;
  static const storage = FlutterSecureStorage();
  void _getStudentQuizView(
      GetStudentQuizView event, Emitter<StudentQuizViewState> emit) async {
    final newState = await StudentQuizViewState.load();
    final quizAnswer = await studentQuizViewRepository.getStudentAnswer(
        url: event.urlAnswer, token: newState.token!);
    final studentQuizView = await studentQuizViewRepository.getStudentQuizView(
        url: event.urlView, token: newState.token!);

    emit(state.copyWith(
        quizViews: studentQuizView,
        quizAnswer: quizAnswer["quiz_answer"],
        answerExists: quizAnswer["exists"],
        token: newState.token));
  }

  void _studentAnswerPost(
      StudentAnswerPost event, Emitter<StudentQuizViewState> emit) async {
    final newState = await StudentQuizViewState.load();
    var postAnswer =
        QuizAnswer(quiz_id: event.quiz_id, options_selected: event.attempt);
    var returnAnswer = await studentQuizViewRepository.postStudentAnswer(
        url: event.postUrl, token: newState.token!, body: postAnswer);
    print(returnAnswer);
  }
}
