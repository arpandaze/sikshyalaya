part of 'profile_bloc.dart';

abstract class ProfileEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class NewProfilePicked extends ProfileEvent {
  final File profileImage;
  NewProfilePicked(this.profileImage);

  @override
  List<Object> get props => [profileImage];
}

class ProfileSaved extends ProfileEvent {}
