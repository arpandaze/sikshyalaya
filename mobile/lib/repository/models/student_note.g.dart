// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'student_note.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Note _$NoteFromJson(Map<String, dynamic> json) => Note(
      user_id: json['user_id'] as int?,
      tags: (json['tags'] as List<dynamic>?)?.map((e) => e as String).toList(),
      title: json['title'] as String?,
      content: json['content'] as String?,
      last_updated_time: json['last_updated_time'] as String?,
      id: json['id'] as int?,
    );

Map<String, dynamic> _$NoteToJson(Note instance) => <String, dynamic>{
      'user_id': instance.user_id,
      'tags': instance.tags,
      'title': instance.title,
      'content': instance.content,
      'last_updated_time': instance.last_updated_time,
      'id': instance.id,
    };
