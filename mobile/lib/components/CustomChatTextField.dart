import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Chat/student_chat.dart';

class CustomTextField extends StatelessWidget {
  final EdgeInsets margin;
  final String placeHolder;
  final bool isPassword;
  final double height;
  final ValueChanged? onSend;
  final ValueChanged? onChanged;
  final TextEditingController? messageController;

  const CustomTextField({
    Key? key,
    this.placeHolder = "",
    this.height = 20,
    this.isPassword = false,
    this.margin = const EdgeInsets.all(0),
    this.onChanged,
    this.onSend,
    this.messageController,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      width: size.width * 0.75,
      margin: margin,
      child: TextField(
        controller: messageController,
        obscureText: isPassword,
        onChanged: onChanged,
        decoration: InputDecoration(
          border: InputBorder.none,
          contentPadding:
              EdgeInsets.symmetric(vertical: height, horizontal: height - 10),
          hintText: placeHolder,
        ),
      ),
    );
  }
}
