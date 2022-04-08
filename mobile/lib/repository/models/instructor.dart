import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'instructor.g.dart';

@JsonSerializable()
class Instructor extends Equatable {
  final int? id;
  final String? full_name;
  final String? profile_image;

  const Instructor({this.id, this.full_name, this.profile_image});

  static const empty = Instructor(id: null, full_name: '', profile_image: '');

  factory Instructor.fromJson(Map<String, dynamic> json) =>
      _$InstructorFromJson(json);

  @override
  List<Object?> get props => [id, full_name, profile_image];
}
