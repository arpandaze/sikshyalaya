import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/repository/models/quiz.dart';
import 'package:sikshyalaya/repository/student_quiz.dart';

part 'student_quiz_event.dart';
part 'student_quiz_state.dart';

class StudentQuizBloc extends Bloc<StudentQuizEvent, StudentQuizState> {
  StudentQuizBloc({required this.studentQuizRepository})
      : super(const StudentQuizState()) {
    on<GetStudentQuiz>(_getStudentQuiz);
  }

  final StudentQuizRepository studentQuizRepository;

  void _getStudentQuiz(
      GetStudentQuiz event, Emitter<StudentQuizState> emit) async {
    print("GetQuiz");

    final newState = await StudentQuizState.load();

    final studentQuiz = await studentQuizRepository.getStudentQuiz(
        url: event.url, token: newState.token!);

    var active = [Quiz.empty];
    var past = [Quiz.empty];
    var other = [Quiz.empty];

    for (var quiz in studentQuiz) {
      final parsedStartDate = DateTime.tryParse(quiz.start_time!);
      final parsedEndDate = DateTime.tryParse(quiz.end_time!);

      if (parsedEndDate != null || parsedStartDate != null) {
        if (parsedEndDate!.isAfter(DateTime.now()) &&
            parsedStartDate!.isBefore(DateTime.now())) {
          active.add(quiz);
        } else if (parsedEndDate.isBefore(DateTime.now())) {
          past.add(quiz);
        } else {
          other.add(quiz);
        }
      }
    }

    if (active.length != 1) active.removeAt(0);
    if (past.length != 1) past.removeAt(0);
    if (other.length != 1) other.removeAt(0);

    emit(state.copyWith(
        active: active, past: past, other: other, token: newState.token));
  }
}
