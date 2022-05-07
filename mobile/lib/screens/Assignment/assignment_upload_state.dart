part of 'assignment_upload_bloc.dart';

class AssignmentUploadState extends Equatable {
  final Map assignmentUpload;
  final bool assignmentUploadLoading;

  final List<File> toUpload;

  const AssignmentUploadState({
    this.assignmentUpload = const {},
    this.assignmentUploadLoading = false,
    this.toUpload = const [],
  });

  AssignmentUploadState copyWith({
    Map? assignmentUpload,
    bool? assignmentUploadLoading,
    List<File>? toUpload,
  }) {
    return AssignmentUploadState(
        toUpload: toUpload ?? this.toUpload,
        assignmentUpload: assignmentUpload ?? this.assignmentUpload,
        assignmentUploadLoading:
            assignmentUploadLoading ?? this.assignmentUploadLoading);
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
      ];
}
