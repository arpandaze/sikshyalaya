part of 'twoFA_bloc.dart';

class TwoFAState extends Equatable {
  final Map tFASecret;
  final bool tFASwitch;

  const TwoFAState({
    this.tFASecret = const {},
    this.tFASwitch = false,
  });

  TwoFAState copyWith({tFASecret, tFASwitch}) {
    return TwoFAState(
      tFASecret: tFASecret ?? this.tFASecret,
      tFASwitch: tFASwitch ?? this.tFASwitch,
    );
  }

  @override
  List<Object?> get props => [tFASecret, tFASwitch];
}
