// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'quiz_answer.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

QuizAnswer _$QuizAnswerFromJson(Map<String, dynamic> json) => QuizAnswer(
      id: json['id'] as int?,
      student_id: json['student_id'] as int?,
      quiz_id: json['quiz_id'] as int?,
      marks_obtained: json['marks_obtained'] as int?,
      options_selected: json['options_selected'] as Map<String, dynamic>?,
    );

Map<String, dynamic> _$QuizAnswerToJson(QuizAnswer instance) =>
    <String, dynamic>{
      'id': instance.id,
      'student_id': instance.student_id,
      'quiz_id': instance.quiz_id,
      'marks_obtained': instance.marks_obtained,
      'options_selected': instance.options_selected,
    };
