part of 'student_assignment_bloc.dart';

class StudentAssignmentState extends Equatable {
  final String? token;
  static const storage = FlutterSecureStorage();
  final List<Assignment> assignmentList;
  static const List<Assignment> assignmentListDefault = [Assignment.empty];
  final bool isLoaded;

  const StudentAssignmentState(
      {this.assignmentList = assignmentListDefault,
      this.token,
      this.isLoaded = false});

  StudentAssignmentState copyWith({
    List<Assignment>? assignmentList,
    String? token,
    bool? isLoaded,
  }) {
    return StudentAssignmentState(
        assignmentList: assignmentList ?? this.assignmentList,
        token: token ?? this.token,
        isLoaded: isLoaded ?? this.isLoaded);
  }

  static Future<StudentAssignmentState> load() async {
    var token = await storage.read(key: "token") as String;
    return StudentAssignmentState(token: token);
  }

  @override
  List<Object?> get props => [assignmentList, token];
}
