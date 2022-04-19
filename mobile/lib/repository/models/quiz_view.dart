import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:sikshyalaya/repository/models/option.dart';

part 'quiz_view.g.dart';

@JsonSerializable()
class QuizView extends Equatable {
  final int? id;
  final int? quiz_id;
  final String? question_text;
  final List<String>? question_image;
  final List<Option>? options;
  final bool? multiple;
  final int? marks;

  const QuizView({
    this.id,
    this.quiz_id,
    this.question_image,
    this.question_text,
    this.options,
    this.multiple,
    this.marks,
  });

  static const empty = QuizView(
    id: null,
    quiz_id: null,
    question_image: null,
    question_text: null,
    options: null,
    multiple: null,
    marks: null,
  );

  factory QuizView.fromJson(Map<String, dynamic> json) =>
      _$QuizViewFromJson(json);

  @override
  List<Object?> get props => [
        id,
        quiz_id,
        question_image,
        question_image,
        options,
        multiple,
        marks,
      ];
}
