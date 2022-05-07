part of 'assignment_upload_bloc.dart';

enum uploadStatus {
  uploadNotStarted,
  uploadStart,
  uploadSuccess,
  uploadFailed,
}

class AssignmentUploadState extends Equatable {
  final Map assignmentUpload;
  final bool assignmentUploadLoading;

  final List<File> toUpload;
  final List<String?> paths;

  final uploadStatus uploadStat;

  const AssignmentUploadState({
    this.assignmentUpload = const {},
    this.assignmentUploadLoading = false,
    this.toUpload = const [],
    this.paths = const [],
    this.uploadStat = uploadStatus.uploadNotStarted,
  });

  AssignmentUploadState copyWith({
    Map? assignmentUpload,
    bool? assignmentUploadLoading,
    List<File>? toUpload,
    List<String?>? paths,
    uploadStatus? uploadStat,
  }) {
    return AssignmentUploadState(
      toUpload: toUpload ?? this.toUpload,
      assignmentUpload: assignmentUpload ?? this.assignmentUpload,
      assignmentUploadLoading:
          assignmentUploadLoading ?? this.assignmentUploadLoading,
      paths: paths ?? this.paths,
      uploadStat: uploadStat ?? this.uploadStat,
    );
  }

  // static Future<AssignmentUploadState> load() async {
  //   var token = await storage.read(key: "token") as String;
  //   return AssignmentUploadState(token: token);
  // }

  @override
  List<Object?> get props => [
        toUpload,
        assignmentUpload,
        assignmentUploadLoading,
        paths,
        uploadStat,
      ];
}
