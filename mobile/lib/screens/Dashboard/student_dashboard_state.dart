part of 'student_dashboard_bloc.dart';

class StudentDashboardState extends Equatable {
  final ClassSession ongoing;
  final List<ClassSession> upcoming;
  final String? token;
  static const storage = FlutterSecureStorage();
  static const ClassSession defaultOngoing = ClassSession.empty;
  static const List<ClassSession> defaultUpcoming = [ClassSession.empty];

  const StudentDashboardState(
      {this.ongoing = defaultOngoing,
      this.upcoming = defaultUpcoming,
      this.token});

  StudentDashboardState copyWith(
      {ClassSession? ongoing, List<ClassSession>? upcoming, String? token}) {
    return StudentDashboardState(
      ongoing: ongoing ?? this.ongoing,
      upcoming: upcoming ?? this.upcoming,
      token: token ?? this.token,
    );
  }

  static Future<StudentDashboardState> load() async {
    var token = await storage.read(key: "token") as String;

    return StudentDashboardState(token: token);
  }

  @override
  List<Object?> get props => [ongoing, upcoming, token];
}
