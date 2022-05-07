import 'package:equatable/equatable.dart';
import 'dart:convert';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/repository/models/answer.dart';
import 'package:sikshyalaya/repository/models/student_assignment.dart';
import 'package:sikshyalaya/repository/teacher_quiz_review.dart';
import 'package:sikshyalaya/repository/student_assignment.dart';

part 'teacher_quiz_review_state.dart';
part 'teacher_quiz_review_event.dart';

class TeacherQuizReviewBloc
    extends Bloc<TeacherQuizReviewEvent, TeacherQuizReviewState> {
  TeacherQuizReviewBloc(
      {required this.teacherQuizReviewRepository, required this.quizId})
      : super(const TeacherQuizReviewState()) {
    on<GetTeacherQuizReview>(_onGetTeacherQuizReview);

    add(
      GetTeacherQuizReview(quizId: quizId),
    );
  }

  final TeacherQuizReviewRepository teacherQuizReviewRepository;
  final int quizId;

  void _onGetTeacherQuizReview(
      GetTeacherQuizReview event, Emitter<TeacherQuizReviewState> emit) async {
    final teacherQuizReview =
        await teacherQuizReviewRepository.getTeacherQuizReview(
      quizId: event.quizId,
    );
    print("2");
    print(teacherQuizReview);
    emit(state.copyWith(
      isLoaded: true,
      reviewList: teacherQuizReview,
    ));
  }
}
