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
    final studentQuizView = await studentQuizViewRepository.getStudentQuizView(
      url: event.urlView,
    );
    final quizAnswer = await studentQuizViewRepository.getStudentAnswer(
      url: event.urlAnswer,
    );

    emit(state.copyWith(
      isLoaded: true,
      quizViews: studentQuizView,
      quizAnswer: quizAnswer["quiz_answer"],
      answerExists: quizAnswer["exists"],
    ));
  }

  void _studentAnswerPost(
      StudentAnswerPost event, Emitter<StudentQuizViewState> emit) async {
    var returnAnswer = await studentQuizViewRepository.postStudentAnswer(
      url: event.postUrl,
      body: event.attempt,
    );
    emit(state.copyWith(quizAnswer: returnAnswer));
  }
}
