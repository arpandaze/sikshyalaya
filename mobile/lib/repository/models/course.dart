import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'course.g.dart';

@JsonSerializable()
class Course extends Equatable {
  final int? id;
  final String? course_code;
  final String? course_name;
  final int? course_credit;
  final int? department_id;

  const Course(
      {this.id,
      this.course_code,
      this.course_name,
      this.course_credit,
      this.department_id});

  static const empty = Course(
      id: null,
      course_code: '',
      course_name: '',
      course_credit: null,
      department_id: null);

  factory Course.fromJson(Map<String, dynamic> json) => _$CourseFromJson(json);

  @override
  List<Object?> get props =>
      [id, course_code, course_name, course_credit, department_id];
}
