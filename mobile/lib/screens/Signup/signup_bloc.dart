import 'dart:async';
import 'dart:convert';

import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;
import 'package:sikshyalaya/constants.dart';

part 'signup_event.dart';
part 'signup_state.dart';

class SignupBloc extends Bloc<SignupChangeEvent, SignupState> {
  List<dynamic>? group;

  SignupBloc() : super(const SignupState()) {
    on<FirstNameChanged>(_onFirstNameChanged);
    on<MiddleNameChanged>(_onMiddleNameChanged);
    on<LastNameChanged>(_onLastNameChanged);
    on<DOBChanged>(_onDOBChanged);
    on<EmailChanged>(_onEmailChanged);
    on<AddressChanged>(_onAddressChanged);
    on<PhoneNumberChanged>(_onPhoneNumberChanged);
    on<ProgramChanged>(_onProgramChanged);
    on<SemChanged>(_onSemChanged);
    on<JoinYearChanged>(_onJoinYearChanged);
    on<PasswordChanged>(_onPasswordChanged);
    on<ConfirmPasswordChanged>(_onConfirmPasswordChanged);
    on<PageChanged>(_onPageChanged);
    on<PreviousPage>(_onPreviousPage);
    on<NextPage>(_onNextPage);
    on<SignupSubmit>(_onSignupSubmit);
    on<SignupStatusEvent>(_onSignupStatusEvent);
  }

  void _onFirstNameChanged(FirstNameChanged event, Emitter<SignupState> emit) {
    emit(state.copyWith(firstName: event.firstName));
  }

  void _onMiddleNameChanged(
      MiddleNameChanged event, Emitter<SignupState> emit) {
    emit(state.copyWith(middleName: event.middleName));
  }

  void _onLastNameChanged(LastNameChanged event, Emitter<SignupState> emit) {
    emit(state.copyWith(lastName: event.lastName));
  }

  void _onDOBChanged(DOBChanged event, Emitter<SignupState> emit) {
    emit(state.copyWith(dob: event.dob));
  }

  void _onEmailChanged(EmailChanged event, Emitter<SignupState> emit) {
    emit(state.copyWith(email: event.email));
  }

  void _onAddressChanged(AddressChanged event, Emitter<SignupState> emit) {
    emit(state.copyWith(address: event.address));
  }

  void _onPhoneNumberChanged(
      PhoneNumberChanged event, Emitter<SignupState> emit) {
    emit(state.copyWith(phoneNumber: event.phoneNumber));
  }

  void _onProgramChanged(ProgramChanged event, Emitter<SignupState> emit) {
    emit(state.copyWith(program: event.program));
  }

  void _onSemChanged(SemChanged event, Emitter<SignupState> emit) {
    emit(state.copyWith(sem: event.sem));
  }

  void _onJoinYearChanged(JoinYearChanged event, Emitter<SignupState> emit) {
    emit(state.copyWith(joinYear: event.joinYear));
  }

  void _onPasswordChanged(PasswordChanged event, Emitter<SignupState> emit) {
    emit(state.copyWith(password: event.password));
  }

  void _onConfirmPasswordChanged(
      ConfirmPasswordChanged event, Emitter<SignupState> emit) {
    emit(state.copyWith(confirmPassword: event.confirmPassword));
  }

  void _onPageChanged(PageChanged event, Emitter<SignupState> emit) {
    emit(state.copyWith(page: event.page));
  }

  void _onPreviousPage(PreviousPage event, Emitter<SignupState> emit) {
    emit(state.copyWith(page: state.page - 1));
  }

  void _onNextPage(NextPage event, Emitter<SignupState> emit) {
    emit(state.copyWith(page: state.page + 1));
  }

  void _onSignupStatusEvent(
    SignupStatusEvent event,
    Emitter<SignupState> emit,
  ) {
    emit(state.copyWith(status: event.status));
  }

  void _onSignupSubmit(_, Emitter<SignupState> emit) async {
    emit(state.copyWith(status: SignupStatus.submitting));
    if (state.program != null &&
        state.sem != null &&
        state.firstName != null &&
        state.lastName != null &&
        state.dob != null &&
        state.email != null &&
        state.password != null) {

      if (state.password != state.confirmPassword) {
        emit(state.copyWith(status: SignupStatus.errorPassword));
        return;
      }

      final values = {
        "email": state.email,
        "full_name": getFullName(
          state.firstName!,
          state.middleName,
          state.lastName!,
        ),
        "address": state.address,
        "group_id": await getGroup(state.program!, state.sem!),
        "contact_number": state.phoneNumber,
        "dob": state.dob,
        "join_year": state.joinYear,
        "password": state.password,
      };

      final client = http.Client();

      final groupsUri = Uri.parse("$backendBase/auth/signup/");
      final groupResp = await client.post(
        groupsUri,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(values),
      );

      if (groupResp.statusCode != 200) {
        emit(state.copyWith(status: SignupStatus.errorUnknown));
        return;
      }

      emit(state.copyWith(status: SignupStatus.success, page: state.page + 1));
    }
  }

  Future<int> getGroup(int program, int sem) async {
    if (group == null) {
      final client = http.Client();

      final groupsUri = Uri.parse("$backendBase/group/all/");
      final groupResp = await client.get(groupsUri);
      assert(groupResp.statusCode == 200);
      group = jsonDecode(groupResp.body);
    }

    final groupId = group?.where((singleGroup) {
      return singleGroup["program_id"] == program && singleGroup["sem"] == sem;
    }).toList()[0]["id"];

    return groupId;
  }

  String getFullName(String fname, String? mname, String lname) {
    if (mname != null && mname != "") {
      return "$fname $mname $lname";
    } else {
      return "$fname $lname";
    }
  }
}
