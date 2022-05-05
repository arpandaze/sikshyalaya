part of 'personal_bloc.dart';

class PersonalState extends Equatable {
  final String firstname;
  final String middlename;
  final String lastname;
  final String address;
  final String dob;
  final String contactNumber;

  const PersonalState({
    this.firstname = "",
    this.middlename = "",
    this.lastname = "",
    this.address = "",
    this.dob = "",
    this.contactNumber = "",
  });

  PersonalState copyWith({
    firstname,
    middlename,
    lastname,
    address,
    dob,
    contactNumber,
  }) {
    return PersonalState(
      firstname: firstname ?? this.firstname,
      middlename: middlename ?? this.middlename,
      lastname: lastname ?? this.lastname,
      address: address ?? this.address,
      dob: dob ?? this.dob,
      contactNumber: contactNumber ?? this.contactNumber,
    );
  }

  @override
  List<Object?> get props =>
      [firstname, middlename, lastname, address, dob, contactNumber];
}
