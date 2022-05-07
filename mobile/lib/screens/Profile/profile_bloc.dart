import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:email_validator/email_validator.dart';
import 'package:image_picker/image_picker.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/repository/auth.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter/material.dart';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
import 'package:mime/mime.dart';

part 'profile_event.dart';
part 'profile_state.dart';

class ProfileBloc extends Bloc<ProfileEvent, ProfileState> {
  AuthenticationRepository auth = AuthenticationRepository();

  String token = "";

  ProfileBloc(this.token) : super(const ProfileState()) {
    on<NewProfilePicked>(_onNewProfilePicked);
    on<ProfileSaved>(_onProfileSaved);
  }

  void _onNewProfilePicked(NewProfilePicked event, Emitter<ProfileState> emit) {
    emit(state.copyWith(
        newProfile: event.profileImage, profileSaveSuccess: false));
  }

  void _onProfileSaved(ProfileSaved event, Emitter<ProfileState> emit) async {
    if (state.newProfile != null) {
      final profileUpdateURI = Uri.parse("$backendBase/users/me/");
      var request = http.MultipartRequest(
        'PUT',
        profileUpdateURI,
      )..files.add(
          await http.MultipartFile.fromPath(
            "profile_photo",
            state.newProfile!.path,
            contentType: MediaType.parse(
              lookupMimeType(state.newProfile!.path)!,
            ),
          ),
        );
      request.headers['Cookie'] = "session=$token";

      var response = await request.send();
      if (response.statusCode == 200) {
        emit(state.copyWith(profileSaveSuccess: true, newProfile: null));
      } else {
        throw Exception("Submit Failed");
      }
    }
    /* if (!state.isEmailValid) { */
    /*   return emit(state.copyWith(errorText: "Invalid username!")); */
    /* } */
    /**/
    /* if (!state.isPasswordValid) { */
    /*   return emit(state.copyWith(errorText: "Invalid password!")); */
    /* } */
    /**/
    /* try { */
    /*   await auth.login(username: state.newProfile, password: state.password); */
    /*   emit(state.copyWith(profileSaveSuccess: true)); */
    /* } catch (e) { */
    /*   print(e); */
    /*   emit(state.copyWith(errorText: "Email or password incorrect!")); */
    /* } */
  }
}
