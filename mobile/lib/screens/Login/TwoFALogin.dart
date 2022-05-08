import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:otp_text_field/otp_field.dart';
import 'package:otp_text_field/style.dart';
import 'package:sikshyalaya/repository/reset_password.dart';
import 'package:sikshyalaya/repository/twoFALogin.dart';
import 'package:sikshyalaya/screens/Login/components/CustomEditTextField.dart';
import 'package:sikshyalaya/screens/Login/components/CustomFilledButton.dart';
import 'package:sikshyalaya/screens/Login/reset_password_bloc.dart';
import 'package:sikshyalaya/screens/Login/twoFALogin_bloc.dart';

import '../../global/authentication/auth_bloc.dart';

class TwoFALogin extends StatelessWidget {
  final String tempToken;
  const TwoFALogin({Key? key, required this.tempToken}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => TwoFALoginBloc(
        twoFARepository: TwoFALoginRepository(
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

    OtpFieldController otpController = OtpFieldController();
    return BlocBuilder<AuthBloc, AuthState>(
        buildWhen: (prev, next) => prev != next,
        builder: (context, state) {
          return BlocConsumer<TwoFALoginBloc, TwoFALoginState>(
              listener: (context, state) {
                if (state.twoFASuccess) {
                  context.read<AuthBloc>().add(LoggedIn());
                }
              },
              buildWhen: (prev, next) => prev != next,
              builder: (context, twoState) {
                return SafeArea(
                  top: true,
                  bottom: true,
                  child: Scaffold(
                      body: Stack(
                    children: [
                      Scaffold(
                        body: ListView(
                          children: [
                            SizedBox(
                              width: double.infinity,
                              height: size.height,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                  Container(
                                    child: SvgPicture.asset(
                                        "assets/images/reset.svg",
                                        width: size.width * 0.8),
                                    padding:
                                        const EdgeInsets.fromLTRB(0, 0, 0, 0),
                                  ),
                                  Container(
                                    child: Image.asset("assets/images/logo.png",
                                        width: size.width * 0.5),
                                    padding:
                                        const EdgeInsets.fromLTRB(0, 60, 0, 0),
                                  ),
                                  Container(
                                    margin: EdgeInsets.fromLTRB(0, 30, 0, 10),
                                    child: Text('Two Factor Authentication',
                                        style: Theme.of(context)
                                            .textTheme
                                            .headline5),
                                  ),
                                  Container(
                                    margin: EdgeInsets.fromLTRB(0, 10, 0, 10),
                                    child: Text('Enter the 6-digit OTP code',
                                        style: Theme.of(context)
                                            .textTheme
                                            .headline6),
                                  ),
                                  Container(
                                    padding: const EdgeInsets.fromLTRB(
                                        20, 20, 20, 20),
                                    width: size.width,
                                    child: OTPTextField(
                                      controller: otpController,
                                      length: 6,
                                      fieldWidth: 40,
                                      style: const TextStyle(fontSize: 17),
                                      textFieldAlignment:
                                          MainAxisAlignment.spaceAround,
                                      fieldStyle: FieldStyle.box,
                                      onCompleted: (pin) {
                                        context
                                            .read<TwoFALoginBloc>()
                                            .add(SendTwoFA(
                                              tempToken: tempToken,
                                              totpCode: pin,
                                            ));
                                      },
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  )),
                );
              });
        });
  }
}
