part of 'student_notes_bloc.dart';

class StudentNoteState extends Equatable {
  final String? token;
  static const storage = FlutterSecureStorage();
  final List<Note> noteList;
  static const List<Note> noteListDefault = [Note.empty];

  const StudentNoteState({this.noteList = noteListDefault, this.token});

  StudentNoteState copyWith({List<Note>? noteList, String? token}) {
    return StudentNoteState(
      noteList: noteList ?? this.noteList,
      token: token ?? this.token,
    );
  }

  static Future<StudentNoteState> load() async {
    var token = await storage.read(key: "token") as String;
    return StudentNoteState(token: token);
  }

  @override
  List<Object?> get props => [noteList, token];
}
