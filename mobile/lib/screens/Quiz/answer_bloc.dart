import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'answer_state.dart';
part 'answer_event.dart';

class AnswerBloc extends Bloc<AnswerEvent, AnswerState> {
  AnswerBloc() : super(const AnswerState()) {
    on<RadioValueChanged>(_radioValueChanged);
    on<CheckedValueChanged>(_checkedValueChanged);
  }

  void _radioValueChanged(RadioValueChanged event, Emitter<AnswerState> emit) {
    emit(state.copyWith(radioValueGroup: event.value));
  }

  void _checkedValueChanged(
      CheckedValueChanged event, Emitter<AnswerState> emit) {
    List newValue;
    print(state.checkValues);
    if (state.checkValues == null) {
      newValue = [event.addValue];
    } else {
      newValue = [...state.checkValues!];
      if (newValue.contains(event.addValue)) {
        newValue.remove(event.addValue);
      } else {
        newValue.add(event.addValue);
      }
      print(state.checkValues);
    }
    emit(state.copyWith(checkValues: newValue));
  }
}
