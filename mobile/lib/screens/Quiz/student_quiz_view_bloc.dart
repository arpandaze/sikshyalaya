import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/repository/models/quiz_view.dart';
import 'package:sikshyalaya/repository/student_quiz_view.dart';

part 'student_quiz_view_event.dart';
part 'student_quiz_view_state.dart';

class StudentQuizViewBloc
    extends Bloc<StudentQuizViewEvent, StudentQuizViewState> {
  StudentQuizViewBloc({required this.studentQuizViewRepository})
      : super(const StudentQuizViewState()) {
    on<GetStudentQuizView>(_getStudentQuizView);
  }

  final StudentQuizViewRepository studentQuizViewRepository;

  void _getStudentQuizView(
      GetStudentQuizView event, Emitter<StudentQuizViewState> emit) async {
    print("GetQuiz");

    final newState = await StudentQuizViewState.load();

    final studentQuizView = await studentQuizViewRepository.getStudentQuizView(
        url: event.url, token: newState.token!);

    // var active = [QuizView.empty];
    // var past = [QuizView.empty];
    // var other = [QuizView.empty];

    // for (var quiz in studentQuizView) {
    //   final parsedStartDate = DateTime.tryParse(quiz.start_time!);
    //   final parsedEndDate = DateTime.tryParse(quiz.end_time!);

    //   if (parsedEndDate != null || parsedStartDate != null) {
    //     if (parsedEndDate!.isAfter(DateTime.now()) &&
    //         parsedStartDate!.isBefore(DateTime.now())) {
    //       active.add(quiz);
    //     } else if (parsedEndDate.isBefore(DateTime.now())) {
    //       past.add(quiz);
    //     } else {
    //       other.add(quiz);
    //     }
    //   }
    // }

    // if (active.length != 1) active.removeAt(0);
    // if (past.length != 1) past.removeAt(0);
    // if (other.length != 1) other.removeAt(0);
    print(studentQuizView);
    emit(state.copyWith(quizViews: studentQuizView, token: newState.token));
  }
}
