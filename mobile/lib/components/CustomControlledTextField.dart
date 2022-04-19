import 'package:flutter/material.dart';

class CustomControlledTextField extends StatelessWidget {
  final EdgeInsets margin;
  final String placeHolder;
  final bool isPassword;
  final double height;
  final ValueChanged? onChanged;
  final double? width;
  final TextEditingController? messageController;

  const CustomControlledTextField({
    Key? key,
    this.placeHolder = "",
    this.width,
    this.height = 20,
    this.isPassword = false,
    this.margin = const EdgeInsets.all(0),
    this.onChanged,
    this.messageController,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      width: width,
      margin: margin,
      child: TextField(
        controller: messageController,
        obscureText: isPassword,
        onChanged: onChanged,
        decoration: InputDecoration(
          contentPadding:
              EdgeInsets.symmetric(vertical: height, horizontal: height),
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12.0)),
          hintText: placeHolder,
        ),
      ),
    );
  }
}
