part of 'answer_bloc.dart';

class AnswerState extends Equatable {
  final int? radioValueGroup;
  final List? checkValues;

  const AnswerState({this.radioValueGroup = -1, this.checkValues = null});

  AnswerState copyWith({int? radioValueGroup, List? checkValues}) {
    return AnswerState(
      radioValueGroup: radioValueGroup ?? this.radioValueGroup,
      checkValues: checkValues ?? this.checkValues,
    );
  }

  @override
  List<Object?> get props => [radioValueGroup, checkValues];
}
