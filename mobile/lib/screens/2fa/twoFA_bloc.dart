import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/helpers/helper.dart';
import 'package:sikshyalaya/repository/personal.dart';
import 'package:sikshyalaya/repository/twoFA.dart';

part 'twoFA_state.dart';
part 'twoFA_event.dart';

class TwoFABloc extends Bloc<TwoFAEvent, TwoFAState> {
  TwoFABloc({required this.twoFARepository}) : super(const TwoFAState()) {
    on<GetTwoFA>(_onGetTwoFA);
    on<SendTwoFA>(_onSendTwoFA);
    on<DisableTwoFA>(_onDisableTwoFA);
    add(
      GetTwoFA(),
    );
  }

  final TwoFARepository twoFARepository;
  void _onGetTwoFA(GetTwoFA event, Emitter<TwoFAState> emit) async {
    final tFA = await twoFARepository.getTwoFA();
    emit(
      state.copyWith(
        tFASecret: tFA,
      ),
    );
  }

  void _onSendTwoFA(SendTwoFA event, Emitter<TwoFAState> emit) async {
    final tFA = await twoFARepository.sendTwoFA(totcode: event.totpCode);
    emit(state.copyWith(
      tFASwitch: true,
    ));
  }

  void _onDisableTwoFA(DisableTwoFA event, Emitter<TwoFAState> emit) async {
    twoFARepository.disableTwoFA();
    emit(state.copyWith(
      tFASwitch: true,
    ));
  }
}
