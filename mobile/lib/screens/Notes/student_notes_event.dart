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
