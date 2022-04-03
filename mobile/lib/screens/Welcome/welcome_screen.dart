import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/screens/Signup/signup_screen.dart';
import 'package:sikshyalaya/components/CustomFilledButton.dart';
import 'package:sikshyalaya/routes.dart';
import 'package:sikshyalaya/components/CustomFilledButton.dart';
import 'package:sikshyalaya/screens/Login/login_bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background,
      body: body(context),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return SizedBox(
        width: double.infinity,
        height: size.height,
        child: Stack(
          alignment: Alignment.center,
          children: <Widget>[
            Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Container(
                  child: SvgPicture.asset(
                    "assets/images/welcome.svg",
                    width: size.width * 0.78,
                  ),
                  padding: const EdgeInsets.fromLTRB(0, 60, 0, 0),
                ),
                Container(
                  width: size.width * 0.8,
                  margin: const EdgeInsets.symmetric(vertical: 25),
                  child: Text("Welcome.",
                      textAlign: TextAlign.left,
                      style: Theme.of(context).textTheme.headline5),
                ),
                SizedBox(
                  width: size.width * 0.8,
                  child: Text(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id euismod lectus, sed euismod est. Nullam hendrerit a metus pellentesque interdum.",
                    style: Theme.of(context).textTheme.bodyText2,
                  ),
                ),
                Expanded(
                  child: Container(
                    alignment: Alignment.bottomCenter,
                    margin: const EdgeInsets.fromLTRB(0, 0, 0, 20),
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: <Widget>[
                          Container(
                            child: Image.asset(
                              "assets/images/logo.png",
                              width: size.width * 0.38,
                            ),
                            padding: const EdgeInsets.symmetric(vertical: 20),
                          ),
                          Container(
                            width: size.width * 0.72,
                            decoration: BoxDecoration(
                              color: Theme.of(context).colorScheme.primary,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Stack(
                              children: <Widget>[
                                Positioned(
                                  right: 0,
                                  child: SizedBox(
                                    width: size.width * 0.38,
                                    child: CustomFilledButton(
                                      onPressed: "/login",
                                      buttonText: "Login",
                                      textColor: Theme.of(context)
                                          .colorScheme
                                          .onPrimary,
                                      colorType:
                                          Theme.of(context).colorScheme.primary,
                                    ),
                                  ),
                                ),
                                Positioned(
                                  child: SizedBox(
                                    width: size.width * 0.38,
                                    child: CustomFilledButton(
                                      buttonText: "Signup",
                                      colorType: Theme.of(context)
                                          .colorScheme
                                          .secondary,
                                      textColor: Theme.of(context)
                                          .colorScheme
                                          .onPrimary,
                                      onPressed: "/signup",
                                    ),
                                  ),
                                )
                              ],
                            ),
                          )
                        ]),
                  ),
                ),
              ],
            )
          ],
        ));
  }
}
