import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/repository/models/student_dash.dart';
import 'package:sikshyalaya/repository/student_dash.dart';

part 'student_dashboard_event.dart';
part 'student_dashboard_state.dart';

class StudentDashboardBloc
    extends Bloc<StudentDashboardEvent, StudentDashboardState> {
  StudentDashboardBloc({
    required this.studentDashboardRepository,
  }) : super(const StudentDashboardState()) {
    on<GetStudentDash>(_onGetStudentDash);
    add(GetStudentDash());
  }

  final StudentDashboardRepository studentDashboardRepository;

  void _onGetStudentDash(
      GetStudentDash event, Emitter<StudentDashboardState> emit) async {
    final newState = await StudentDashboardState.load();
    final studentDash = await studentDashboardRepository.getStudentDashboard();

    int index = 0;
    for (int i = 0; i < studentDash.length; i++) {
      final parsedStartDate = DateTime.tryParse(studentDash[i].start_time!);
      final parsedEndDate = DateTime.tryParse(studentDash[i].end_time!);

      if (parsedEndDate != null || parsedStartDate != null) {
        if (parsedEndDate!.isAfter(DateTime.now()) &&
            parsedStartDate!.isBefore(DateTime.now())) {
          index = i;
          break;
        }
      }
    }
    emit(
      state.copyWith(
          ongoing: studentDash.removeAt(index),
          upcoming: studentDash,
          token: newState.token),
    );
  }
}

//   void _onShowingChanged(
//       OnShowingChanged event, Emitter<StudentDashboardState> emit) {
//     final Future<Map> getterOngoing;
//     if (event.showing == true) {
//       getterOngoing = getDashboardData();
//     } else {
//       getterOngoing = state.ongoing;
//     }

//     emit(state.copyWith(showing: event.showing));
//     emit(state.copyWith(ongoing: getterOngoing ?? ));
//   }
