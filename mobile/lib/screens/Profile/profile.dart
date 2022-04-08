import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/main.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/screens/Welcome/splash.dart';

class Profile extends StatelessWidget {
  const Profile({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    var authBloc = BlocProvider.of<AuthBloc>(context);
    return BlocBuilder<AuthBloc, AuthState>(
        buildWhen: (prev, next) => prev != next,
        builder: (context, state) {
          if (state.user != null){
          return ListView(
            children: <Widget>[
              Container(
                decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.background),
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
                            size: const Size.fromRadius(85), // Image radius
                            child: CachedNetworkImage(
                              imageUrl: '$fileServerBase/${state.user!["profile_image"]}',
                              imageBuilder: (context, imageProvider) =>
                                  Container(
                                      decoration: BoxDecoration(
                                image: DecorationImage(
                                  image: imageProvider,
                                  fit: BoxFit.contain,
                                ),
                              )),
                              placeholder: (context, url) =>
                                  const CircularProgressIndicator(),
                              errorWidget: (context, url, error) =>
                                  const Icon(Icons.error),
                            ),
                          ),
                        ),
                      )
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Container(
                        margin:
                            EdgeInsets.fromLTRB(0, size.height * 0.018, 0, 0),
                        child: Text(state.user!["full_name"],
                            style: Theme.of(context).textTheme.headline5),
                      ),
                      Container(
                        margin:
                            EdgeInsets.fromLTRB(0, size.height * 0.018, 0, 0),
                        child: Text(state.getGroupString(),
                            style: Theme.of(context).textTheme.bodyText1),
                      )
                    ],
                  ),
                  Container(
                    width: size.width * 0.95,
                    height: size.height * 0.38,
                    decoration: BoxDecoration(
                        color: Theme.of(context).colorScheme.surface,
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(15),
                          topRight: Radius.circular(15),
                        )),
                    margin: EdgeInsets.fromLTRB(0, size.height * 0.04, 0, 0),
                    child: Container(
                      margin: EdgeInsets.fromLTRB(0, size.height * 0.02, 0, 0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        mainAxisSize: MainAxisSize.max,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              SizedBox(
                                width: size.width * 0.78,
                                height: size.height * 0.086,
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Container(
                                      width: size.width * 0.1,
                                      height: size.width * 0.1,
                                      decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(10),
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
                                            .headline6,
                                      ),
                                    ),
                                    const Icon(
                                      Icons.keyboard_arrow_right_rounded,
                                      color: Color(0xFF000000),
                                    ),
                                  ],
                                ),
                              ),
                              SizedBox(
                                width: size.width * 0.78,
                                height: size.height * 0.086,
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Container(
                                      width: size.width * 0.1,
                                      height: size.width * 0.1,
                                      decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(10),
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
                                        "Change your password",
                                        style: Theme.of(context)
                                            .textTheme
                                            .headline6,
                                      ),
                                    ),
                                    const Icon(
                                      Icons.keyboard_arrow_right_rounded,
                                      color: Color(0xFF000000),
                                    ),
                                  ],
                                ),
                              ),
                              SizedBox(
                                width: size.width * 0.78,
                                height: size.height * 0.086,
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Container(
                                      width: size.width * 0.1,
                                      height: size.width * 0.1,
                                      decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(10),
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
                                            .headline6,
                                      ),
                                    ),
                                    const Icon(
                                      Icons.keyboard_arrow_right_rounded,
                                      color: Color(0xFF000000),
                                    ),
                                  ],
                                ),
                              ),
                              SizedBox(
                                width: size.width * 0.78,
                                height: size.height * 0.086,
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Container(
                                      width: size.width * 0.1,
                                      height: size.width * 0.1,
                                      decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                          color: Theme.of(context)
                                              .colorScheme
                                              .background),
                                      child: const Icon(
                                        Icons.subdirectory_arrow_right,
                                        color: Color(0xFF000000),
                                      ),
                                    ),
                                    GestureDetector(
                                      onTap: () => authBloc.add(LoggedOut()),
                                      child: SizedBox(
                                        width: size.width * 0.55,
                                        child: Text(
                                          "Log Out",
                                          style: Theme.of(context)
                                              .textTheme
                                              .headline6,
                                        ),
                                      ),
                                    ),
                                    const Icon(
                                      Icons.keyboard_arrow_right_rounded,
                                      color: Color(0xFF000000),
                                    ),
                                  ],
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
          );
          }else{
            return const SplashScreen();

            }
        });
  }
}
