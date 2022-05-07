part of 'chat_bloc.dart';

class ChatState extends Equatable {
  final int onlineCount;
  final List<ChatMessage> messageList;
  final String course;
  final bool isReady;

  const ChatState({this.onlineCount = 1, this.messageList = const [], this.course = "Class", this.isReady = false});

  ChatState copyWith({
    int? onlineCount,
    List<ChatMessage>? messageList,
    String? course,
    bool? isReady,
  }) {
    return ChatState(
      onlineCount: onlineCount ?? this.onlineCount,
      messageList: messageList ?? this.messageList,
      course: course ?? this.course,
      isReady: isReady ?? this.isReady,
    );
  }

  @override
  List<Object?> get props => [onlineCount, messageList];
}
