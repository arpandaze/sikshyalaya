import 'package:equatable/equatable.dart';
import 'dart:convert';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/repository/models/answer.dart';
import 'package:sikshyalaya/repository/models/student_assignment.dart';
import 'package:sikshyalaya/repository/models/submitted_assignment.dart';
import 'package:sikshyalaya/repository/teacher_assignment_review.dart';
import 'package:sikshyalaya/repository/teacher_quiz_review.dart';
import 'package:sikshyalaya/repository/student_assignment.dart';

part 'teacher_assignment_review_state.dart';
part 'teacher_assignment_review_event.dart';

class TeacherAssignmentReviewBloc
    extends Bloc<TeacherAssignmentReviewEvent, TeacherAssignmentReviewState> {
  TeacherAssignmentReviewBloc(
      {required this.teacherAssignmentReviewRepository,
      required this.assignmentId})
      : super(const TeacherAssignmentReviewState()) {
    on<GetTeacherAssignmentReview>(_onGetTeacherAssignmentReview);

    add(
      GetTeacherAssignmentReview(assignmentId: assignmentId),
    );
  }

  final TeacherAssignmentReviewRepository teacherAssignmentReviewRepository;
  final int assignmentId;

  void _onGetTeacherAssignmentReview(GetTeacherAssignmentReview event,
      Emitter<TeacherAssignmentReviewState> emit) async {
    final teacherAssignmentReview =
        await teacherAssignmentReviewRepository.getTeacherAssignmentReview(
      assignmentId: event.assignmentId,
    );
    print("2");
    print(teacherAssignmentReview);
    emit(state.copyWith(
      isLoaded: true,
      reviewList: teacherAssignmentReview,
    ));
  }
}
