import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';
import 'package:sikshyalaya/screens/Signup/components/CustomOutlinedButton.dart';
import 'package:sikshyalaya/screens/Signup/components/contact_information.dart';
import 'package:sikshyalaya/screens/Signup/components/password_confirmation.dart';
import 'package:provider/provider.dart';
import 'package:sikshyalaya/screens/Signup/program_bloc.dart';
import 'package:sikshyalaya/screens/Signup/signup_bloc.dart';

class ProgramInformation extends StatelessWidget {
  const ProgramInformation({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocProvider<ProgramBloc>(
      create: (context) => ProgramBloc(),
      child: BlocBuilder<ProgramBloc, ProgramState>(
        buildWhen: (prev, next) => prev != next,
        builder: (context, state) {
          return SafeArea(
            top: true,
            bottom: true,
            child: Scaffold(
              body: SingleChildScrollView(
                child: SizedBox(
                  width: double.infinity,
                  height: size.height,
                  child: Stack(alignment: Alignment.center, children: <Widget>[
                    Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        Container(
                          alignment: Alignment.centerRight,
                          margin: const EdgeInsets.fromLTRB(0, 40, 20, 0),
                          child: const Text("Program Information"),
                        ),
                        Container(
                          child: Image.asset(
                            "assets/images/logo.png",
                            width: size.width * 0.5,
                          ),
                          padding: const EdgeInsets.fromLTRB(0, 30, 0, 0),
                        ),
                        Container(
                          margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
                          width: size.width * 0.8,
                          child: DropdownButton<int>(
                            icon: const Icon(Icons.arrow_downward),
                            elevation: 16,
                            value: context.read<SignupBloc>().state.program,
                            menuMaxHeight: size.height / 2,
                            isExpanded: true,
                            hint: const Text("Program"),
                            onChanged: (value) {
                              context
                                  .read<SignupBloc>()
                                  .add(ProgramChanged(program: value));
                            },
                            items: state.program
                                ?.map((program) => DropdownMenuItem(
                                      value: program["id"] as int,
                                      child: Text(program["name"]),
                                    ))
                                .toList(),
                          ),
                        ),
                        Container(
                          margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
                          width: size.width * 0.8,
                          child: DropdownButton<int>(
                            icon: const Icon(Icons.arrow_downward),
                            elevation: 16,
                            value: context.read<SignupBloc>().state.sem,
                            menuMaxHeight: size.height / 2,
                            isExpanded: true,
                            hint: const Text("Group"),
                            onChanged: (value) {
                              context
                                  .read<SignupBloc>()
                                  .add(SemChanged(sem: value));
                            },
                            items: [
                              {"id": 1, "name": "I"},
                              {"id": 2, "name": "II"},
                              {"id": 3, "name": "III"},
                              {"id": 4, "name": "IV"},
                              {"id": 5, "name": "V"},
                              {"id": 6, "name": "VI"},
                              {"id": 7, "name": "VII"},
                              {"id": 8, "name": "VIII"},
                            ]
                                .map((sem) => DropdownMenuItem(
                                      value: sem["id"] as int,
                                      child: Text(sem["name"].toString()),
                                    ))
                                .toList(),
                          ),
                        ),
                        CustomTextField(
                          placeHolder: "Join Year",
                          margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
                          onChanged: (value) => context.read<SignupBloc>().add(
                                JoinYearChanged(joinYear: value),
                              ),
                        ),
                        Expanded(
                          child: Container(
                            alignment: Alignment.bottomRight,
                            margin: const EdgeInsets.fromLTRB(0, 0, 0, 0),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: <Widget>[
                                Container(
                                  alignment: Alignment.bottomRight,
                                  child: CustomOutlinedButton(
                                      icon: const Icon(
                                          Icons.chevron_right_outlined),
                                      press: PasswordConfirmation()),
                                  margin: EdgeInsets.fromLTRB(0, 0,
                                      size.width * 0.1, size.height * 0.05),
                                )
                              ],
                            ),
                          ),
                        )
                      ],
                    )
                  ]),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
