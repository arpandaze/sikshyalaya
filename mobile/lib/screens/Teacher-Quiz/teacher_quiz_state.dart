part of 'teacher_quiz_bloc.dart';

class TeacherQuizState extends Equatable {
  static const storage = FlutterSecureStorage();
  final String? token;
  final List<TQuiz>? active;
  final List<TQuiz>? past;
  final List<TQuiz>? other;
  static const defaultQuiz = [TQuiz.empty];

  const TeacherQuizState(
      {this.token,
      this.active = defaultQuiz,
      this.past = defaultQuiz,
      this.other = defaultQuiz});

  TeacherQuizState copyWith(
      {String? token,
      List<TQuiz>? active,
      List<TQuiz>? past,
      List<TQuiz>? other}) {
    return TeacherQuizState(
        token: token ?? this.token,
        active: active ?? this.active,
        past: past ?? this.past,
        other: other ?? this.other);
  }

  static Future<TeacherQuizState> load() async {
    var token = await storage.read(key: "token") as String;

    return TeacherQuizState(token: token);
  }

  @override
  List<Object?> get props => [active, other, past, token];
}
