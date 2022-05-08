import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/repository/models/teacher_note.dart';
import 'package:sikshyalaya/repository/teacher_note.dart';

part 'teacher_notes_state.dart';
part 'teacher_notes_event.dart';

class TeacherNoteBloc extends Bloc<TeacherNoteEvent, TeacherNoteState> {
  final int? userId;
  TeacherNoteBloc({required this.teacherNoteRepository, this.userId})
      : super(const TeacherNoteState()) {
    on<GetTeacherNote>(_onGetTeacherNote);
    on<ToggleEditor>(_onToggleEditor);
    on<PostTeacherNote>(_onPostTeacherNote);
    on<EditTeacherNote>(_onEditTeacherNote);
    on<DeleteTeacherNote>(_onDeleteTeacherNote);
    add(
      GetTeacherNote(url: 'personal_note'),
    );
  }

  final TeacherNoteRepository teacherNoteRepository;

  void _onGetTeacherNote(
      GetTeacherNote event, Emitter<TeacherNoteState> emit) async {
    final teacherNote = await teacherNoteRepository.getTeacherNote(
      url: event.url,
    );
    print(teacherNote[0].last_updated_time);
    emit(
      state.copyWith(
        isLoaded: true,
        recentList: teacherNote.sublist(
            teacherNote.length - 2 > 0 ? teacherNote.length - 2 : 0,
            teacherNote.length),
        noteList: teacherNote.sublist(0, teacherNote.length - 1),
      ),
    );
    print(teacherNote[0].title);
  }

  void _onToggleEditor(
      ToggleEditor event, Emitter<TeacherNoteState> emit) async {
    emit(
      state.copyWith(
        isEditor: !state.isEditor,
        eMode: event.mode,
        currentNote: event.cNote,
      ),
    );
  }

  void _onPostTeacherNote(
      PostTeacherNote event, Emitter<TeacherNoteState> emit) async {
    var newNote = {
      "user_id": userId,
      "title": event.ctitle,
      "content": event.cContent,
      "tags": [],
    };

    var returnNote = await teacherNoteRepository.submitNotes(
      url: event.postUrl,
      body: newNote,
    );

    add(ToggleEditor());
    add(GetTeacherNote(url: 'personal_note'));
  }

  void _onEditTeacherNote(
      EditTeacherNote event, Emitter<TeacherNoteState> emit) async {
    var newNote = {
      "user_id": userId,
      "title": event.ctitle,
      "content": event.cContent,
      "tags": [],
    };

    var returnNote = await teacherNoteRepository.editNotes(
      url: event.postUrl,
      body: newNote,
    );

    add(ToggleEditor());
    add(GetTeacherNote(url: 'personal_note'));
  }

  void _onDeleteTeacherNote(
      DeleteTeacherNote event, Emitter<TeacherNoteState> emit) async {
    var returnNote = await teacherNoteRepository.deleteNotes(
      url: event.postUrl,
    );

    add(ToggleEditor());
    add(GetTeacherNote(url: 'personal_note'));
  }
}
