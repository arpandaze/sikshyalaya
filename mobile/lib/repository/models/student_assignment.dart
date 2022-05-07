import 'package:json_annotation/json_annotation.dart';
import 'package:sikshyalaya/repository/models/course.dart';
import 'package:sikshyalaya/repository/models/file.dart';
import 'package:sikshyalaya/repository/models/instructor.dart';
import 'package:sikshyalaya/repository/models/group.dart';

part 'student_assignment.g.dart';

@JsonSerializable()
class Assignment {
//   [
//   {
//     "id": 0,
//     "due_date": "2022-04-09T08:11:16.695Z",
//     "marks": 0,
//     "title": "string",
//     "contents": "string",
//     "files": [
//       "string"
//     ],
//     "instructor": [
//       {
//         "id": 0,
//         "full_name": "string",
//         "profile_image": "string"
//       }
//     ],
//     "group": [
//       {
//         "id": 0,
//         "sem": 0,
//         "program": {
//           "name": "string",
//           "department_id": 0,
//           "id": 0
//         }
//       }
//     ],
//     "course": {
//       "id": 0,
//       "course_code": "string",
//       "course_name": "string"
//     }
//   }
// ]

  final int? id;
  final int? marks;
  final String? due_date;
  final List<String>? files;
  final String? title;
  final String? contents;
  final List<Instructor>? instructor;
  final Course? course;
  final List<Group>? group;
  final bool exists;

  const Assignment({
    this.id,
    this.due_date,
    this.files,
    this.title,
    this.contents,
    this.marks,
    this.instructor,
    this.course,
    this.group,
    this.exists = false,
  });

  static const empty = Assignment(
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

  factory Assignment.fromJson(Map<String, dynamic> json) =>
      _$AssignmentFromJson(json);

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
        exists
      ];
}
