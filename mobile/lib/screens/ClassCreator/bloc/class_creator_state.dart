part of 'class_creator_bloc.dart';

enum uploadStatus {
  uploadNotStarted,
  uploadStart,
  uploadSuccess,
  uploadFailed,
}

class ClassCreatorState extends Equatable {
  final String? start_time;
  final String? end_time;
  final List<Group>? groupList;
  final int? group;
  final String? description;
  final List<Object?> instructor;
  final List<Instructor>? instructorList;
  final List<String>? files;
  final bool? success;
  final Map assignmentUpload;
  final bool assignmentUploadLoading;

  final List<File> toUpload;
  final List<String?> paths;

  final uploadStatus uploadStat;

  const ClassCreatorState({
    this.start_time = "",
    this.end_time = "",
    this.group,
    this.groupList,
    this.description,
    this.instructor = const [],
    this.instructorList = null,
    this.files = null,
    this.success = false,
    this.assignmentUpload = const {},
    this.assignmentUploadLoading = false,
    this.toUpload = const [],
    this.paths = const [],
    this.uploadStat = uploadStatus.uploadNotStarted,
  });

  ClassCreatorState copyWith({
    String? start_time,
    String? end_time,
    int? group,
    List<Group>? groupList,
    String? description,
    List<Object?>? instructor,
    List<Instructor>? instructorList,
    List<String>? files,
    bool? success,
    Map? assignmentUpload,
    bool? assignmentUploadLoading,
    List<File>? toUpload,
    List<String?>? paths,
    uploadStatus? uploadStat,
  }) {
    return ClassCreatorState(
      description: description ?? this.description,
      start_time: start_time ?? this.start_time,
      end_time: end_time ?? this.end_time,
      group: group ?? this.group,
      groupList: groupList ?? this.groupList,
      instructor: instructor ?? this.instructor,
      instructorList: instructorList ?? this.instructorList,
      files: files ?? this.files,
      success: success ?? this.success,
      toUpload: toUpload ?? this.toUpload,
      assignmentUpload: assignmentUpload ?? this.assignmentUpload,
      assignmentUploadLoading:
          assignmentUploadLoading ?? this.assignmentUploadLoading,
      paths: paths ?? this.paths,
      uploadStat: uploadStat ?? this.uploadStat,
    );
  }

  @override
  List<Object?> get props => [
        start_time,
        end_time,
        group,
        groupList,
        description,
        instructor,
        instructorList,
        files,
        success,
        toUpload,
        assignmentUpload,
        assignmentUploadLoading,
        paths,
        uploadStat,
      ];
}
