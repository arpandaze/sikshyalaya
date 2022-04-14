part of 'student_assignment_bloc.dart';

class StudentAssignmentState extends Equatable {
  final String? token;
  static const storage = FlutterSecureStorage();
  final List<Assignment> assignmentList;
  static const List<Assignment> assignmentListDefault = [Assignment.empty];

  const StudentAssignmentState(
      {this.assignmentList = assignmentListDefault, this.token});

  StudentAssignmentState copyWith(
      {List<Assignment>? assignmentList, String? token}) {
    return StudentAssignmentState(
      assignmentList: assignmentList ?? this.assignmentList,
      token: token ?? this.token,
    );
  }

  static Future<StudentAssignmentState> load() async {
    var token = await storage.read(key: "token") as String;
    return StudentAssignmentState(token: token);
  }

  @override
  List<Object?> get props => [assignmentList, token];
}
