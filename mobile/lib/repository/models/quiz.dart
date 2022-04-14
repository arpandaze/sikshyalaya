import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:sikshyalaya/repository/models/course.dart';
import 'package:sikshyalaya/repository/models/group.dart';
import 'package:sikshyalaya/repository/models/instructor.dart';

part 'quiz.g.dart';

@JsonSerializable()
class Quiz extends Equatable {
  final int? id;
  final Course? course;
  final String? end_time;
  final String? start_time;
  final String? title;
  final String? description;
  final bool? is_randomized;
  final bool? display_individual;
  final int? total_marks;
  final List<Group>? group;
  final List<Instructor>? instructor;

  const Quiz(
      {this.id,
      this.course,
      this.end_time,
      this.start_time,
      this.title,
      this.description,
      this.is_randomized,
      this.display_individual,
      this.total_marks,
      this.group,
      this.instructor});

  static const empty = Quiz(
      id: null,
      course: Course.empty,
      end_time: '',
      start_time: '',
      title: '',
      description: '',
      is_randomized: null,
      display_individual: null,
      total_marks: null,
      group: [Group.empty],
      instructor: [Instructor.empty]);

  factory Quiz.fromJson(Map<String, dynamic> json) => _$QuizFromJson(json);

  @override
  List<Object?> get props => [
        id,
        course,
        end_time,
        start_time,
        title,
        description,
        is_randomized,
        display_individual,
        total_marks,
        group,
        instructor
      ];
}
