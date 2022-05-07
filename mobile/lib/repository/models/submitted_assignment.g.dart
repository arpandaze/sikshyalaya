// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'submitted_assignment.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SubmittedAssignment _$SubmittedAssignmentFromJson(Map<String, dynamic> json) =>
    SubmittedAssignment(
      id: json['id'] as int?,
      submission_date: json['submission_date'] as String?,
      marks_obtained: json['marks_obtained'] as int?,
      assignment_id: json['assignment_id'] as int?,
      files:
          (json['files'] as List<dynamic>?)?.map((e) => e as String).toList(),
      student_id: json['student_id'] as int?,
      student: json['student'] == null
          ? null
          : Student.fromJson(json['student'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$SubmittedAssignmentToJson(
        SubmittedAssignment instance) =>
    <String, dynamic>{
      'id': instance.id,
      'submission_date': instance.submission_date,
      'files': instance.files,
      'assignment_id': instance.assignment_id,
      'student_id': instance.student_id,
      'student': instance.student,
      'marks_obtained': instance.marks_obtained,
    };
