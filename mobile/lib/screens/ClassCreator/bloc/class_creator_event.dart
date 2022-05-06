part of 'class_creator_bloc.dart';

abstract class ClassCreatorEvent extends Equatable {
  const ClassCreatorEvent();

  @override
  List<Object?> get props => [];
}

class InstructorChanged extends ClassCreatorEvent {
  final List<Instructor>? instructor;
  InstructorChanged({this.instructor});

  @override
  List<Object?> get props => [instructor];
}

class StartTimeChanged extends ClassCreatorEvent {
  final String? start_time;
  StartTimeChanged({this.start_time});

  @override
  List<Object?> get props => [start_time];
}

class EndTimeChanged extends ClassCreatorEvent {
  final String? end_time;
  EndTimeChanged({this.end_time});

  @override
  List<Object?> get props => [end_time];
}

class GroupChanged extends ClassCreatorEvent {
  final int? group;
  GroupChanged({this.group});

  @override
  List<Object?> get props => [group];
}

class DescriptionChanged extends ClassCreatorEvent {
  final String? description;
  DescriptionChanged({this.description});

  @override
  List<Object?> get props => [description];
}

class FileChanged extends ClassCreatorEvent {
  final List<String>? file;
  FileChanged({this.file});

  @override
  List<Object?> get props => [file];
}

class FetchInstructor extends ClassCreatorEvent {}

class FetchGroup extends ClassCreatorEvent {}

class Submit extends ClassCreatorEvent {}
