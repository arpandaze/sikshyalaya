part of 'teacher_dashboard_bloc.dart';

abstract class TeacherDashboardEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetTeacherDash extends TeacherDashboardEvent {
  final String url;

  GetTeacherDash({required this.url});
  @override
  List<Object> get props => [url];
}
