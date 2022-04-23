part of 'signup_bloc.dart';

enum SignupStatus {
  idle,
  submitting,
  success,
  errorUnknown,
  errorPassword,
  errorEmailUsed,
}

class SignupState extends Equatable {
  final int page;

  final String? firstName;
  final String? middleName;
  final String? lastName;
  final String? dob;
  final String? email;
  final String? address;
  final String? phoneNumber;
  final int? program;
  final int? sem;
  final String? joinYear;
  final String? password;
  final String? confirmPassword;
  final SignupStatus status;

  const SignupState({
    this.page = 1,
    this.firstName,
    this.middleName,
    this.lastName,
    this.dob,
    this.email,
    this.address,
    this.phoneNumber,
    this.program,
    this.sem,
    this.joinYear,
    this.password,
    this.confirmPassword,
    this.status = SignupStatus.idle,
  });

  SignupState copyWith({
    int? page,
    String? firstName,
    String? middleName,
    String? lastName,
    String? dob,
    String? email,
    String? address,
    String? phoneNumber,
    int? program,
    int? sem,
    String? joinYear,
    String? password,
    String? confirmPassword,
    SignupStatus? status,
  }) {
    return SignupState(
      page: page ?? this.page,
      firstName: firstName ?? this.firstName,
      middleName: middleName ?? this.middleName,
      lastName: lastName ?? this.lastName,
      dob: dob ?? this.dob,
      email: email ?? this.email,
      address: address ?? this.address,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      program: program ?? this.program,
      sem: sem ?? this.sem,
      joinYear: joinYear ?? this.joinYear,
      password: password ?? this.password,
      confirmPassword: confirmPassword ?? this.confirmPassword,
      status: status ?? this.status,
    );
  }

  @override
  List<Object?> get props => [
        page,
        firstName,
        middleName,
        lastName,
        dob,
        email,
        address,
        phoneNumber,
        program,
        sem,
        joinYear,
        password,
        confirmPassword,
        status,
      ];
}
