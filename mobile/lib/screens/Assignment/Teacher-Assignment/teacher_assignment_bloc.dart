import 'package:equatable/equatable.dart';
import 'dart:convert';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/repository/models/teacher_assignment.dart';
import 'package:sikshyalaya/repository/teacher_assignment.dart';

part 'teacher_assignment_state.dart';
part 'teacher_assignment_event.dart';

class TeacherAssignmentBloc
    extends Bloc<TeacherAssignmentEvent, TeacherAssignmentState> {
  TeacherAssignmentBloc({required this.teacherAssignmentRepository})
      : super(const TeacherAssignmentState()) {
    on<GetTeacherAssignment>(_onGetTeacherAssignment);
  }

  final TeacherAssignmentRepository teacherAssignmentRepository;

  void _onGetTeacherAssignment(
      GetTeacherAssignment event, Emitter<TeacherAssignmentState> emit) async {
    final newState = await TeacherAssignmentState.load();
    final teacherAssignment =
        await teacherAssignmentRepository.getTeacherAssignment(
      url: event.url,
      token: newState.token!,
    );

    emit(state.copyWith(
        tAssignmentList: teacherAssignment, token: newState.token));
  }
}
