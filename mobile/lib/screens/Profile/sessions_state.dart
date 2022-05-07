part of 'sessions_bloc.dart';

class SessionsState extends Equatable {
  final List<Map?> sessionList;

  const SessionsState({
    this.sessionList = const [],
  });

  SessionsState copyWith({
    List<Map?> sessionList = const [],
  }) {
    return SessionsState(
      sessionList: sessionList,
    );
  }

  @override
  List<Object?> get props => [sessionList];
}
