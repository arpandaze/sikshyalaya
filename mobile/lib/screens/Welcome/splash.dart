import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:sikshyalaya/components/AuthStateWrapper.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background,
      body: AuthStateWrapper(child: body(context)),
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
                Expanded(
                  child: Container(
                    alignment: Alignment.bottomCenter,
                    margin: const EdgeInsets.fromLTRB(0, 0, 0, 20),
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Container(
                            child: Image.asset(
                              "assets/images/logo.png",
                              width: size.width * 0.50,
                            ),
                            padding: const EdgeInsets.symmetric(vertical: 20),
                          ),
                          SpinKitPouringHourGlass(
                            color: Theme.of(context).colorScheme.primary,
                            size: 40,
                          ),
                        ]),
                  ),
                ),
              ],
            )
          ],
        ));
  }
}
