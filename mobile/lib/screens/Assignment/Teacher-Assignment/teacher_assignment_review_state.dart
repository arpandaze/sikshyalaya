part of 'teacher_assignment_review_bloc.dart';

class TeacherAssignmentReviewState extends Equatable {
  static const storage = FlutterSecureStorage();
  final List<SubmittedAssignment> reviewList;
  static const List<SubmittedAssignment> reviewListDefault = [
    SubmittedAssignment.empty
  ];
  final bool isLoaded;

  const TeacherAssignmentReviewState({
    this.reviewList = reviewListDefault,
    this.isLoaded = false,
  });

  TeacherAssignmentReviewState copyWith({
    List<SubmittedAssignment>? reviewList,
    bool? isLoaded,
  }) {
    print(reviewList);
    return TeacherAssignmentReviewState(
        reviewList: reviewList ?? this.reviewList,
        isLoaded: isLoaded ?? this.isLoaded);
  }

  // static Future<TeacherQuizReviewState> load() async {
  //   var token = await storage.read(key: "token") as String;
  //   return TeacherQuizReviewState(token: token);
  // }

  @override
  List<Object?> get props => [reviewList];
}
