part of 'student_notes_bloc.dart';

abstract class StudentNoteEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetStudentNote extends StudentNoteEvent {
  final String url;

  GetStudentNote({required this.url});

  @override
  List<Object> get props => [url];
}

class ToggleEditor extends StudentNoteEvent {
  final Note cNote;
  final int mode;

  ToggleEditor({this.cNote = Note.empty, this.mode = 0});
}

class PostStudentNote extends StudentNoteEvent {
  final String postUrl;
  final int? userId;
  final String ctitle;
  final String cContent;

  PostStudentNote({
    required this.postUrl,
    this.ctitle = "",
    this.cContent = "",
    this.userId,
  });

  @override
  List<Object> get props => [postUrl, ctitle, cContent];
}

class EditStudentNote extends StudentNoteEvent {
  final String postUrl;
  final int? userId;
  final String ctitle;
  final String cContent;

  EditStudentNote({
    required this.postUrl,
    this.ctitle = "",
    this.cContent = "",
    this.userId,
  });

  @override
  List<Object> get props => [postUrl, ctitle, cContent];
}

class DeleteStudentNote extends StudentNoteEvent {
  final String postUrl;
  final int? userId;
  final String ctitle;
  final String cContent;

  DeleteStudentNote({
    required this.postUrl,
    this.ctitle = "",
    this.cContent = "",
    this.userId,
  });

  @override
  List<Object> get props => [postUrl, ctitle, cContent];
}
