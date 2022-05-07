import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:otp_text_field/otp_field.dart';
import 'package:otp_text_field/style.dart';
import 'package:sikshyalaya/components/CustomFilledButtonSecond.dart';
import 'package:sikshyalaya/screens/2fa/components/CustomFilledButton.dart';
import 'package:sikshyalaya/repository/twoFA.dart';
import 'package:sikshyalaya/screens/2fa/twoFA_bloc.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:qr_flutter/qr_flutter.dart';

class Twofactorauthentication extends StatelessWidget {
  const Twofactorauthentication({Key? key, required this.fullname})
      : super(key: key);
  final String? fullname;

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => TwoFABloc(
        twoFARepository: TwoFARepository(
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
          return BlocConsumer<TwoFABloc, TwoFAState>(
              listener: (context, state2) {
                if (state2.tFASwitch) {
                  Navigator.pop(context);
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
                        Container(
                          margin: const EdgeInsets.all(20),
                          child: Text("QR-code",
                              style: Theme.of(context).textTheme.headline4),
                        ),
                        twoState.tFASecret['uri'] != null
                            ? ListView(children: [
                                Container(
                                  margin:
                                      const EdgeInsets.fromLTRB(0, 100, 0, 0),
                                ),
                                Row(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.all(20),
                                      decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(25),
                                          border: Border.all(
                                            color: const Color(0xFFB4B4B4),
                                          )),
                                      margin: const EdgeInsets.fromLTRB(
                                          0, 20, 0, 20),
                                      child: Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          QrImage(
                                            data: twoState.tFASecret['uri'],
                                            version: QrVersions.auto,
                                            size: 200.0,
                                          ),
                                          Column(
                                            children: [
                                              SizedBox(
                                                width: size.width * 0.6,
                                                child: Text(
                                                  "Scan the QR-code with an authenticator App",
                                                  style: Theme.of(context)
                                                      .textTheme
                                                      .bodyText1,
                                                  textAlign: TextAlign.center,
                                                ),
                                              ),
                                              Container(
                                                width: size.width * 0.6,
                                                margin:
                                                    const EdgeInsets.fromLTRB(
                                                        0, 10, 0, 10),
                                                child: Text(
                                                  "Or",
                                                  style: Theme.of(context)
                                                      .textTheme
                                                      .headline6,
                                                  textAlign: TextAlign.center,
                                                ),
                                              ),
                                              SizedBox(
                                                width: size.width * 0.6,
                                                child: Text('Secret-key:',
                                                    style: Theme.of(context)
                                                        .textTheme
                                                        .subtitle1,
                                                    textAlign:
                                                        TextAlign.center),
                                              ),
                                              SizedBox(
                                                width: size.width * 0.6,
                                                child: Text(
                                                  twoState.tFASecret['secret'],
                                                  style: Theme.of(context)
                                                      .textTheme
                                                      .bodyText1,
                                                  textAlign: TextAlign.center,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                                Column(
                                  children: [
                                    Container(
                                      child: Text(
                                        'Enter the code from the authenticator',
                                        style: Theme.of(context)
                                            .textTheme
                                            .bodyText1,
                                      ),
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
                                          context.read<TwoFABloc>().add(
                                                SendTwoFA(totpCode: pin),
                                              );
                                        },
                                      ),
                                    ),
                                  ],
                                ),
                              ])
                            : ListView(
                                children: [
                                  Container(
                                    margin: const EdgeInsets.fromLTRB(
                                        20, 100, 20, 00),
                                  ),
                                  Row(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.center,
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.fromLTRB(
                                            20, 20, 20, 20),
                                        decoration: BoxDecoration(
                                            borderRadius:
                                                BorderRadius.circular(25),
                                            border: Border.all(
                                              color: const Color(0xFFB4B4B4),
                                            )),
                                        margin: const EdgeInsets.fromLTRB(
                                            50, 20, 20, 20),
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: [
                                            Column(
                                              children: [
                                                SizedBox(
                                                  width: size.width * 0.6,
                                                  child: Text(
                                                    "Two Factor Authentication is already enabled.",
                                                    style: Theme.of(context)
                                                        .textTheme
                                                        .bodyText1,
                                                    textAlign: TextAlign.center,
                                                  ),
                                                ),
                                                GestureDetector(
                                                  onTap: () {
                                                    context
                                                        .read<TwoFABloc>()
                                                        .add(DisableTwoFA());
                                                  },
                                                  child: Container(
                                                    decoration: BoxDecoration(
                                                      color: Theme.of(context)
                                                          .colorScheme
                                                          .primary,
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              15),
                                                    ),
                                                    width: size.width * 0.6,
                                                    height: size.width * 0.15,
                                                    margin: const EdgeInsets
                                                        .fromLTRB(0, 20, 0, 0),
                                                    child: Row(
                                                      mainAxisAlignment:
                                                          MainAxisAlignment
                                                              .center,
                                                      children: [
                                                        Text(
                                                          'Disable TwoFA',
                                                          textAlign:
                                                              TextAlign.center,
                                                          style: TextStyle(
                                                            color: Theme.of(
                                                                    context)
                                                                .colorScheme
                                                                .background,
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                )
                                              ],
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                        Positioned(
                          top: size.height * 0.02,
                          right: 10,
                          child: GestureDetector(
                            onTap: () => {
                              Navigator.pop(context),
                            },
                            child: SizedBox(
                              child: Icon(
                                Icons.close,
                                color: Theme.of(context).colorScheme.primary,
                                size: 30,
                              ),
                            ),
                          ),
                        )
                      ],
                    ),
                  ),
                );
              });
        });
  }
}
