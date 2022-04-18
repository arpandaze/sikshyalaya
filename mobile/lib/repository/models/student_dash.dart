import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:sikshyalaya/repository/models/course.dart';
import 'package:sikshyalaya/repository/models/file.dart';
import 'package:sikshyalaya/repository/models/instructor.dart';

part 'student_dash.g.dart';

@JsonSerializable()
class ClassSession extends Equatable {
  final int? id;
  final String? start_time;
  final String? end_time;
  final List<Instructor>? instructor;
  final Course? course;
  final int? group_id;
  final String? description;
  final List<File>? files;

  const ClassSession({
    this.id,
    this.start_time,
    this.end_time,
    this.instructor,
    this.course,
    this.group_id,
    this.description,
    this.files,
  });

  static const empty = ClassSession(
    id: null,
    start_time: '',
    end_time: '',
    instructor: [Instructor.empty],
    course: Course.empty,
    group_id: null,
    description: '',
    files: [File.empty],
  );

  factory ClassSession.fromJson(Map<String, dynamic> json) =>
      _$ClassSessionFromJson(json);

  @override
  List<Object?> get props => [
        id,
        start_time,
        end_time,
        instructor,
        course,
        group_id,
        description,
        files
      ];
}
