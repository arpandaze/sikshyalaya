// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'quiz.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Quiz _$QuizFromJson(Map<String, dynamic> json) => Quiz(
      id: json['id'] as int?,
      course: json['course'] == null
          ? null
          : Course.fromJson(json['course'] as Map<String, dynamic>),
      end_time: json['end_time'] as String?,
      start_time: json['start_time'] as String?,
      title: json['title'] as String?,
      description: json['description'] as String?,
      is_randomized: json['is_randomized'] as bool?,
      display_individual: json['display_individual'] as bool?,
      total_marks: json['total_marks'] as int?,
      group: (json['group'] as List<dynamic>?)
          ?.map((e) => Group.fromJson(e as Map<String, dynamic>))
          .toList(),
      instructor: (json['instructor'] as List<dynamic>?)
          ?.map((e) => Instructor.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$QuizToJson(Quiz instance) => <String, dynamic>{
      'id': instance.id,
      'course': instance.course,
      'end_time': instance.end_time,
      'start_time': instance.start_time,
      'title': instance.title,
      'description': instance.description,
      'is_randomized': instance.is_randomized,
      'display_individual': instance.display_individual,
      'total_marks': instance.total_marks,
      'group': instance.group,
      'instructor': instance.instructor,
    };
