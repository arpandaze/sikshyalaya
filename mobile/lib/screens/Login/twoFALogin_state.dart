part of 'twoFALogin_bloc.dart';

class TwoFALoginState extends Equatable {
  final String totp;

  final bool twoFASuccess;

  const TwoFALoginState({
    this.totp = "",
    this.twoFASuccess = false,
  });

  TwoFALoginState copyWith({
    String? totp,
    bool? twoFASuccess,
  }) {
    return TwoFALoginState(
      totp: totp ?? this.totp,
      twoFASuccess: twoFASuccess ?? this.twoFASuccess,
    );
  }

  @override
  List<Object?> get props => [totp];
}
