import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/components/nav_bloc.dart';
import 'package:sikshyalaya/screens/Profile/profile.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:cached_network_image/cached_network_image.dart';

class TopBar extends StatelessWidget {
  const TopBar({
    Key? key,
    required this.size,
  }) : super(key: key);

  final Size size;

  @override
  Widget build(BuildContext context) {
    return content(context);
  }

  Container content(BuildContext context) {
    final authBloc = BlocProvider.of<AuthBloc>(context);

    return Container(
      width: size.width,
      height: size.height * 0.10,
      child: BlocBuilder<NavBloc, NavState>(
          buildWhen: (prev, next) => prev != next,
          builder: (context, snapshot) {
            return Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                  margin: EdgeInsets.fromLTRB(20, size.height * 0.025, 0, 0),
                  child: Text('Dashboard',
                      style: Theme.of(context).textTheme.headline4),
                ),
                Container(
                  margin: EdgeInsets.fromLTRB(0, size.height * 0.012, 20, 0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Container(
                              child: Text(
                                'Hello, ${authBloc.state.user?["full_name"] ?? "User"}',
                                style: Theme.of(context).textTheme.subtitle1,
                              ),
                            ),
                            Container(
                              child: Text(
                                authBloc.state.getGroupString(),
                                style: Theme.of(context).textTheme.caption,
                                textAlign: TextAlign.right,
                              ),
                            )
                          ],
                        ),
                      ),
                      GestureDetector(
                        child: Container(
                          margin: const EdgeInsets.fromLTRB(8, 0, 0, 0),
                          child: ClipRRect(
                            borderRadius:
                                BorderRadius.circular(14), // Image border
                            child: SizedBox.fromSize(
                              size: const Size.fromRadius(30), // Image radius
                              child: getProfileImage(
                                  authBloc.state.user?["profile_image"]),
                            ),
                          ),
                        ),
                        onTap: () => {
                          context
                              .read<NavBloc>()
                              .add(const NavChangeEvent(page: Profile())),
                          /* Navigator.of(context).pushNamed('/profile') */
                        },
                      )
                    ],
                  ),
                ),
              ],
            );
          }),
    );
  }

  Widget getProfileImage(String? profilePath) {
    if (profilePath != null) {
      return CachedNetworkImage(
        imageUrl: '$fileServerBase/${profilePath}',
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
