import 'package:json_annotation/json_annotation.dart';
import 'package:sikshyalaya/repository/models/course.dart';
import 'package:sikshyalaya/repository/models/file.dart';
import 'package:sikshyalaya/repository/models/instructor.dart';
import 'package:sikshyalaya/repository/models/group.dart';
import 'student.dart';

part 'submitted_assignment.g.dart';

@JsonSerializable()
class SubmittedAssignment {
  final int? id;
  final String? submission_date;
  final List<String>? files;
  final int? assignment_id;
  final int? student_id;
  final Student? student;
  final int? marks_obtained;

  const SubmittedAssignment({
    this.id,
    this.submission_date,
    this.marks_obtained,
    this.assignment_id,
    this.files,
    this.student_id,
    this.student,
  });

  static const empty = SubmittedAssignment(
    id: 0,
    student: Student.empty,
    submission_date: "",
    files: [""],
    assignment_id: 0,
    student_id: 0,
    marks_obtained: 0,
  );

  factory SubmittedAssignment.fromJson(Map<String, dynamic> json) =>
      _$SubmittedAssignmentFromJson(json);

  List<Object?> get props => [
        id,
        submission_date,
        files,
        assignment_id,
        student_id,
        marks_obtained,
      ];
}
