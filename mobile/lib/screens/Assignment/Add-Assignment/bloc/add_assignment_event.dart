part of 'add_assignment_bloc.dart';

abstract class AddAssignmentEvent extends Equatable {
  const AddAssignmentEvent();

  @override
  List<Object?> get props => [];
}

class StartTimeChanged extends AddAssignmentEvent {
  final String? start_time;
  StartTimeChanged({this.start_time});

  @override
  List<Object?> get props => [start_time];
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

class MarksChanged extends AddAssignmentEvent {
  final int? marks;
  MarksChanged({this.marks});

  @override
  List<Object?> get props => [marks];
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

class FetchInstructor extends AddAssignmentEvent {}

class FetchCourse extends AddAssignmentEvent {}

class FetchGroup extends AddAssignmentEvent {}

class Submit extends AddAssignmentEvent {}
