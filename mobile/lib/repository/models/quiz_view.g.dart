// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'quiz_view.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

QuizView _$QuizViewFromJson(Map<String, dynamic> json) => QuizView(
      id: json['id'] as int?,
      quiz_id: json['quiz_id'] as int?,
      question_image: (json['question_image'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      question_text: json['question_text'] as String?,
      options: (json['options'] as List<dynamic>?)
          ?.map((e) => Option.fromJson(e as Map<String, dynamic>))
          .toList(),
      multiple: json['multiple'] as bool?,
      marks: json['marks'] as int?,
    );

Map<String, dynamic> _$QuizViewToJson(QuizView instance) => <String, dynamic>{
      'id': instance.id,
      'quiz_id': instance.quiz_id,
      'question_text': instance.question_text,
      'question_image': instance.question_image,
      'options': instance.options,
      'multiple': instance.multiple,
      'marks': instance.marks,
    };
