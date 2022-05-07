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

    add(GetStudentQuiz(url: 'quiz'));
  }

  final StudentQuizRepository studentQuizRepository;

  void _getStudentQuiz(
      GetStudentQuiz event, Emitter<StudentQuizState> emit) async {
    print("GetQuiz");

    final studentQuiz = await studentQuizRepository.getStudentQuiz(
      url: event.url,
    );

    var active = [Quiz.empty];
    var past = [Quiz.empty];
    var other = [Quiz.empty];
    var endDate = {};

    for (var quiz in studentQuiz) {
      var parsedStartDate = DateTime.tryParse(quiz.start_time!);
      var parsedEndDate = DateTime.tryParse(quiz.end_time!);

      if (parsedEndDate != null && parsedStartDate != null) {
        parsedStartDate = parsedStartDate.add(parsedStartDate.timeZoneOffset);
        parsedEndDate = parsedEndDate.add(parsedEndDate.timeZoneOffset);

        if (parsedEndDate.isAfter(DateTime.now()) &&
            parsedStartDate.isBefore(DateTime.now())) {
          active.add(quiz);
          endDate["${quiz.id}"] = parsedEndDate;
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

    print(active);
    print(past);
    print(other);

    emit(state.copyWith(
      isLoaded: true,
      active: active,
      past: past,
      other: other,
      endDate: endDate,
    ));
  }
}
