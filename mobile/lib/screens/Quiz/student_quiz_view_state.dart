part of 'student_quiz_view_bloc.dart';

class StudentQuizViewState extends Equatable {
  static const storage = FlutterSecureStorage();
  final String? token;
  final List<QuizView> quizViews;
  // final List<Quiz>? active;
  // final List<Quiz>? past;
  // final List<Quiz>? other;
  static const defaultQuizViews = [QuizView.empty];

  const StudentQuizViewState({
    this.token,
    this.quizViews = defaultQuizViews,
  });

  StudentQuizViewState copyWith({String? token, List<QuizView>? quizViews}) {
    return StudentQuizViewState(
        token: token ?? this.token, quizViews: quizViews ?? this.quizViews);
  }

  static Future<StudentQuizViewState> load() async {
    var token = await storage.read(key: "token") as String;

    return StudentQuizViewState(token: token);
  }

  @override
  List<Object?> get props => [token, quizViews];
}
