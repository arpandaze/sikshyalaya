// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'instructor.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Instructor _$InstructorFromJson(Map<String, dynamic> json) => Instructor(
      id: json['id'] as int?,
      full_name: json['full_name'] as String?,
      profile_image: json['profile_image'] as String?,
    );

Map<String, dynamic> _$InstructorToJson(Instructor instance) =>
    <String, dynamic>{
      'id': instance.id,
      'full_name': instance.full_name,
      'profile_image': instance.profile_image,
    };
