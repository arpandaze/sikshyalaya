part of 'twoFALogin_bloc.dart';

class TwoFALoginState extends Equatable {
  final String totp;

  const TwoFALoginState({
    this.totp = "",
  });

  TwoFALoginState copyWith({totp}) {
    return TwoFALoginState(
      totp: totp ?? this.totp,
    );
  }

  @override
  List<Object?> get props => [totp];
}
