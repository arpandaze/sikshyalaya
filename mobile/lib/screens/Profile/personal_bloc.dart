import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/repository/personal.dart';

part 'personal_state.dart';
part 'personal_event.dart';

class PersonalBloc extends Bloc<PersonalEvent, PersonalState> {
  PersonalBloc({required this.personalRepository})
      : super(const PersonalState()) {
    on<GetPersonal>(_onGetPersonal);
    on<EditPersonal>(_onEditPersonal);
    add(
      GetPersonal(),
    );
  }

  final PersonalRepository personalRepository;
  void _onGetPersonal(GetPersonal event, Emitter<PersonalState> emit) async {
    final personal = await personalRepository.getPersonal();
    emit(
      state.copyWith(
        fullname: personal['full_name'],
        address: personal['address'],
        dob: personal['dob'],
        contactNumber: personal['contact_number'],
      ),
    );
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
      fullname: returnPersonal["fullname"],
      address: returnPersonal["address"],
      contactNumber: returnPersonal["contactNumber"],
      dob: returnPersonal["dob"],
    ));
  }
}
