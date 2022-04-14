import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';

class Message extends StatelessWidget {
  final String message;
  final bool isMe;
  const Message({
    Key? key,
    required this.message,
    required this.isMe,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      margin: !isMe
          ? const EdgeInsets.fromLTRB(00, 15, 0, 5)
          : const EdgeInsets.fromLTRB(100, 15, 0, 5),
      padding: const EdgeInsets.fromLTRB(15, 15, 10, 10),
      alignment: !isMe ? Alignment.centerLeft : Alignment.centerRight,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(15),
          color: isMe
              ? Theme.of(context).colorScheme.primary
              : const Color.fromARGB(195, 49, 49, 49)),
      child: Text(
        message,
        style: Theme.of(context).textTheme.button,
      ),
    );
  }
}
