import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/screens/Signup/components/contact_information.dart';
import 'package:sikshyalaya/screens/Signup/components/password_confirmation.dart';
import 'package:sikshyalaya/screens/Signup/components/personal_information.dart';
import 'package:sikshyalaya/screens/Signup/components/program_information.dart';
import 'package:sikshyalaya/screens/Signup/components/signupSuccess.dart';
import 'package:sikshyalaya/screens/Signup/signup_bloc.dart';

class SignupScreen extends StatelessWidget {
  const SignupScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider<SignupBloc>(
      create: (context) => SignupBloc(),
      child: BlocBuilder<SignupBloc, SignupState>(
          buildWhen: (previous, current) => previous != current,
          builder: (context, state) {
            return WillPopScope(
              onWillPop: () => onBackClicked(state.page, context),
              child: SafeArea(
                top: true,
                bottom: true,
                child: Scaffold(
                  backgroundColor: Theme.of(context).colorScheme.background,
                  body: generatePage(state.page),
                ),
              ),
            );
          }),
    );
  }

  Widget generatePage(int page) {
    return Stack(
      children: [
        Visibility(
          child: PersonalInformation(),
          visible: page == 1,
          maintainState: true,
        ),
        Visibility(
          child: ContactInformation(),
          visible: page == 2,
          maintainState: true,
        ),
        Visibility(
          child: ProgramInformation(),
          visible: page == 3,
          maintainState: true,
        ),
        Visibility(
          child: PasswordConfirmation(),
          visible: page == 4,
          maintainState: true,
        ),
        Visibility(
          child: SignupSuccess(),
          visible: page == 5,
          maintainState: true,
        ),
      ],
    );
  }

  Future<bool> onBackClicked(int page, BuildContext context) async {
    if (page <= 1 || page >= 5) {
      return true;
    } else {
      context.read<SignupBloc>().add(PreviousPage());
      return false;
    }
  }
}
