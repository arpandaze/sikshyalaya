part of 'student_quiz_bloc.dart';

class StudentQuizState extends Equatable {
  static const storage = FlutterSecureStorage();
  final List<Quiz>? active;
  final List<Quiz>? past;
  final List<Quiz>? other;
  static const defaultQuiz = [Quiz.empty];
  final bool isLoaded;
  final Map endDate;
  static const defaultDuration = {};

  const StudentQuizState({
    this.active = defaultQuiz,
    this.past = defaultQuiz,
    this.other = defaultQuiz,
    this.isLoaded = false,
    this.endDate = defaultDuration,
  });

  StudentQuizState copyWith({
    String? token,
    List<Quiz>? active,
    List<Quiz>? past,
    List<Quiz>? other,
    bool? isLoaded,
    Map? endDate,
  }) {
    return StudentQuizState(
      isLoaded: isLoaded ?? this.isLoaded,
      active: active ?? this.active,
      past: past ?? this.past,
      other: other ?? this.other,
      endDate: endDate ?? this.endDate,
    );
  }

  // static Future<StudentQuizState> load() async {
  //   var token = await storage.read(key: "token") as String;

  //   return StudentQuizState(token: token);
  // }

  @override
  List<Object?> get props => [
        active,
        other,
        past,
      ];
}
