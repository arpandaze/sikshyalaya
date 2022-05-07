import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/repository/models/teacher_quiz.dart';
import 'package:sikshyalaya/repository/teacher_quiz.dart';

part 'teacher_quiz_event.dart';
part 'teacher_quiz_state.dart';

class TeacherQuizBloc extends Bloc<TeacherQuizEvent, TeacherQuizState> {
  TeacherQuizBloc({required this.teacherQuizRepository})
      : super(const TeacherQuizState()) {
    on<GetTeacherQuiz>(_getTeacherQuiz);
    on<DeleteQuiz>(_onDeleteQuiz);
  }

  final TeacherQuizRepository teacherQuizRepository;

  void _getTeacherQuiz(
      GetTeacherQuiz event, Emitter<TeacherQuizState> emit) async {
    print("GetQuiz");


    final teacherQuiz = await teacherQuizRepository.getTeacherQuiz(
        url: event.url);

    var active = [TQuiz.empty];
    var past = [TQuiz.empty];
    var other = [TQuiz.empty];

    for (var quiz in teacherQuiz) {
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
        active: active, past: past, other: other));
  }

  void _onDeleteQuiz(DeleteQuiz event, Emitter<TeacherQuizState> emit) async {
    var returnQuiz = await teacherQuizRepository.deleteQuiz(
      quiz_id: event.quiz_id,
    );
    print(returnQuiz);
  }
}
