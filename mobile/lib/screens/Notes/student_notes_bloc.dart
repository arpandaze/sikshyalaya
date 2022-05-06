import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/repository/models/student_note.dart';
import 'package:sikshyalaya/repository/student_note.dart';
import 'package:sikshyalaya/screens/Dashboard/student_dashboard.dart';

part 'students_notes_state.dart';
part 'student_notes_event.dart';

class StudentNoteBloc extends Bloc<StudentNoteEvent, StudentNoteState> {
  final int? userId;
  StudentNoteBloc({required this.studentNoteRepository, this.userId})
      : super(const StudentNoteState()) {
    on<GetStudentNote>(_onGetStudentNote);
    on<ToggleEditor>(_onToggleEditor);
    on<PostStudentNote>(_onPostStudentNote);
    on<EditStudentNote>(_onEditStudentNote);
    on<DeleteStudentNote>(_onDeleteStudentNote);
    add(
      GetStudentNote(url: 'personal_note'),
    );
  }

  final StudentNoteRepository studentNoteRepository;

  void _onGetStudentNote(
      GetStudentNote event, Emitter<StudentNoteState> emit) async {
    final studentNote = await studentNoteRepository.getStudentNote(
      url: event.url,
    );

    emit(
      state.copyWith(
        isLoaded: true,
        recentList: studentNote.sublist(
            studentNote.length - 2 > 0 ? studentNote.length - 2 : 0,
            studentNote.length),
        noteList: studentNote.sublist(0, studentNote.length - 1),
      ),
    );
  }

  void _onToggleEditor(
      ToggleEditor event, Emitter<StudentNoteState> emit) async {
    emit(
      state.copyWith(
        isEditor: !state.isEditor,
        eMode: event.mode,
        currentNote: event.cNote,
      ),
    );
  }

  void _onPostStudentNote(
      PostStudentNote event, Emitter<StudentNoteState> emit) async {
    var newNote = {
      "user_id": userId,
      "title": event.ctitle,
      "content": event.cContent,
      "tags": [],
    };

    var returnNote = await studentNoteRepository.submitNotes(
      url: event.postUrl,
      body: newNote,
    );

    add(ToggleEditor());
    add(GetStudentNote(url: 'personal_note'));
  }

  void _onEditStudentNote(
      EditStudentNote event, Emitter<StudentNoteState> emit) async {
    var newNote = {
      "user_id": userId,
      "title": event.ctitle,
      "content": event.cContent,
      "tags": [],
    };

    var returnNote = await studentNoteRepository.editNotes(
      url: event.postUrl,
      body: newNote,
    );

    add(ToggleEditor());
    add(GetStudentNote(url: 'personal_note'));
  }

  void _onDeleteStudentNote(
      DeleteStudentNote event, Emitter<StudentNoteState> emit) async {
    var returnNote = await studentNoteRepository.deleteNotes(
      url: event.postUrl,
    );

    add(ToggleEditor());
    add(GetStudentNote(url: 'personal_note'));
  }
}
