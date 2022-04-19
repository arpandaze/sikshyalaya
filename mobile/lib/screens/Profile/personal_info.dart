import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/components/CustomChatTextField.dart';
import 'package:sikshyalaya/components/CustomDateButton.dart';
import 'package:sikshyalaya/components/CustomOutlinedButton.dart';
import 'package:sikshyalaya/components/CustomTextField.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/screens/Profile/change_password.dart';
import 'package:sikshyalaya/screens/Profile/personal_info.dart';
import 'package:sikshyalaya/screens/Profile/sessions.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'package:sikshyalaya/screens/Welcome/splash.dart';
import 'package:sikshyalaya/screens/2fa/twoFactorAuthentication.dart';

class PersonalInfo extends StatelessWidget {
  const PersonalInfo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    var authBloc = BlocProvider.of<AuthBloc>(context);
    return BlocBuilder<AuthBloc, AuthState>(
        buildWhen: (prev, next) => prev != next,
        builder: (context, state) {
          if (state.user != null) {
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
                          margin:
                              EdgeInsets.fromLTRB(0, size.height * 0.02, 10, 0),
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
                            Container(
                              margin: const EdgeInsets.fromLTRB(8, 0, 0, 0),
                              child: ClipRRect(
                                borderRadius:
                                    BorderRadius.circular(80), // Image border
                                child: SizedBox.fromSize(
                                  size:
                                      const Size.fromRadius(85), // Image radius
                                  child: getProfileImage(
                                      authBloc.state.user?["profile_image"]),
                                ),
                              ),
                            )
                          ],
                        ),
                        GestureDetector(
                          onTap: () => {},
                          child: Container(
                            margin: EdgeInsets.fromLTRB(
                                0, size.height * 0.018, 0, 0),
                            child: Text(state.user!["full_name"],
                                style: Theme.of(context).textTheme.headline5),
                          ),
                        ),
                        Container(
                          width: size.width * 0.95,
                          padding: const EdgeInsets.all(20),
                          decoration: BoxDecoration(
                              color: Theme.of(context).colorScheme.surface,
                              borderRadius: BorderRadius.circular(15)),
                          margin:
                              EdgeInsets.fromLTRB(0, size.height * 0.04, 0, 0),
                          child: Container(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Container(
                                  padding: EdgeInsets.all(10),
                                  child: CustomTextField(
                                    width: size.width * 0.78,
                                    placeHolder: "First Name",
                                  ),
                                ),
                                Container(
                                  padding: EdgeInsets.all(10),
                                  child: CustomTextField(
                                    width: size.width * 0.78,
                                    placeHolder: "Last Name",
                                  ),
                                ),
                                Container(
                                  padding: EdgeInsets.all(10),
                                  child: CustomTextField(
                                    width: size.width * 0.78,
                                    placeHolder: "Email Address",
                                  ),
                                ),
                                Container(
                                  padding: EdgeInsets.all(10),
                                  child: CustomTextField(
                                    width: size.width * 0.78,
                                    placeHolder: "Phone Number",
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.all(10),
                                  child: CustomDateButton(
                                    width: size.width * 0.68,
                                    placeHolder: "Date",
                                  ),
                                ),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.end,
                                  children: const [
                                    Padding(
                                      padding: EdgeInsets.all(15),
                                      child: CustomOutlinedButton(
                                        icon:
                                            Icon(Icons.chevron_right_outlined),
                                      ),
                                    ),
                                  ],
                                ),
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
  }

  Widget getProfileImage(String? profilePath) {
    if (profilePath != null) {
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
