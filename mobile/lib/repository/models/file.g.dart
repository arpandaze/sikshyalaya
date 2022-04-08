// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'file.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

File _$FileFromJson(Map<String, dynamic> json) => File(
      name: json['name'] as String?,
      path: json['path'] as String?,
      file_type: json['file_type'] as String?,
      uploaded_datetime: json['uploaded_datetime'] as String?,
      description: json['description'] as String?,
    );

Map<String, dynamic> _$FileToJson(File instance) => <String, dynamic>{
      'name': instance.name,
      'path': instance.path,
      'file_type': instance.file_type,
      'uploaded_datetime': instance.uploaded_datetime,
      'description': instance.description,
    };
