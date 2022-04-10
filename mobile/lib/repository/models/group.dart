import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:sikshyalaya/repository/models/program.dart';

part 'group.g.dart';

@JsonSerializable()
class Group extends Equatable {
  final int? id;
  final int? sem;
  final Program? program;

  const Group({
    this.id,
    this.sem,
    this.program,
  });

  static const empty = Group(id: null, sem: null, program: Program.empty);

  factory Group.fromJson(Map<String, dynamic> json) => _$GroupFromJson(json);

  @override
  List<Object?> get props => [id, sem, program];
}
