part of 'teacher_assignment_bloc.dart';

class TeacherAssignmentState extends Equatable {
  final String? token;
  static const storage = FlutterSecureStorage();
  final List<TAssignment> tAssignmentList;
  static const List<TAssignment> tAssignmentListDefault = [TAssignment.empty];

  const TeacherAssignmentState(
      {this.tAssignmentList = tAssignmentListDefault, this.token});

  TeacherAssignmentState copyWith(
      {List<TAssignment>? tAssignmentList, String? token}) {
    return TeacherAssignmentState(
      tAssignmentList: tAssignmentList ?? this.tAssignmentList,
      token: token ?? this.token,
    );
  }

  static Future<TeacherAssignmentState> load() async {
    var token = await storage.read(key: "token") as String;
    return TeacherAssignmentState(token: token);
  }

  @override
  List<Object?> get props => [tAssignmentList, token];
}
