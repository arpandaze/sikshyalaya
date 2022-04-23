part of 'student_assignment_bloc.dart';

class StudentAssignmentState extends Equatable {
  static const storage = FlutterSecureStorage();
  final List<Assignment> assignmentList;
  static const List<Assignment> assignmentListDefault = [Assignment.empty];
  final bool isLoaded;

  const StudentAssignmentState({
    this.assignmentList = assignmentListDefault,
    this.isLoaded = false,
  });

  StudentAssignmentState copyWith({
    List<Assignment>? assignmentList,
    bool? isLoaded,
  }) {
    return StudentAssignmentState(
        assignmentList: assignmentList ?? this.assignmentList,
        isLoaded: isLoaded ?? this.isLoaded);
  }

  // static Future<StudentAssignmentState> load() async {
  //   var token = await storage.read(key: "token") as String;
  //   return StudentAssignmentState(token: token);
  // }

  @override
  List<Object?> get props => [assignmentList];
}
