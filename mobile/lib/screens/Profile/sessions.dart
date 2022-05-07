import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/sessions.dart';
import 'package:sikshyalaya/screens/Profile/change_password.dart';
import 'package:sikshyalaya/screens/Profile/personal_info.dart';
import 'package:sikshyalaya/screens/Profile/sessions.dart';
import 'package:sikshyalaya/screens/Profile/sessions_bloc.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'package:sikshyalaya/screens/Welcome/splash.dart';
import 'package:sikshyalaya/screens/2fa/twoFactorAuthentication.dart';

class SessionPage extends StatelessWidget {
  const SessionPage({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => SessionsBloc(
        sessionRepository: SessionsRepository(
          token: context.read<AuthBloc>().state.token,
        ),
      ),
      child: body(context),
    );
  }

  @override
  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    var authBloc = BlocProvider.of<AuthBloc>(context);
    return BlocBuilder<AuthBloc, AuthState>(
        buildWhen: (prev, next) => prev != next,
        builder: (context, state) {
          return BlocBuilder<SessionsBloc, SessionsState>(
              buildWhen: (prev, next) => prev != next,
              builder: (context, sessionState) {
                var sessCount = sessionState.sessionList.length;
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
                                  Container(
                                    margin:
                                        const EdgeInsets.fromLTRB(8, 0, 0, 0),
                                    child: ClipRRect(
                                      borderRadius: BorderRadius.circular(
                                          80), // Image border
                                      child: SizedBox.fromSize(
                                        size: const Size.fromRadius(
                                            85), // Image radius
                                        child: getProfileImage(authBloc
                                            .state.user?["profile_image"]),
                                      ),
                                    ),
                                  )
                                ],
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Container(
                                    margin: EdgeInsets.fromLTRB(
                                        0, size.height * 0.018, 0, 0),
                                    child: Text(state.user!["full_name"],
                                        style: Theme.of(context)
                                            .textTheme
                                            .headline5),
                                  ),
                                  Container(
                                    margin: EdgeInsets.fromLTRB(
                                        0, size.height * 0.018, 0, 0),
                                    child: Text(state.getGroupString(),
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
                                    0, size.height * 0.04, 0, 20),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    sessCount != 0
                                        ? GestureDetector(
                                            // onTap: () =>
                                            //     authBloc.add(LoggedOut()),
                                            child: Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.end,
                                              children: [
                                                SizedBox(
                                                  child: Text(
                                                    "Log Out of all Session",
                                                    style: Theme.of(context)
                                                        .textTheme
                                                        .subtitle1,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          )
                                        : Container(),
                                    sessCount != 0
                                        ? GridView.builder(
                                            physics:
                                                const NeverScrollableScrollPhysics(),
                                            // padding: const EdgeInsets.fromLTRB(
                                            //     20, 0, 20, 30),
                                            shrinkWrap: true,
                                            gridDelegate:
                                                const SliverGridDelegateWithFixedCrossAxisCount(
                                              crossAxisCount: 2,
                                              mainAxisSpacing: 10,
                                              crossAxisSpacing: 10,
                                            ),
                                            itemCount:
                                                sessionState.sessionList.length,
                                            itemBuilder: (context, int i) {
                                              return GestureDetector(
                                                child: Container(
                                                  width: size.width * 0.78,
                                                  height: size.height * 0.090,
                                                  child: Column(
                                                    crossAxisAlignment:
                                                        CrossAxisAlignment
                                                            .center,
                                                    mainAxisAlignment:
                                                        MainAxisAlignment
                                                            .spaceEvenly,
                                                    children: [
                                                      Container(
                                                        width: size.width * 0.1,
                                                        height:
                                                            size.width * 0.1,
                                                        margin: const EdgeInsets
                                                                .fromLTRB(
                                                            0, 20, 0, 0),
                                                        decoration: BoxDecoration(
                                                            borderRadius:
                                                                BorderRadius
                                                                    .circular(
                                                                        10),
                                                            color: Theme.of(
                                                                    context)
                                                                .colorScheme
                                                                .background),
                                                        child: const Icon(
                                                          Icons.laptop_mac,
                                                          color:
                                                              Color(0xFF000000),
                                                        ),
                                                      ),
                                                      Container(
                                                        width:
                                                            size.width * 0.55,
                                                        child: Column(
                                                          mainAxisAlignment:
                                                              MainAxisAlignment
                                                                  .spaceBetween,
                                                          crossAxisAlignment:
                                                              CrossAxisAlignment
                                                                  .center,
                                                          children: [
                                                            Text(
                                                              '${sessionState.sessionList[i]!['ua']}'
                                                                  .split(
                                                                      ' ')[0],
                                                              style: Theme.of(
                                                                      context)
                                                                  .textTheme
                                                                  .subtitle1,
                                                            ),
                                                            Text(
                                                              sessionState
                                                                      .sessionList[
                                                                  i]!['ip'],
                                                              style: Theme.of(
                                                                      context)
                                                                  .textTheme
                                                                  .subtitle1,
                                                            ),
                                                          ],
                                                        ),
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                              );
                                            },
                                          )
                                        : Container(
                                            child: Text("No Active Sessions"),
                                          ),
                                  ],
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
