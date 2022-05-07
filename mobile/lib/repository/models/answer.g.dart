// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'answer.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Answer _$AnswerFromJson(Map<String, dynamic> json) => Answer(
      id: json['id'] as int?,
      marks_obtained: json['marks_obtained'] as int?,
      options_selected: json['options_selected'] as Map<String, dynamic>?,
      quiz_id: json['quiz_id'] as int?,
      student: json['student'] == null
          ? null
          : Student.fromJson(json['student'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$AnswerToJson(Answer instance) => <String, dynamic>{
      'id': instance.id,
      'marks_obtained': instance.marks_obtained,
      'options_selected': instance.options_selected,
      'quiz_id': instance.quiz_id,
      'student': instance.student,
    };
