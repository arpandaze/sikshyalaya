part of 'personal_bloc.dart';

class PersonalState extends Equatable {
  final String fullname;
  final String address;
  final String dob;
  final String contactNumber;

  const PersonalState({
    this.fullname = "",
    this.address = "",
    this.dob = "",
    this.contactNumber = "",
  });

  PersonalState copyWith({
    fullname,
    address,
    dob,
    contactNumber,
  }) {
    return PersonalState(
      fullname: fullname ?? this.fullname,
      address: address ?? this.address,
      dob: dob ?? this.dob,
      contactNumber: contactNumber ?? this.contactNumber,
    );
  }

  @override
  List<Object?> get props => [fullname, address, dob, contactNumber];
}
