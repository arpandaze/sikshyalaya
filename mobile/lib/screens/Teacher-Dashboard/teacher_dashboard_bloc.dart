import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/repository/models/teacher_dash.dart';
import 'package:sikshyalaya/repository/teacher_dash.dart';

part 'teacher_dashboard_event.dart';
part 'teacher_dashboard_state.dart';

class TeacherDashboardBloc
    extends Bloc<TeacherDashboardEvent, TeacherDashboardState> {
  TeacherDashboardBloc({required this.teacherDashboardRepository})
      : super(const TeacherDashboardState()) {
    on<GetTeacherDash>(_onGetTeacherDash);
  }

  final TeacherDashboardRepository teacherDashboardRepository;

  void _onGetTeacherDash(
      GetTeacherDash event, Emitter<TeacherDashboardState> emit) async {
    final newState = await TeacherDashboardState.load();
    final teacherDash = await teacherDashboardRepository.getTeacherDashboard(
        url: event.url, token: newState.token!);

    int index = 0;
    for (int i = 0; i < teacherDash.length; i++) {
      final parsedStartDate = DateTime.tryParse(teacherDash[i].start_time!);
      final parsedEndDate = DateTime.tryParse(teacherDash[i].end_time!);

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
          ongoing: teacherDash.removeAt(index),
          upcoming: teacherDash,
          token: newState.token),
    );
  }
}
