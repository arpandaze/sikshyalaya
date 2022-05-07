import 'package:cached_network_image/cached_network_image.dart';
import 'package:file_picker/file_picker.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/screens/Login/components/CustomFilledButton.dart';
import 'package:sikshyalaya/screens/Profile/change_password.dart';
import 'package:sikshyalaya/screens/Profile/personal_info.dart';
import 'package:sikshyalaya/screens/Profile/profile_bloc.dart';
import 'package:sikshyalaya/screens/Profile/sessions.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'package:sikshyalaya/screens/Welcome/splash.dart';
import 'package:sikshyalaya/screens/2fa/twoFactorAuthentication.dart';
import 'package:sikshyalaya/screens/Profile/qrLogin.dart';
import 'dart:async';
import 'dart:io';

class Profile extends StatelessWidget {
  const Profile({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider<ProfileBloc>(
      create: (_) => ProfileBloc(context.read<AuthBloc>().state.token!),
      child: body(context),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    var authBloc = BlocProvider.of<AuthBloc>(context);
    return BlocBuilder<AuthBloc, AuthState>(
        buildWhen: (prev, next) => prev != next,
        builder: (context, authSnapshot) {
          return BlocConsumer<ProfileBloc, ProfileState>(
              listener: (context, state) {
                if (state.profileSaveSuccess) {
                  context.read<AuthBloc>().add(RefetchUser());
                }
              },
              buildWhen: (prev, next) => prev != next,
              builder: (context, profileSnapshot) {
                if (authSnapshot.user != null) {
                  return SafeArea(
                    top: true,
                    bottom: true,
                    child: Scaffold(
                      body: ListView(
                        children: <Widget>[
                          Align(
                            alignment: Alignment.topRight,
                            child: GestureDetector(
                              onTap: () => {Navigator.pop(context)},
                              child: Container(
                                margin: EdgeInsets.fromLTRB(
                                    0, size.height * 0.02, 10, 0),
                                child: Icon(
                                  Icons.close,
                                  color: Theme.of(context).colorScheme.primary,
                                  size: 35,
                                ),
                              ),
                            ),
                          ),
                          Container(
                            child: Column(children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  GestureDetector(
                                    onTap: () async {
                                      FilePickerResult? result =
                                          await FilePicker.platform
                                              .pickFiles(type: FileType.image);

                                      if (result != null) {
                                        File file =
                                            File(result.files.single.path!);

                                        context
                                            .read<ProfileBloc>()
                                            .add(NewProfilePicked(file));
                                      } else {
                                        // User canceled the picker
                                      }
                                    },
                                    child: Container(
                                      margin:
                                          const EdgeInsets.fromLTRB(8, 0, 0, 8),
                                      child: ClipRRect(
                                        borderRadius: BorderRadius.circular(
                                            80), // Image border
                                        child: SizedBox.fromSize(
                                          size: const Size.fromRadius(
                                              85), // Image radius
                                          child: getProfileImage(
                                              authSnapshot, profileSnapshot),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              profileSnapshot.newProfile != null &&
                                      profileSnapshot.profileSaveSuccess != true
                                  ? CustomFilledButton(
                                      text: "Save",
                                      onPressed: () {
                                        context
                                            .read<ProfileBloc>()
                                            .add(ProfileSaved());
                                      },
                                    )
                                  : const SizedBox.shrink(),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Container(
                                    margin: EdgeInsets.fromLTRB(
                                        0, size.height * 0.018, 0, 0),
                                    child: Text(authSnapshot.user!["full_name"],
                                        style: Theme.of(context)
                                            .textTheme
                                            .headline5),
                                  ),
                                  Container(
                                    margin: EdgeInsets.fromLTRB(
                                        0, size.height * 0.018, 0, 0),
                                    child: Text(authSnapshot.getGroupString(),
                                        style: Theme.of(context)
                                            .textTheme
                                            .bodyText1),
                                  )
                                ],
                              ),
                              Container(
                                width: size.width * 0.95,
                                padding: EdgeInsets.all(20),
                                decoration: BoxDecoration(
                                    color:
                                        Theme.of(context).colorScheme.surface,
                                    borderRadius: BorderRadius.circular(15)),
                                margin: EdgeInsets.fromLTRB(
                                    0, size.height * 0.04, 0, 0),
                                child: Container(
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    mainAxisSize: MainAxisSize.max,
                                    children: [
                                      Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          GestureDetector(
                                            onTap: () => {
                                              Navigator.of(context).push(
                                                PageRouteBuilder(
                                                  pageBuilder: (context,
                                                          animation1,
                                                          animation2) =>
                                                      const PersonalInfo(),
                                                  transitionDuration:
                                                      Duration.zero,
                                                  reverseTransitionDuration:
                                                      Duration.zero,
                                                ),
                                              ),
                                            },
                                            child: SizedBox(
                                              width: size.width * 0.78,
                                              height: size.height * 0.090,
                                              child: Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceBetween,
                                                children: [
                                                  Container(
                                                    width: size.width * 0.1,
                                                    height: size.width * 0.1,
                                                    decoration: BoxDecoration(
                                                        borderRadius:
                                                            BorderRadius
                                                                .circular(10),
                                                        color: Theme.of(context)
                                                            .colorScheme
                                                            .background),
                                                    child: const Icon(
                                                      Icons.person,
                                                      color: Color(0xFF000000),
                                                    ),
                                                  ),
                                                  SizedBox(
                                                    width: size.width * 0.55,
                                                    child: Text(
                                                      "Personal Info",
                                                      style: Theme.of(context)
                                                          .textTheme
                                                          .subtitle1,
                                                    ),
                                                  ),
                                                  const Icon(
                                                    Icons
                                                        .keyboard_arrow_right_rounded,
                                                    color: Color(0xFF000000),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                          GestureDetector(
                                            onTap: () => {
                                              Navigator.of(context).push(
                                                PageRouteBuilder(
                                                  pageBuilder: (context,
                                                          animation1,
                                                          animation2) =>
                                                      const ChangePassword(),
                                                  transitionDuration:
                                                      Duration.zero,
                                                  reverseTransitionDuration:
                                                      Duration.zero,
                                                ),
                                              ),
                                            },
                                            child: SizedBox(
                                              width: size.width * 0.78,
                                              height: size.height * 0.090,
                                              child: Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceBetween,
                                                children: [
                                                  Container(
                                                    width: size.width * 0.1,
                                                    height: size.width * 0.1,
                                                    decoration: BoxDecoration(
                                                        borderRadius:
                                                            BorderRadius
                                                                .circular(10),
                                                        color: Theme.of(context)
                                                            .colorScheme
                                                            .background),
                                                    child: const Icon(
                                                      Icons.lock,
                                                      color: Color(0xFF000000),
                                                    ),
                                                  ),
                                                  SizedBox(
                                                    width: size.width * 0.55,
                                                    child: Text(
                                                      "Password",
                                                      style: Theme.of(context)
                                                          .textTheme
                                                          .subtitle1,
                                                    ),
                                                  ),
                                                  const Icon(
                                                    Icons
                                                        .keyboard_arrow_right_rounded,
                                                    color: Color(0xFF000000),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                          GestureDetector(
                                            onTap: () => {
                                              Navigator.of(context).push(
                                                PageRouteBuilder(
                                                  pageBuilder: (context,
                                                          animation1,
                                                          animation2) =>
                                                      Twofactorauthentication(
                                                    fullname: authSnapshot
                                                        .user!['full_name'],
                                                  ),
                                                  transitionDuration:
                                                      Duration.zero,
                                                  reverseTransitionDuration:
                                                      Duration.zero,
                                                ),
                                              ),
                                            },
                                            child: SizedBox(
                                              width: size.width * 0.78,
                                              height: size.height * 0.090,
                                              child: Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceBetween,
                                                children: [
                                                  Container(
                                                    width: size.width * 0.1,
                                                    height: size.width * 0.1,
                                                    decoration: BoxDecoration(
                                                        borderRadius:
                                                            BorderRadius
                                                                .circular(10),
                                                        color: Theme.of(context)
                                                            .colorScheme
                                                            .background),
                                                    child: const Icon(
                                                      Icons
                                                          .screen_lock_portrait,
                                                      color: Color(0xFF000000),
                                                    ),
                                                  ),
                                                  SizedBox(
                                                    width: size.width * 0.55,
                                                    child: Text(
                                                      "TwoFactor Auth",
                                                      style: Theme.of(context)
                                                          .textTheme
                                                          .subtitle1,
                                                    ),
                                                  ),
                                                  const Icon(
                                                    Icons
                                                        .keyboard_arrow_right_rounded,
                                                    color: Color(0xFF000000),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                          GestureDetector(
                                            onTap: () => {
                                              Navigator.of(context).push(
                                                PageRouteBuilder(
                                                  pageBuilder: (context,
                                                          animation1,
                                                          animation2) =>
                                                      const SessionPage(),
                                                  transitionDuration:
                                                      Duration.zero,
                                                  reverseTransitionDuration:
                                                      Duration.zero,
                                                ),
                                              ),
                                            },
                                            child: SizedBox(
                                              width: size.width * 0.78,
                                              height: size.height * 0.090,
                                              child: Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceBetween,
                                                children: [
                                                  Container(
                                                    width: size.width * 0.1,
                                                    height: size.width * 0.1,
                                                    decoration: BoxDecoration(
                                                        borderRadius:
                                                            BorderRadius
                                                                .circular(10),
                                                        color: Theme.of(context)
                                                            .colorScheme
                                                            .background),
                                                    child: const Icon(
                                                      Icons.laptop_mac,
                                                      color: Color(0xFF000000),
                                                    ),
                                                  ),
                                                  SizedBox(
                                                    width: size.width * 0.55,
                                                    child: Text(
                                                      "Sessions",
                                                      style: Theme.of(context)
                                                          .textTheme
                                                          .subtitle1,
                                                    ),
                                                  ),
                                                  const Icon(
                                                    Icons
                                                        .keyboard_arrow_right_rounded,
                                                    color: Color(0xFF000000),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                          GestureDetector(
                                            onTap: () => Navigator.of(context)
                                                .push(PageRouteBuilder(
                                              pageBuilder: (context, animation1,
                                                      animation2) =>
                                                  QRLogin(),
                                              transitionDuration: Duration.zero,
                                              reverseTransitionDuration:
                                                  Duration.zero,
                                            )),
                                            child: SizedBox(
                                              width: size.width * 0.78,
                                              height: size.height * 0.090,
                                              child: Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceBetween,
                                                children: [
                                                  Container(
                                                    width: size.width * 0.1,
                                                    height: size.width * 0.1,
                                                    decoration: BoxDecoration(
                                                        borderRadius:
                                                            BorderRadius
                                                                .circular(10),
                                                        color: Theme.of(context)
                                                            .colorScheme
                                                            .background),
                                                    child: const Icon(
                                                        Icons.qr_code_scanner
                                                        // color: Color(0xFF000000),
                                                        ),
                                                  ),
                                                  SizedBox(
                                                    width: size.width * 0.55,
                                                    child: Text(
                                                      "QR Login",
                                                      style: Theme.of(context)
                                                          .textTheme
                                                          .subtitle1,
                                                    ),
                                                  ),
                                                  const Icon(
                                                    Icons
                                                        .keyboard_arrow_right_rounded,
                                                    color: Color(0xFF000000),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                          GestureDetector(
                                            onTap: () =>
                                                authBloc.add(LoggedOut()),
                                            child: SizedBox(
                                              width: size.width * 0.78,
                                              height: size.height * 0.090,
                                              child: Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceBetween,
                                                children: [
                                                  Container(
                                                    width: size.width * 0.1,
                                                    height: size.width * 0.1,
                                                    decoration: BoxDecoration(
                                                        borderRadius:
                                                            BorderRadius
                                                                .circular(10),
                                                        color: Theme.of(context)
                                                            .colorScheme
                                                            .background),
                                                    child: const Icon(
                                                      Icons
                                                          .subdirectory_arrow_right,
                                                      color: Color(0xFF000000),
                                                    ),
                                                  ),
                                                  SizedBox(
                                                    width: size.width * 0.55,
                                                    child: Text(
                                                      "Log Out",
                                                      style: Theme.of(context)
                                                          .textTheme
                                                          .subtitle1,
                                                    ),
                                                  ),
                                                  const Icon(
                                                    Icons
                                                        .keyboard_arrow_right_rounded,
                                                    color: Color(0xFF000000),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ],
                                      )
                                    ],
                                  ),
                                ),
                              )
                            ]),
                          )
                        ],
                      ),
                    ),
                  );
                } else {
                  return const SplashScreen();
                }
              });
        });
  }

  Widget getProfileImage(AuthState authSnapshot, ProfileState profileSnapshot) {
    final profilePath = authSnapshot.user?["profile_image"];
    if (profileSnapshot.newProfile != null) {
      return Image.file(profileSnapshot.newProfile!);
    } else if (profilePath != null) {
      return CachedNetworkImage(
        imageUrl: '$fileServerBase/$profilePath',
        imageBuilder: (context, imageProvider) => Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: imageProvider,
              fit: BoxFit.contain,
            ),
          ),
        ),
        placeholder: (context, url) => const CircularProgressIndicator(),
        errorWidget: (context, url, error) => const Icon(Icons.error),
      );
    } else {
      return SvgPicture.asset(
        "assets/images/defaultProfile.svg",
        fit: BoxFit.cover,
      );
    }
  }
}
