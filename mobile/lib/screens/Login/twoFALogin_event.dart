part of 'twoFALogin_bloc.dart';

abstract class TwoFALoginEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetTwoFA extends TwoFALoginEvent {
  @override
  List<Object> get props => [];
}

class SendTwoFA extends TwoFALoginEvent {
  final String totpCode;
  SendTwoFA({required this.totpCode});

  @override
  List<Object> get props => [totpCode];
}

class DisableTwoFA extends TwoFALoginEvent {
  @override
  List<Object> get props => [];
}
