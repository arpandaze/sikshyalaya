part of 'teacher_notes_bloc.dart';

class TeacherNoteState extends Equatable {
  static const storage = FlutterSecureStorage();
  final List<Note> recentList;
  static const List<Note> recentListDefault = [Note.empty];
  final List<Note> noteList;
  static const List<Note> noteListDefault = [Note.empty];
  final bool isLoaded;
  final bool isEditor;
  final Note currentNote;
  final int? eMode;

  const TeacherNoteState({
    this.recentList = recentListDefault,
    this.noteList = noteListDefault,
    this.isLoaded = false,
    this.isEditor = false,
    this.currentNote = Note.empty,
    this.eMode,
  });

  TeacherNoteState copyWith({
    List<Note>? recentList,
    List<Note>? noteList,
    bool? isLoaded,
    bool? isEditor,
    Note? currentNote,
    int? eMode,
  }) {
    return TeacherNoteState(
      recentList: recentList ?? this.recentList,
      noteList: noteList ?? this.noteList,
      isLoaded: isLoaded ?? this.isLoaded,
      isEditor: isEditor ?? this.isEditor,
      currentNote: currentNote ?? this.currentNote,
      eMode: eMode ?? this.eMode,
    );
  }

  // static Future<TeacherNoteState> load() async {
  //   var token = await storage.read(key: "token") as String;
  //   return TeacherNoteState(token: token);
  // }

  @override
  List<Object?> get props => [
        recentList,
        noteList,
        isLoaded,
        isEditor,
        currentNote,
      ];
}
