import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'quiz_answer.g.dart';

@JsonSerializable()
class QuizAnswer extends Equatable {
  final int? id;
  final int? student_id;
  final int? quiz_id;
  final int? marks_obtained;
  final Map? options_selected;

  const QuizAnswer({
    this.id,
    this.student_id,
    this.quiz_id,
    this.marks_obtained,
    this.options_selected,
  });

  static const empty = QuizAnswer(
      id: null,
      student_id: null,
      quiz_id: null,
      marks_obtained: null,
      options_selected: null);

  factory QuizAnswer.fromJson(Map<String, dynamic> json) =>
      _$QuizAnswerFromJson(json);

  Map<String, dynamic> toJson() => _$QuizAnswerToJson(this);

  @override
  List<Object?> get props =>
      [id, student_id, quiz_id, marks_obtained, options_selected];
}
