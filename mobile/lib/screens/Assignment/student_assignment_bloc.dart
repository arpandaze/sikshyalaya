import 'package:equatable/equatable.dart';
import 'dart:convert';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/repository/models/student_assignment.dart';
import 'package:sikshyalaya/repository/student_assignment.dart';

part 'student_assignment_state.dart';
part 'student_assignment_event.dart';

class StudentAssignmentBloc
    extends Bloc<StudentAssignmentEvent, StudentAssignmentState> {
  StudentAssignmentBloc({required this.studentAssignmentRepository})
      : super(const StudentAssignmentState()) {
    on<GetStudentAssignment>(_onGetStudentAssignment);
  }

  final StudentAssignmentRepository studentAssignmentRepository;

  void _onGetStudentAssignment(
      GetStudentAssignment event, Emitter<StudentAssignmentState> emit) async {
    final newState = await StudentAssignmentState.load();
    final studentAssignment =
        await studentAssignmentRepository.getStudentAssignment(
      url: event.url,
      token: newState.token!,
    );
    emit(state.copyWith(
      isLoaded: true,
      assignmentList: studentAssignment,
      token: newState.token,
    ));
  }
}
