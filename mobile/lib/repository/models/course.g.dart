// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'course.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Course _$CourseFromJson(Map<String, dynamic> json) => Course(
      id: json['id'] as int?,
      course_code: json['course_code'] as String?,
      course_name: json['course_name'] as String?,
      course_credit: json['course_credit'] as int?,
      department_id: json['department_id'] as int?,
    );

Map<String, dynamic> _$CourseToJson(Course instance) => <String, dynamic>{
      'id': instance.id,
      'course_code': instance.course_code,
      'course_name': instance.course_name,
      'course_credit': instance.course_credit,
      'department_id': instance.department_id,
    };
