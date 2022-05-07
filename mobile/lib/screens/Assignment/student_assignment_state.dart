part of 'student_assignment_bloc.dart';

class StudentAssignmentState extends Equatable {
  static const storage = FlutterSecureStorage();
  final List<Assignment> assignmentList;
  final List<Assignment> dueAssignmentList;
  final List<Assignment> missedAssignmentList;
  final List<Assignment> submittedAssignmentList;
  static const List<Assignment> assignmentListDefault = [Assignment.empty];

  final Map assignmentUpload;
  final bool assignmentUploadLoading;
  final bool isLoaded;

  const StudentAssignmentState({
    this.assignmentList = assignmentListDefault,
    this.dueAssignmentList = assignmentListDefault,
    this.missedAssignmentList = assignmentListDefault,
    this.submittedAssignmentList = assignmentListDefault,
    this.isLoaded = false,
    this.assignmentUpload = const {},
    this.assignmentUploadLoading = false,
  });

  StudentAssignmentState copyWith({
    List<Assignment>? assignmentList,
    List<Assignment>? dueAssignmentList,
    List<Assignment>? missedAssignmentList,
    List<Assignment>? submittedAssignmentList,
    Map? assignmentUpload,
    bool? assignmentUploadLoading,
    bool? isLoaded,
  }) {
    return StudentAssignmentState(
        assignmentList: assignmentList ?? this.assignmentList,
        dueAssignmentList: dueAssignmentList ?? this.dueAssignmentList,
        missedAssignmentList: missedAssignmentList ?? this.missedAssignmentList,
        submittedAssignmentList:
            submittedAssignmentList ?? this.submittedAssignmentList,
        isLoaded: isLoaded ?? this.isLoaded,
        assignmentUpload: assignmentUpload ?? this.assignmentUpload,
        assignmentUploadLoading:
            assignmentUploadLoading ?? this.assignmentUploadLoading);
  }

  // static Future<StudentAssignmentState> load() async {
  //   var token = await storage.read(key: "token") as String;
  //   return StudentAssignmentState(token: token);
  // }

  @override
  List<Object?> get props => [
        assignmentList,
        dueAssignmentList,
        missedAssignmentList,
        submittedAssignmentList,
        isLoaded,
        assignmentUpload,
        assignmentUploadLoading,
      ];
}
