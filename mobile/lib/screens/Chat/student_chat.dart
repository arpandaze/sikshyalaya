import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/screens/Chat/chat_bloc.dart';
import 'package:sikshyalaya/screens/Chat/message.dart';
import 'package:sikshyalaya/components/CustomChatTextField.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class StudentChat extends StatelessWidget {
  StudentChat({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AuthBloc, AuthState>(
        buildWhen: (prev, next) => prev != next,
        builder: (context, state) {
          return BlocProvider<ChatBloc>(
            create: (context) {
              return ChatBloc(authState: state);
            },
            child: content(context),
          );
        });
  }

  Widget content(context) {
    Size size = MediaQuery.of(context).size;
    TextEditingController messageController = TextEditingController();
    ScrollController scrollController = ScrollController();
    return BlocBuilder<ChatBloc, ChatState>(
      buildWhen: (prev, next) => prev != next,
      builder: (context, state) {
        if (state.isReady == false) {
          return StudentWrapper(
            pageName: "Chat",
            child: Container(
              alignment: Alignment.center,
              child: const CircularProgressIndicator(),
            ),
          );
        }
        WidgetsBinding.instance?.addPostFrameCallback(
          (_) {
            scrollController
                .animateTo(
              scrollController.position.maxScrollExtent,
              duration: const Duration(milliseconds: 100),
              curve: Curves.linear,
            )
                .then(
              (value) {
                scrollController.animateTo(
                  scrollController.position.maxScrollExtent,
                  duration: const Duration(milliseconds: 200),
                  curve: Curves.easeOut,
                );
              },
            ).onError((error, stackTrace) => null);
          },
        );

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
                        state.course,
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
                            state.onlineCount.toString(),
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
                      controller: scrollController,
                      itemCount: state.messageList.length,
                      shrinkWrap: true,
                      itemBuilder: (context, index) {
                        return Container(
                          padding: const EdgeInsets.only(left: 16, right: 16),
                          child: Message(
                            message: state.messageList[index].messageContent,
                            isMe: state.messageList[index].isMe,
                            senderName: state.messageList[index].senderName,
                            time: state.messageList[index].time,
                            senderImage: state.messageList[index].senderImage,
                          ),
                        );
                      },
                    ),
                  ),
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
                          child: CustomChatTextField(
                            messageController: messageController,
                            placeHolder: "Type your message here",
                          ),
                        ),
                        GestureDetector(
                          onTap: () {
                            if (messageController.text.isNotEmpty) {
                              FocusScope.of(context).unfocus();
                              context.read<ChatBloc>().add(SendMessageEvent(
                                  message: messageController.text));
                              messageController.clear();
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
      },
    );
  }
}
