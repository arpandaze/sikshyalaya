import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/helpers/helper.dart';
import 'package:sikshyalaya/repository/password.dart';
import 'package:sikshyalaya/repository/personal.dart';

part 'change_password_state.dart';
part 'change_password_event.dart';

class PasswordBloc extends Bloc<PasswordEvent, PasswordState> {
  PasswordBloc({required this.passwordRepository})
      : super(const PasswordState()) {
    // on<GetPersonal>(_onGetPersonal);
    on<EditPassword>(_onEditPassword);
    on<CurrentChanged>(_onCurrentChanged);
    on<NewChanged>(_onNewChanged);
    on<ConfirmChanged>(_onConfirmChanged);
    // add(
    //   GetPersonal(),
    // );
  }

  final PasswordRepository passwordRepository;
  // void _onGetPersonal(GetPersonal event, Emitter<PasswordState> emit) async {
  //   final personal = await personalRepository.getPersonal();
  //   final tempName = nameHandler(personal['full_name']);
  //   emit(
  //     state.copyWith(
  //       firstname: tempName['firstName'],
  //       middlename: tempName['middleName'],
  //       lastname: tempName['lastName'],
  //       address: personal['address'],
  //       dob: personal['dob'],
  //       contactNumber: personal['contact_number'],
  //     ),
  //   );
  // }

  void _onCurrentChanged(
      CurrentChanged event, Emitter<PasswordState> emit) async {
    emit(state.copyWith(
      currentPassword: event.currentPassword,
    ));
  }

  void _onNewChanged(NewChanged event, Emitter<PasswordState> emit) async {
    emit(state.copyWith(
      newPassword: event.newPassword,
    ));
  }

  void _onConfirmChanged(
      ConfirmChanged event, Emitter<PasswordState> emit) async {
    emit(state.copyWith(
      confirmPassword: event.confirmPassword,
    ));
  }

  void _onEditPassword(EditPassword event, Emitter<PasswordState> emit) async {
    var body = {
      "current_password": event.currentPassword,
      "new_password": event.newPassword,
    };
    passwordRepository.editPassword(
      body: body,
    );
  }
}
