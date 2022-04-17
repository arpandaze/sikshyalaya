import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/screens/Chat/message.dart';
import 'package:sikshyalaya/components/CustomChatTextField.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';

class ChatMessage {
  String messageContent;
  bool isMe;
  String senderName;
  String time;
  String senderImage;
  ChatMessage({
    required this.messageContent,
    required this.isMe,
    required this.senderName,
    required this.time,
    required this.senderImage,
  });
}

List<ChatMessage> messages = [
  ChatMessage(
      messageContent: "hello sir",
      isMe: true,
      senderName: "Me",
      time: "12:00",
      senderImage: "assets/images/pp.jpg"),
  ChatMessage(
      messageContent: "hi how are you sir",
      isMe: true,
      senderName: "Me",
      time: "12:00",
      senderImage: "assets/images/pp.jpg"),
  ChatMessage(
      messageContent: "I am fine sir ok sdsad dsadasd fine very fine i am ok",
      isMe: false,
      senderName: "Atis",
      time: "12:00",
      senderImage: "assets/images/pp.jpg"),
  ChatMessage(
      messageContent: "whatr u doing sir",
      isMe: false,
      senderName: "Atis",
      time: "12:00",
      senderImage: "assets/images/pp.jpg"),
  ChatMessage(
      messageContent: "nothing much sir",
      isMe: true,
      senderName: "Me",
      time: "12:00",
      senderImage: "assets/images/pp.jpg"),
  ChatMessage(
      messageContent: "ok then sir",
      isMe: false,
      senderName: "Atis",
      time: "12:00",
      senderImage: "assets/images/pp.jpg"),
  ChatMessage(
      messageContent: "thank you sir",
      isMe: true,
      senderName: "Me",
      time: "12:00",
      senderImage: "assets/images/pp.jpg"),
];

class StudentChat extends StatelessWidget {
  const StudentChat({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    TextEditingController messageController = TextEditingController();
    return StudentWrapper(
      pageName: "Chat",
      child: ListView(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Container(
                  margin: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                  width: size.width * 0.45,
                  height: 30,
                  child: Text(
                    "COMP 204",
                    style: Theme.of(context).textTheme.headline6,
                  )),
              Container(
                  height: 30,
                  alignment: Alignment.topRight,
                  width: size.width * 0.45,
                  margin: const EdgeInsets.fromLTRB(0, 10, 0, 0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Text(
                        "58",
                        style: Theme.of(context).textTheme.headline6,
                      ),
                      Container(
                        margin: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                        child: SvgPicture.asset(
                          "assets/images/people.svg",
                          height: 20,
                          width: 20,
                        ),
                      ),
                    ],
                  )),
            ],
          ),
          Column(
            children: [
              Container(
                  width: size.width * 0.92,
                  height: size.height * 0.58,
                  margin: const EdgeInsets.fromLTRB(0, 20, 0, 20),
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(25),
                      color: Theme.of(context).colorScheme.surface),
                  child: ListView.builder(
                    itemCount: messages.length,
                    shrinkWrap: true,
                    itemBuilder: (context, index) {
                      return Container(
                        padding: const EdgeInsets.only(left: 16, right: 16),
                        child: Message(
                            message: messages[index].messageContent,
                          isMe: messages[index].isMe,
                          senderName: messages[index].senderName,
                          time: messages[index].time,
                          senderImage: messages[index].senderImage,
                        ),
                      );
                    },
                  )),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: size.width * 0.92,
                decoration: BoxDecoration(
                    border: Border.all(
                      color: const Color(0xFFB4B4B4),
                    ),
                    borderRadius: BorderRadius.circular(10)),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Container(
                      margin: const EdgeInsets.fromLTRB(20, 0, 0, 0),
                      child: CustomTextField(
                        messageController: messageController,
                        placeHolder: "Type your message here",
                      ),
                    ),
                    GestureDetector(
                      onTap: () => {
                        if (messageController.text.isNotEmpty)
                          {
                            messages.add(
                              ChatMessage(
                                  messageContent: messageController.text,
                                  isMe: true,
                                  senderImage: "assets/images/pp.jpg",
                                  senderName: "Me",
                                  time: "12:00"),
                            )
                          }
                      },
                      child: Container(
                        margin: const EdgeInsets.fromLTRB(0, 0, 10, 0),
                        child: Icon(
                          Icons.send,
                          color: Theme.of(context).colorScheme.primary,
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
