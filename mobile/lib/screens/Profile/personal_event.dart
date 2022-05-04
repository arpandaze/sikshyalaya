part of 'personal_bloc.dart';

abstract class PersonalEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetPersonal extends PersonalEvent {
  @override
  List<Object> get props => [];
}

class EditPersonal extends PersonalEvent {
  final String firstname;
  final String middlename;
  final String lastname;
  final String address;
  final String dob;
  final String contactNumber;

  EditPersonal({
    this.firstname = "",
    this.middlename = "",
    this.lastname = "",
    this.address = "",
    this.dob = "",
    this.contactNumber = "",
  });

  @override
  List<Object> get props => [
        firstname,
        middlename,
        lastname,
        address,
        dob,
        contactNumber,
      ];
}
