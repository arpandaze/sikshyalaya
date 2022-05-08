part of 'teacher_notes_bloc.dart';

abstract class TeacherNoteEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetTeacherNote extends TeacherNoteEvent {
  final String url;

  GetTeacherNote({required this.url});

  @override
  List<Object> get props => [url];
}

class ToggleEditor extends TeacherNoteEvent {
  final Note cNote;
  final int mode;

  ToggleEditor({this.cNote = Note.empty, this.mode = 0});
}

class PostTeacherNote extends TeacherNoteEvent {
  final String postUrl;
  final int? userId;
  final String ctitle;
  final String cContent;

  PostTeacherNote({
    required this.postUrl,
    this.ctitle = "",
    this.cContent = "",
    this.userId,
  });

  @override
  List<Object> get props => [postUrl, ctitle, cContent];
}

class EditTeacherNote extends TeacherNoteEvent {
  final String postUrl;
  final int? userId;
  final String ctitle;
  final String cContent;

  EditTeacherNote({
    required this.postUrl,
    this.ctitle = "",
    this.cContent = "",
    this.userId,
  });

  @override
  List<Object> get props => [postUrl, ctitle, cContent];
}

class DeleteTeacherNote extends TeacherNoteEvent {
  final String postUrl;
  final int? userId;
  final String ctitle;
  final String cContent;

  DeleteTeacherNote({
    required this.postUrl,
    this.ctitle = "",
    this.cContent = "",
    this.userId,
  });

  @override
  List<Object> get props => [postUrl, ctitle, cContent];
}
