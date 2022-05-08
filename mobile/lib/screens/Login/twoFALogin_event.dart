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
  final String tempToken;
  SendTwoFA({required this.totpCode, required this.tempToken});

  @override
  List<Object> get props => [totpCode, tempToken];
}

class DisableTwoFA extends TwoFALoginEvent {
  @override
  List<Object> get props => [];
}
