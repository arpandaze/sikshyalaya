import 'package:json_annotation/json_annotation.dart';
import 'package:sikshyalaya/repository/models/course.dart';
import 'package:sikshyalaya/repository/models/file.dart';
import 'package:sikshyalaya/repository/models/instructor.dart';
import 'package:sikshyalaya/repository/models/group.dart';

part 'teacher_assignment.g.dart';

@JsonSerializable()
class TAssignment {
  final int? id;
  final int? marks;
  final String? due_date;
  final List<String>? files;
  final String? title;
  final String? contents;
  final List<Instructor>? instructor;
  final Course? course;
  final List<Group>? group;

  const TAssignment({
    this.id,
    this.due_date,
    this.files,
    this.title,
    this.contents,
    this.marks,
    this.instructor,
    this.course,
    this.group,
  });

  static const empty = TAssignment(
    id: 0,
    due_date: "",
    files: null,
    title: '',
    contents: '',
    marks: 0,
    instructor: [Instructor.empty],
    course: Course.empty,
    group: [Group.empty],
  );

  factory TAssignment.fromJson(Map<String, dynamic> json) =>
      _$TAssignmentFromJson(json);

  List<Object?> get props => [
        id,
        due_date,
        files,
        title,
        contents,
        marks,
        instructor,
        course,
        group,
      ];
}
