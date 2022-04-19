part of 'teacher_dashboard_bloc.dart';

class TeacherDashboardState extends Equatable {
  final TeacherClassSession ongoing;
  final List<TeacherClassSession> upcoming;
  final String? token;
  static const storage = FlutterSecureStorage();
  static const TeacherClassSession defaultOngoing = TeacherClassSession.empty;
  static const List<TeacherClassSession> defaultUpcoming = [
    TeacherClassSession.empty
  ];

  const TeacherDashboardState(
      {this.ongoing = defaultOngoing,
      this.upcoming = defaultUpcoming,
      this.token});

  TeacherDashboardState copyWith(
      {TeacherClassSession? ongoing,
      List<TeacherClassSession>? upcoming,
      String? token}) {
    return TeacherDashboardState(
      ongoing: ongoing ?? this.ongoing,
      upcoming: upcoming ?? this.upcoming,
      token: token ?? this.token,
    );
  }

  static Future<TeacherDashboardState> load() async {
    var token = await storage.read(key: "token") as String;

    return TeacherDashboardState(token: token);
  }

  @override
  List<Object?> get props => [ongoing, upcoming, token];
}
