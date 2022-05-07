part of 'profile_bloc.dart';

class ProfileState extends Equatable {
  final File? newProfile;

  final String? errorText;

  final bool profileSaveSuccess;

  const ProfileState({
    this.newProfile,
    this.errorText = "",
    this.profileSaveSuccess = false,
  });

  ProfileState copyWith({
    File? newProfile,
    String? errorText,
    bool? profileSaveSuccess,
  }) {
    return ProfileState(
      newProfile: newProfile ?? this.newProfile,
      errorText: errorText ?? this.errorText,
      profileSaveSuccess: profileSaveSuccess ?? this.profileSaveSuccess,
    );
  }

  @override
  List<Object?> get props => [newProfile, errorText, profileSaveSuccess];
}
