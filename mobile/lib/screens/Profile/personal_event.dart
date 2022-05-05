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

class FirstNameChanged extends PersonalEvent {
  final String firstname;

  FirstNameChanged({
    this.firstname = "",
  });

  @override
  List<Object> get props => [
        firstname,
      ];
}

class MiddleNameChanged extends PersonalEvent {
  final String middlename;

  MiddleNameChanged({
    this.middlename = "",
  });

  @override
  List<Object> get props => [
        middlename,
      ];
}

class LastNameChanged extends PersonalEvent {
  final String lastname;

  LastNameChanged({
    this.lastname = "",
  });

  @override
  List<Object> get props => [
        lastname,
      ];
}

class AddressChanged extends PersonalEvent {
  final String address;

  AddressChanged({
    this.address = "",
  });

  @override
  List<Object> get props => [
        address,
      ];
}

class ContactChanged extends PersonalEvent {
  final String contactNumber;

  ContactChanged({
    this.contactNumber = "",
  });

  @override
  List<Object> get props => [
        contactNumber,
      ];
}

class DateChanged extends PersonalEvent {
  final String dob;

  DateChanged({
    this.dob = "",
  });

  @override
  List<Object> get props => [
        dob,
      ];
}
