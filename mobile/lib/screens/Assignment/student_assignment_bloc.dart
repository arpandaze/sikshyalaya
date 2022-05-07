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
    on<GetStudentAssignmentUploads>(_onGetStudentAssignmentUploads);

    add(
      GetStudentAssignment(url: 'assignment'),
    );
  }

  final StudentAssignmentRepository studentAssignmentRepository;

  void _onGetStudentAssignment(
      GetStudentAssignment event, Emitter<StudentAssignmentState> emit) async {
    final studentAssignment =
        await studentAssignmentRepository.getStudentAssignment(
      url: event.url,
    );

    var submittedAssignmentList = [Assignment.empty];
    var dueAssignmentList = [Assignment.empty];
    var missedAssignmentList = [Assignment.empty];

    for (var assignment in studentAssignment) {
      if (assignment.exists) {
        submittedAssignmentList.add(assignment);
      } else {
        var parsedDueDate = DateTime.tryParse(assignment.due_date!);
        if (parsedDueDate != null) {
          parsedDueDate = parsedDueDate.add(parsedDueDate.timeZoneOffset);
          if (parsedDueDate.isAfter(DateTime.now())) {
            dueAssignmentList.add(assignment);
          } else {
            missedAssignmentList.add(assignment);
          }
        }
      }
    }

    if (missedAssignmentList.length != 1) missedAssignmentList.removeAt(0);
    if (dueAssignmentList.length != 1) dueAssignmentList.removeAt(0);
    if (submittedAssignmentList.length != 1) {
      submittedAssignmentList.removeAt(0);
    }

    emit(state.copyWith(
      isLoaded: true,
      assignmentList: studentAssignment,
      missedAssignmentList: missedAssignmentList,
      dueAssignmentList: dueAssignmentList,
      submittedAssignmentList: submittedAssignmentList,
    ));
  }

  void _onGetStudentAssignmentUploads(GetStudentAssignmentUploads event,
      Emitter<StudentAssignmentState> emit) async {
    print("Here");
    final studentAssignmentUpload = await studentAssignmentRepository
        .getStudentAssignmentUploads(assignmentid: event.assignmentid);

    emit(
      state.copyWith(
        assignmentUpload: studentAssignmentUpload,
        assignmentUploadLoading: true,
      ),
    );
  }
}
