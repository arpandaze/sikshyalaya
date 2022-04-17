part of 'answer_bloc.dart';

abstract class AnswerEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class RadioValueChanged extends AnswerEvent {
  final int value;

  RadioValueChanged({
    required this.value,
  });

  @override
  List<Object> get props => [value];
}

class CheckedValueChanged extends AnswerEvent {
  final int addValue;

  CheckedValueChanged({
    required this.addValue,
  });

  @override
  List<Object> get props => [addValue];
}
