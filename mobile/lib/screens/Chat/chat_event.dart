part of 'chat_bloc.dart';

abstract class ChatEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class RawChatEvent extends ChatEvent {
  final dynamic event;

  RawChatEvent({this.event});

  @override
  List<Object?> get props => [event];
}

class LoadStudentListEvent extends ChatEvent {}

class ConnectWSEvent extends ChatEvent {}

class SendMessageEvent extends ChatEvent {
  final bool isAnon;
  final String message;

  SendMessageEvent({required this.message, required this.isAnon});

  @override
  List<Object?> get props => [isAnon];
}
