import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/screens/Chat/message.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';

class ChatMessage {
  String messageContent;
  bool isMe;
  ChatMessage({required this.messageContent, required this.isMe});
}

List<ChatMessage> messages = [
  ChatMessage(messageContent: "Hello, Atis", isMe: true),
  ChatMessage(messageContent: "How have you been?", isMe: true),
  ChatMessage(
      messageContent:
          "Hey NIglet, I am d dude.wegqjwehgqjhegqjhgejqhgejqS wbu?",
      isMe: false),
  ChatMessage(messageContent: "ehhhh, doing OK.", isMe: true),
  ChatMessage(messageContent: "ok lol?", isMe: true),
];

class StudentChat extends StatelessWidget {
  const StudentChat({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return StudentWrapper(
    pageName: "Chat",
      child: ListView(
        children: [
          Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Container(
                    margin: const EdgeInsets.fromLTRB(20, 10, 0, 0),
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
                    margin: const EdgeInsets.fromLTRB(0, 10, 20, 0),
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
              ]),
          Row(
            children: [
              Container(
                  width: size.width * 0.9,
                  height: size.height * 0.6,
                  margin: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(25),
                      color: Theme.of(context).colorScheme.surface),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ListView.builder(
                        itemCount: messages.length,
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          return Container(
                            padding: const EdgeInsets.only(left: 16, right: 16),
                            child: Message(
                                message: messages[index].messageContent,
                                isMe: messages[index].isMe),
                          );
                        },
                      ),
                    ],
                  ))
            ],
          ),
          Row(
            children: [
              Container(
                margin: const EdgeInsets.fromLTRB(20, 0, 0, 0),
                width: size.width * 0.9,
                child: const CustomTextField(
                  placeHolder: "Type your message here",
                ),
              )
            ],
          )
        ],
      ),
    );
  }
}
