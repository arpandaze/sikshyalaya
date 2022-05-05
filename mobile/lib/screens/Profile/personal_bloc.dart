import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/helpers/helper.dart';
import 'package:sikshyalaya/repository/personal.dart';

part 'personal_state.dart';
part 'personal_event.dart';

class PersonalBloc extends Bloc<PersonalEvent, PersonalState> {
  PersonalBloc({required this.personalRepository})
      : super(const PersonalState()) {
    on<GetPersonal>(_onGetPersonal);
    on<EditPersonal>(_onEditPersonal);
    on<FirstNameChanged>(_onFirstNameChanged);
    on<MiddleNameChanged>(_onMiddleNameChanged);
    on<LastNameChanged>(_onLastNameChanged);
    on<AddressChanged>(_onAddressChanged);
    on<ContactChanged>(_onContactChanged);
    on<DateChanged>(_onDateChanged);
    add(
      GetPersonal(),
    );
  }

  final PersonalRepository personalRepository;
  void _onGetPersonal(GetPersonal event, Emitter<PersonalState> emit) async {
    final personal = await personalRepository.getPersonal();
    final tempName = nameHandler(personal['full_name']);
    emit(
      state.copyWith(
        firstname: tempName['firstName'],
        middlename: tempName['middleName'],
        lastname: tempName['lastName'],
        address: personal['address'],
        dob: personal['dob'],
        contactNumber: personal['contact_number'],
      ),
    );
  }

  void _onFirstNameChanged(
      FirstNameChanged event, Emitter<PersonalState> emit) async {
    emit(state.copyWith(
      firstname: event.firstname,
    ));
  }

  void _onMiddleNameChanged(
      MiddleNameChanged event, Emitter<PersonalState> emit) async {
    emit(state.copyWith(
      middlename: event.middlename,
    ));
  }

  void _onLastNameChanged(
      LastNameChanged event, Emitter<PersonalState> emit) async {
    emit(state.copyWith(
      lastname: event.lastname,
    ));
  }

  void _onAddressChanged(
      AddressChanged event, Emitter<PersonalState> emit) async {
    emit(state.copyWith(
      address: event.address,
    ));
  }

  void _onContactChanged(
      ContactChanged event, Emitter<PersonalState> emit) async {
    emit(state.copyWith(
      contactNumber: event.contactNumber,
    ));
  }

  void _onDateChanged(DateChanged event, Emitter<PersonalState> emit) async {
    emit(state.copyWith(
      dob: event.dob,
    ));
  }

  void _onEditPersonal(EditPersonal event, Emitter<PersonalState> emit) async {
    var fullname = event.firstname;
    if (event.middlename != "") {
      fullname += " ${event.middlename}";
    }
    fullname += " ${event.lastname}";

    var newPersonal = {
      "full_name": fullname,
      "address": event.address,
      "contact_number": event.contactNumber,
      "dob": event.dob,
    };
    var returnPersonal = await personalRepository.editPersonal(
      body: newPersonal,
    );
    emit(state.copyWith(
      // fullname: returnPersonal["fullname"],
      address: returnPersonal["address"],
      contactNumber: returnPersonal["contactNumber"],
      dob: returnPersonal["dob"],
    ));
  }
}
