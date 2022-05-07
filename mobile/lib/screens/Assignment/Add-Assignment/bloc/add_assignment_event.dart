part of 'add_assignment_bloc.dart';

abstract class AddAssignmentEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class StartTimeChanged extends AddAssignmentEvent {
  final String? start_time;
  StartTimeChanged({this.start_time});

  @override
  List<Object?> get props => [start_time];
}

class Success extends AddAssignmentEvent {
  final bool? success;
  Success({this.success});

  @override
  List<Object?> get props => [success];
}

class EndTimeChanged extends AddAssignmentEvent {
  final String? end_time;
  EndTimeChanged({this.end_time});

  @override
  List<Object?> get props => [end_time];
}

class GroupChanged extends AddAssignmentEvent {
  final int? group;
  GroupChanged({this.group});

  @override
  List<Object?> get props => [group];
}

class InstructorChanged extends AddAssignmentEvent {
  final List<Object?> instructor;
  InstructorChanged({this.instructor = const []});

  @override
  List<Object?> get props => [instructor];
}

class CourseChanged extends AddAssignmentEvent {
  final int? course;
  CourseChanged({this.course});

  @override
  List<Object?> get props => [course];
}

class DescriptionChanged extends AddAssignmentEvent {
  final String? description;
  DescriptionChanged({this.description});

  @override
  List<Object?> get props => [description];
}

class TitleChanged extends AddAssignmentEvent {
  final String? title;
  TitleChanged({this.title});

  @override
  List<Object?> get props => [title];
}

class NewFilePicked extends AddAssignmentEvent {
  final List<File> file;
  final List<String?> paths;
  NewFilePicked({required this.file, required this.paths});

  @override
  List<Object> get props => [file, paths];
}

class RemoveFile extends AddAssignmentEvent {
  final int index;

  RemoveFile({required this.index});

  @override
  List<Object> get props => [index];
}

class SubmitAssignment extends AddAssignmentEvent {
  final int assignmentid;

  SubmitAssignment({required this.assignmentid});

  @override
  List<Object> get props => [assignmentid];
}

class FetchInstructor extends AddAssignmentEvent {}

class FetchCourse extends AddAssignmentEvent {}

class FetchGroup extends AddAssignmentEvent {}

class Submit extends AddAssignmentEvent {}
