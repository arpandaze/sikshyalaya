part of 'teacher_quiz_bloc.dart';

class TeacherQuizState extends Equatable {
  static const storage = FlutterSecureStorage();
  final List<TQuiz>? active;
  final List<TQuiz>? past;
  final List<TQuiz>? other;
  static const defaultQuiz = [TQuiz.empty];

  const TeacherQuizState(
      {
      this.active = defaultQuiz,
      this.past = defaultQuiz,
      this.other = defaultQuiz});

  TeacherQuizState copyWith(
      {String? token,
      List<TQuiz>? active,
      List<TQuiz>? past,
      List<TQuiz>? other}) {
    return TeacherQuizState(
        active: active ?? this.active,
        past: past ?? this.past,
        other: other ?? this.other);
  }

  
  @override
  List<Object?> get props => [active, other, past];
}
