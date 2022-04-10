import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'program.g.dart';

@JsonSerializable()
class Program extends Equatable {
  final int? id;
  final int? department_id;
  final String? name;

  const Program({
    this.id,
    this.department_id,
    this.name,
  });

  static const empty = Program(id: null, department_id: null, name: '');

  factory Program.fromJson(Map<String, dynamic> json) =>
      _$ProgramFromJson(json);

  @override
  List<Object?> get props => [id, department_id, name];
}
