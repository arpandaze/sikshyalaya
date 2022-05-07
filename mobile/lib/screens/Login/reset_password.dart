import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/repository/reset_password.dart';
import 'package:sikshyalaya/screens/Login/components/CustomEditTextField.dart';
import 'package:sikshyalaya/screens/Login/components/CustomFilledButton.dart';
import 'package:sikshyalaya/screens/Login/reset_password_bloc.dart';

import '../../global/authentication/auth_bloc.dart';

class ResetPassword extends StatelessWidget {
  const ResetPassword({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => ResetPasswordBloc(
        resetPasswordRepository: ResetPasswordRepository(
          token: context.read<AuthBloc>().state.token,
        ),
      ),
      child: body(context),
    );
  }

  @override
  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    String emailAddress = "";

    return BlocBuilder<ResetPasswordBloc, ResetPasswordState>(
        buildWhen: (prev, next) => prev != next,
        builder: (context, state) {
          return Stack(
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
                            child: SvgPicture.asset("assets/images/reset.svg",
                                width: size.width * 0.8),
                            padding: const EdgeInsets.fromLTRB(0, 0, 0, 0),
                          ),
                          Container(
                            child: Image.asset("assets/images/logo.png",
                                width: size.width * 0.5),
                            padding: const EdgeInsets.fromLTRB(0, 60, 0, 0),
                          ),
                          CustomEditTextField(
                            initialVal: state.emailAddress,
                            onChanged: (value) => {
                              context
                                  .read<ResetPasswordBloc>()
                                  .add(EmailAddressChanged(emailAddress: value))
                            },
                            width: size.width * 0.9,
                            placeHolder: "Email",
                            margin: EdgeInsets.fromLTRB(0, 60, 0, 30),
                          ),
                          CustomFilledButton(
                              onPressed: () {
                                context.read<ResetPasswordBloc>().add(
                                      RequestResetPassword(
                                          emailAddress: state.emailAddress),
                                    );
                              },
                              text: "Reset Password"),
                          state.responseMessage != null
                              ? Row(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Container(
                                      width: size.width * 0.8,
                                      margin: EdgeInsets.fromLTRB(0, 10, 0, 0),
                                      child: Text(state.responseMessage,
                                          textAlign: TextAlign.center,
                                          style: Theme.of(context)
                                              .textTheme
                                              .subtitle2),
                                    )
                                  ],
                                )
                              : Container(),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          );
        });
  }
}
