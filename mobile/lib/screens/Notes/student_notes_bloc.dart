import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:sikshyalaya/repository/models/student_note.dart';
import 'package:sikshyalaya/repository/student_note.dart';
import 'package:sikshyalaya/screens/Dashboard/student_dashboard.dart';

part 'students_notes_state.dart';
part 'student_notes_event.dart';

class StudentNoteBloc extends Bloc<StudentNoteEvent, StudentNoteState> {
  StudentNoteBloc({required this.studentNoteRepository})
      : super(const StudentNoteState()) {
    on<GetStudentNote>(_onGetStudentNote);

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
        recentList: studentNote.sublist(0, 2),
        noteList: studentNote.sublist(2, studentNote.length),
      ),
    );
  }
}
