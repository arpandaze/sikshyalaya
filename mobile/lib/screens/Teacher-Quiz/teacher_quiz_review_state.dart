part of 'teacher_quiz_review_bloc.dart';

class TeacherQuizReviewState extends Equatable {
  static const storage = FlutterSecureStorage();
  final List<Answer> reviewList;
  static const List<Answer> reviewListDefault = [Answer.empty];
  final bool isLoaded;

  const TeacherQuizReviewState({
    this.reviewList = reviewListDefault,
    this.isLoaded = false,
  });

  TeacherQuizReviewState copyWith({
    List<Answer>? reviewList,
    bool? isLoaded,
  }) {
    print(reviewList);
    return TeacherQuizReviewState(
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
