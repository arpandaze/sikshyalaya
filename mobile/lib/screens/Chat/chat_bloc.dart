import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/screens/Dashboard/student_dashboard.dart';
import 'package:sikshyalaya/screens/Login/login_screen.dart';
import 'package:sikshyalaya/screens/Welcome/welcome_screen.dart';
import 'package:sikshyalaya/screens/Signup/signup_screen.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:http/http.dart' as http;
import 'package:sikshyalaya/constants.dart';

part 'chat_state.dart';
part 'chat_event.dart';

class ChatMessage {
  String messageContent;
  bool isMe;
  String senderName;
  String time;
  String? senderImage;
  ChatMessage({
    required this.messageContent,
    required this.isMe,
    required this.senderName,
    required this.time,
    this.senderImage,
  });
}

class Students {
  int id;
  String fullName;
  String? profileImage;

  Students({
    required this.id,
    required this.fullName,
    this.profileImage,
  });
}

class ChatBloc extends Bloc<ChatEvent, ChatState> {
  StreamSubscription? chatSteamSubscription;
  List<Students>? students;

  AuthState? authState;

  WebSocketChannel? ws;

  ChatBloc({this.authState}) : super(ChatState()) {
    on<RawChatEvent>(_onRawChatEvent);
    on<LoadStudentListEvent>(_onLoadStudentListEvent);
    on<SendMessageEvent>(_onSendMessageEvent);
    on<ConnectWSEvent>(_onConnectWSEvent);

    add(ConnectWSEvent());
  }

  void _onConnectWSEvent(
    ConnectWSEvent event,
    Emitter<ChatState> emit,
  ) async {
    final currentClass = await getCurrentClassDetails();

    if (currentClass == null) {
      return;
    }

    students = await getParticipants(currentClass["id"]);

    if (students == null) {
      return;
    }

    ws = WebSocketChannel.connect(
      Uri.parse('$wsBase/${currentClass["id"]}/?token=${authState!.token!}'),
    );

    chatSteamSubscription = ws?.stream.listen(
      (event) {
        add(RawChatEvent(event: event));
      },
    );

    emit(state.copyWith(
        course: currentClass["course"]["course_code"], isReady: true));

    ws?.sink.add(jsonEncode({"msg_type": 1}));
  }

  Future<Map<String, dynamic>?> getCurrentClassDetails() async {
    if (authState != null) {
      final headers = {"Cookie": "session=${authState?.token}"};
      final httpclient = http.Client();
      final response = await httpclient.get(
        Uri.parse('$backendBase/class_session/active'),
        headers: headers,
      );

      if (response.statusCode != 200) {
        throw Exception('Class session retrieve failed!');
      }

      List<dynamic> classSessions = jsonDecode(response.body);

      if (classSessions.isNotEmpty) {
        return classSessions[0];
      }
    } else {
      throw Exception("Not logged in!");
    }
    return null;
  }

  Future<List<Students>?> getParticipants(id) async {
    if (authState != null) {
      final headers = {"Cookie": "session=${authState?.token}"};
      final httpclient = http.Client();

      final resp = await httpclient.get(
        Uri.parse('$backendBase/class_session/$id/participants'),
        headers: {
          "Cookie": 'session=${authState!.token!}',
        },
      );

      if (resp.statusCode == 200) {
        List<dynamic> studentsDyn = jsonDecode(resp.body);
        return studentsDyn
            .map(
              (item) => Students(
                  id: item["id"],
                  fullName: item["full_name"],
                  profileImage: item?["profile_image"]),
            )
            .toList();
      }
    }
    return null;
  }

  void _onSendMessageEvent(
    SendMessageEvent event,
    Emitter<ChatState> emit,
  ) async {
    ws?.sink.add(jsonEncode({"message": event.message, "anon": event.isAnon}));
  }

  void _onLoadStudentListEvent(
    LoadStudentListEvent event,
    Emitter<ChatState> emit,
  ) async {}

  void _onRawChatEvent(RawChatEvent event, Emitter<ChatState> emit) {
    final message = jsonDecode(event.event.toString());
    Map<dynamic, dynamic>? user = authState?.user;

    print("Got event type: ${message['msg_type']}");
    print(message == null);
    print(user == null);
    print(students == null);

    if (message == null || user == null || students == null) {
      return;
    }

    print("Got event type: ${message['msg_type']}");

    switch (message["msg_type"]) {
      case 1:
        var history;
        if (message["data"] != null) {
          history = jsonDecode(message["data"]) as List<dynamic>;
        } else {
          history = [];
        }
        List<ChatMessage> messageList = [];

        for (var oneMsg in history) {
          if (oneMsg["msg_type"] != 3) {
            final sender = students!.where((element) {
              return element.id == int.parse(oneMsg["user"]);
            }).toList()[0];

            messageList.add(
              ChatMessage(
                messageContent: oneMsg["data"],
                isMe: user["id"] == sender.id,
                senderName: sender.fullName,
                time: formatTime(oneMsg["time"]),
                senderImage: sender.profileImage,
              ),
            );
          } else {
            messageList.add(
              ChatMessage(
                messageContent: oneMsg["data"],
                isMe: user["id"] == false,
                senderName: "Anon",
                time: formatTime(oneMsg["time"]),
                senderImage: null,
              ),
            );
          }
        }

        print(messageList);
        emit(state.copyWith(messageList: messageList));
        break;

      case 2:
        List<ChatMessage> messageList = [...state.messageList];

        final sender = students!.where((element) {
          return element.id == int.parse(message["user"]);
        }).toList()[0];

        messageList.add(
          ChatMessage(
              messageContent: message["data"],
              isMe: user["id"] == sender.id,
              senderName: sender.fullName,
              time: formatTime(message["time"]),
              senderImage: sender.profileImage),
        );
        print(messageList);
        emit(state.copyWith(messageList: messageList));
        break;

      case 3:
        List<ChatMessage> messageList = [...state.messageList];

        messageList.add(
          ChatMessage(
              messageContent: message["data"],
              isMe: false,
              senderName: "Anon",
              time: formatTime(message["time"]),
              senderImage: null),
        );
        print(messageList);
        emit(state.copyWith(messageList: messageList));
        break;

      case 6:
        emit(state.copyWith(
            onlineCount: jsonDecode(message["data"]).length + 1));
        break;

      case 4:
        emit(state.copyWith(onlineCount: state.onlineCount + 1));
        break;

      case 5:
        emit(state.copyWith(onlineCount: state.onlineCount - 1));
        break;

      default:
        break;
    }
  }

  String formatTime(String time) {
    final timeObj = DateTime.parse(time);
    final DateFormat formatter = DateFormat('jm');
    return formatter.format(timeObj);
  }

  @override
  Future<void> close() {
    chatSteamSubscription?.cancel();
    return super.close();
  }
}
