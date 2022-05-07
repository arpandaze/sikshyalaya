part of 'add_assignment_bloc.dart';

class AddAssignmentState extends Equatable {
  final String? end_time;
  final List<Group>? groupList;
  final List<Course>? courseList;
  final int? group;
  final int? course;
  final int? marks;
  final String? title;
  final String? description;
  final List<Object?> instructor;
  final List<Instructor>? instructorList;

  const AddAssignmentState({
    this.end_time = "",
    this.group = null,
    this.course = null,
    this.groupList = null,
    this.courseList = null,
    this.title = "",
    this.marks = null,
    this.description = "",
    this.instructor = const [],
    this.instructorList = null,
  });

  AddAssignmentState copyWith({
    String? end_time,
    int? group,
    int? course,
    int? marks,
    List<Group>? groupList,
    List<Course>? courseList,
    String? description,
    List<Object?>? instructor,
    List<Instructor>? instructorList,
    String? title,
  }) {
    return AddAssignmentState(
      end_time: end_time ?? this.end_time,
      group: group ?? this.group,
      course: course ?? this.course,
      marks: marks ?? this.marks,
      groupList: groupList ?? this.groupList,
      courseList: courseList ?? this.courseList,
      description: description ?? this.description,
      instructor: instructor ?? this.instructor,
      instructorList: instructorList ?? this.instructorList,
      title: title ?? this.title,
    );
  }

  @override
  List<Object?> get props => [
        end_time,
        group,
        course,
        marks,
        groupList,
        courseList,
        description,
        instructor,
        instructorList,
        title
      ];
}
