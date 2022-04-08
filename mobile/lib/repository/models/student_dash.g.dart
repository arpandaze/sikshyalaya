// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'student_dash.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ClassSession _$ClassSessionFromJson(Map<String, dynamic> json) => ClassSession(
      id: json['id'] as int?,
      start_time: json['start_time'] as String?,
      end_time: json['end_time'] as String?,
      instructor: (json['instructor'] as List<dynamic>?)
          ?.map((e) => Instructor.fromJson(e as Map<String, dynamic>))
          .toList(),
      course: json['course'] == null
          ? null
          : Course.fromJson(json['course'] as Map<String, dynamic>),
      group_id: json['group_id'] as int?,
      description: json['description'] as String?,
      files: (json['files'] as List<dynamic>?)
          ?.map((e) => File.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$ClassSessionToJson(ClassSession instance) =>
    <String, dynamic>{
      'id': instance.id,
      'start_time': instance.start_time,
      'end_time': instance.end_time,
      'instructor': instance.instructor,
      'course': instance.course,
      'group_id': instance.group_id,
      'description': instance.description,
      'files': instance.files,
    };
