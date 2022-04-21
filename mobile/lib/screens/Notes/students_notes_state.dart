part of 'student_notes_bloc.dart';

class StudentNoteState extends Equatable {
  final String? token;
  static const storage = FlutterSecureStorage();
  final List<Note> recentList;
  static const List<Note> recentListDefault = [Note.empty];
  final List<Note> noteList;
  static const List<Note> noteListDefault = [Note.empty];
  final bool isLoaded;

  const StudentNoteState({
    this.recentList = recentListDefault,
    this.noteList = noteListDefault,
    this.token,
    this.isLoaded = false,
  });

  StudentNoteState copyWith({
    List<Note>? recentList,
    List<Note>? noteList,
    String? token,
    bool? isLoaded,
  }) {
    return StudentNoteState(
      recentList: recentList ?? this.recentList,
      noteList: noteList ?? this.noteList,
      token: token ?? this.token,
      isLoaded: isLoaded ?? this.isLoaded,
    );
  }

  static Future<StudentNoteState> load() async {
    var token = await storage.read(key: "token") as String;
    return StudentNoteState(token: token);
  }

  @override
  List<Object?> get props => [recentList, noteList, token];
}
