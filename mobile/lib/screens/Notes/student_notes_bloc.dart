import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/repository/models/student_note.dart';
import 'package:sikshyalaya/repository/student_note.dart';

part 'students_notes_state.dart';
part 'student_notes_event.dart';

class StudentNoteBloc extends Bloc<StudentNoteEvent, StudentNoteState> {
  final StudentNoteRepository sNRepo;
  StudentNoteBloc({required this.sNRepo}) : super(StudentNoteState()) {
    on<GetStudentNote>(_onGetStudentNote);
  }
  _onGetStudentNote(
      GetStudentNote event, Emitter<StudentNoteState> emit) async {
    final List<Note> notes = await sNRepo.getStudentNote(url: event.url);
    emit(state.copyWith(noteList: notes));
  }
}
