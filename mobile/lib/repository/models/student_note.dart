import 'package:json_annotation/json_annotation.dart';
import 'package:sikshyalaya/repository/models/content.dart';

part 'student_note.g.dart';

@JsonSerializable()
class Note {
  final int? user_id;
  final List<String>? tags;
  final String? title;
  final List<Content>? content;
  final String? last_updated_time;
  final int? id;

  const Note({
    this.user_id,
    this.tags,
    this.title,
    this.content,
    this.last_updated_time,
    this.id,
  });

  static const empty = Note(
    user_id: 0,
    tags: [''],
    title: '',
    content: [Content.empty],
    last_updated_time: '',
    id: 0,
  );

  factory Note.fromJson(Map<String, dynamic> json) => _$NoteFromJson(json);

  List<Object?> get props => [
        user_id,
        tags,
        title,
        content,
        last_updated_time,
        id,
      ];
}
