import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/helpers/helper.dart';
import 'package:sikshyalaya/repository/personal.dart';
import 'package:sikshyalaya/repository/twoFALogin.dart';

part 'twoFALogin_state.dart';
part 'twoFALogin_event.dart';

class TwoFALoginBloc extends Bloc<TwoFALoginEvent, TwoFALoginState> {
  TwoFALoginBloc({required this.twoFARepository})
      : super(const TwoFALoginState()) {
    on<SendTwoFA>(_onSendTwoFA);
  }

  final TwoFALoginRepository twoFARepository;
  void _onSendTwoFA(SendTwoFA event, Emitter<TwoFALoginState> emit) async {
    final tFA = await twoFARepository.sendTwoFA(totcode: event.totpCode);
  }
}
