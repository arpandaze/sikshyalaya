part of 'student_quiz_view_bloc.dart';

class StudentQuizViewState extends Equatable {
  static const storage = FlutterSecureStorage();
  final String? token;
  final List<QuizView> quizViews;
  final QuizAnswer quizAnswer;
  final bool answerExists;

  static const defaultQuizViews = [QuizView.empty];
  static const defaultQuizAnswer = QuizAnswer.empty;

  const StudentQuizViewState({
    this.token,
    this.quizViews = defaultQuizViews,
    this.quizAnswer = defaultQuizAnswer,
    this.answerExists = false,
  });

  StudentQuizViewState copyWith(
      {String? token,
      List<QuizView>? quizViews,
      QuizAnswer? quizAnswer,
      bool? answerExists}) {
    return StudentQuizViewState(
      token: token ?? this.token,
      quizViews: quizViews ?? this.quizViews,
      quizAnswer: quizAnswer ?? this.quizAnswer,
      answerExists: answerExists ?? this.answerExists,
    );
  }

  static Future<StudentQuizViewState> load() async {
    var token = await storage.read(key: "token") as String;

    return StudentQuizViewState(token: token);
  }

  @override
  List<Object?> get props => [token, quizViews];
}
