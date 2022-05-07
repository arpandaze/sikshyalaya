import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

import 'student.dart';
part 'answer.g.dart';

@JsonSerializable()
class Answer extends Equatable {
  final int? id;
  final int? marks_obtained;
  final Map? options_selected;
  final int? quiz_id;
  final Student? student;

  const Answer(
      {this.id,
      this.marks_obtained,
      this.options_selected,
      this.quiz_id,
      this.student});

  static const empty = Answer(
      id: 0,
      marks_obtained: 0,
      options_selected: null,
      quiz_id: 0,
      student: Student.empty);

  factory Answer.fromJson(Map<String, dynamic> json) => _$AnswerFromJson(json);

  @override
  List<Object?> get props =>
      [id, marks_obtained, options_selected, quiz_id, student];
}
