part of 'student_notes_bloc.dart';

class StudentNoteState extends Equatable {
  final List<Note> noteList;

  static const List<Note> noteListDefault = [Note.empty];
  StudentNoteState({this.noteList = noteListDefault});

  StudentNoteState copyWith({List<Note>? noteList}) {
    return StudentNoteState(
      noteList: noteList ?? this.noteList,
    );
  }

  @override
  List<Object?> get props => [];
}
