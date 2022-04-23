part of 'program_bloc.dart';

class ProgramState extends Equatable {
  final List<dynamic>? program;
  final List<dynamic>? group;

  const ProgramState({
    this.program,
    this.group,
  });

  ProgramState copyWith({
    List<dynamic>? program,
    List<dynamic>? group,
  }) {
    return ProgramState(
      program: program ?? this.program,
      group: group ?? this.group,
    );
  }

  @override
  List<Object?> get props => [program, group];
}
