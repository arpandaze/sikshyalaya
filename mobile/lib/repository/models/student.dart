import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'student.g.dart';

@JsonSerializable()
class Student extends Equatable {
  final int? id;
  final String? full_name;
  final String? profile_image;
  const Student({this.id, this.full_name, this.profile_image});

  static const empty = Student(id: 0, full_name: "", profile_image: "");
  factory Student.fromJson(Map<String, dynamic> json) =>
      _$StudentFromJson(json);

  @override
  List<Object?> get props => [id, full_name, profile_image];
}

// [
//   {
//     "id": 0,
//     "marks_obtained": 0,
//     "options_selected": {},
//     "quiz_id": 0,
//     "student": {
//       "id": 0,
//       "full_name": "string"
//     }
//   }
// ]