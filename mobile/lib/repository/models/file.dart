import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'file.g.dart';

@JsonSerializable()
class File extends Equatable {
  final String? name;
  final String? path;
  final String? file_type;
  final String? uploaded_datetime;
  final String? description;

  const File({
    this.name,
    this.path,
    this.file_type,
    this.uploaded_datetime,
    this.description,
  });

  static const empty = File(
      name: '',
      path: '',
      file_type: '',
      uploaded_datetime: '',
      description: '');

  factory File.fromJson(Map<String, dynamic> json) => _$FileFromJson(json);

  @override
  List<Object?> get props => [
        name,
        path,
        file_type,
        uploaded_datetime,
        description,
      ];
}
