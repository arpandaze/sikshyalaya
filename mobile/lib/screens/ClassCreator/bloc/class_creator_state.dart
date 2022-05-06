part of 'class_creator_bloc.dart';

class ClassCreatorState extends Equatable {
  final String? start_time;
  final String? end_time;
  final List<Group>? groupList;
  final int? group;
  final String? description;
  final List<Instructor>? instructor;
  final List<Instructor>? instructorList;
  final List<String>? files;

  const ClassCreatorState(
      {this.start_time = "",
      this.end_time = "",
      this.group,
      this.groupList,
      this.description,
      this.instructor = null,
      this.instructorList = null,
      this.files = null});

  ClassCreatorState copyWith({
    String? start_time,
    String? end_time,
    int? group,
    List<Group>? groupList,
    String? description,
    List<Instructor>? instructor,
    List<Instructor>? instructorList,
    List<String>? files,
  }) {
    return ClassCreatorState(
      description: description ?? this.description,
      start_time: start_time ?? this.start_time,
      end_time: end_time ?? this.end_time,
      group: group ?? this.group,
      groupList: groupList ?? this.groupList,
      instructor: instructor ?? this.instructor,
      instructorList: instructorList ?? this.instructorList,
      files: files ?? this.files,
    );
  }

  @override
  List<Object?> get props => [
        start_time,
        end_time,
        group,
        groupList,
        description,
        instructor,
        instructorList,
        files,
      ];
}
