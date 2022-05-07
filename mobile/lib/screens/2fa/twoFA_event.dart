part of 'twoFA_bloc.dart';

abstract class TwoFAEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetTwoFA extends TwoFAEvent {
  @override
  List<Object> get props => [];
}

class SendTwoFA extends TwoFAEvent {
  final String totpCode;
  SendTwoFA({required this.totpCode});

  @override
  List<Object> get props => [totpCode];
}

class DisableTwoFA extends TwoFAEvent {
  @override
  List<Object> get props => [];
}
