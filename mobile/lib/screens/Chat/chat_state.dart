part of 'chat_bloc.dart';

class ChatState extends Equatable {
  final int onlineCount;
  final List<ChatMessage> messageList;
  final String course;

  const ChatState({this.onlineCount = 1, this.messageList = const [], this.course = "Class"});

  ChatState copyWith({
    int? onlineCount,
    List<ChatMessage>? messageList,
    String? course,
  }) {
    return ChatState(
      onlineCount: onlineCount ?? this.onlineCount,
      messageList: messageList ?? this.messageList,
      course: course ?? this.course,
    );
  }

  @override
  List<Object?> get props => [onlineCount, messageList];
}
