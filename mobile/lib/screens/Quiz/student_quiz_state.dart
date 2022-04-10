part of 'student_quiz_bloc.dart';

class StudentQuizState extends Equatable {
  static const storage = FlutterSecureStorage();
  final String? token;
  final List<Quiz>? active;
  final List<Quiz>? past;
  final List<Quiz>? other;
  static const defaultQuiz = [Quiz.empty];

  const StudentQuizState(
      {this.token,
      this.active = defaultQuiz,
      this.past = defaultQuiz,
      this.other = defaultQuiz});

  StudentQuizState copyWith(
      {String? token,
      List<Quiz>? active,
      List<Quiz>? past,
      List<Quiz>? other}) {
    return StudentQuizState(
        token: token ?? this.token,
        active: active ?? this.active,
        past: past ?? this.past,
        other: other ?? this.other);
  }

  static Future<StudentQuizState> load() async {
    var token = await storage.read(key: "token") as String;

    return StudentQuizState(token: token);
  }

  @override
  List<Object?> get props => [active, other, past, token];
}
