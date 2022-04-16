import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:sikshyalaya/screens/2fa/otpPage.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/screens/2fa/components/CustomOutlinedButton.dart';
import 'package:sikshyalaya/screens/2fa/otpPage.dart';

class Twofactorauthentication extends StatelessWidget {
  const Twofactorauthentication({Key? key, required this.fullname})
      : super(key: key);
  final String? fullname;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    var authBloc = BlocProvider.of<AuthBloc>(context);

    return SafeArea(
      top: true,
      bottom: true,
      child: Scaffold(
        body: Stack(
          children: [
            Container(
              margin: EdgeInsets.fromLTRB(20, 20, 20, 20),
              child:
                  Text("QR-code", style: Theme.of(context).textTheme.headline4),
            ),
            ListView(children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    margin: EdgeInsets.fromLTRB(20, 100, 20, 00),
                    child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Container(
                            padding: EdgeInsets.fromLTRB(0, 20, 0, 10),
                            child: ClipRRect(
                              borderRadius:
                                  BorderRadius.circular(80), // Image border
                              child: SizedBox.fromSize(
                                size: const Size.fromRadius(20), // Image radius
                                child: getProfileImage(
                                    authBloc.state.user?["profile_image"]),
                              ),
                            ),
                          ),
                          Container(
                            padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
                            child: Text(fullname!,
                                style: Theme.of(context).textTheme.headline6),
                          ),
                        ]),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        padding: EdgeInsets.fromLTRB(20, 20, 20, 20),
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(25),
                            border: Border.all(
                              color: Color(0xFFB4B4B4),
                            )),
                        margin: EdgeInsets.fromLTRB(50, 20, 20, 20),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                                child: Image.asset(
                                    "assets/images/QR-sample.png",
                                    fit: BoxFit.fill)),
                            Container(
                                child: Text("Scan the QR-code to enable 2FA",
                                    style:
                                        Theme.of(context).textTheme.bodyText1)),
                          ],
                        ),
                      ),
                      GestureDetector(
                        onTap: () => {
                          print(""),
                        },
                        child: SizedBox(
                          child: Icon(
                            Icons.share,
                            color: Theme.of(context).colorScheme.primary,
                            size: 30,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Container(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                            "*Unable to scan the QR-code, Proceed to manual entry",
                            style: Theme.of(context).textTheme.bodyText1),
                        Container(
                          padding: EdgeInsets.fromLTRB(20, 20, 20, 20),
                          child: const CustomOutlinedButton(
                            page: OtpPage(),
                            icon: Icon(Icons.chevron_right_outlined),
                          ),
                        ),
                      ],
                    ),
                  )
                ],
              ),
            ]),
            
          ],
        ),
      ),
    );
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
