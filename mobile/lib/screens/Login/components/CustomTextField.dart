import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final EdgeInsets margin;
  final String placeHolder;
  final bool isPassword;
  const CustomTextField({
    Key? key,
    required this.placeHolder,
    this.isPassword = false,
    this.margin = const EdgeInsets.all(0),
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      width: size.width * 0.8,
      margin: margin,
      child: TextField(
        obscureText: isPassword,
        decoration: InputDecoration(
            contentPadding:
                const EdgeInsets.symmetric(vertical: 25, horizontal: 20),
            border:
                OutlineInputBorder(borderRadius: BorderRadius.circular(12.0)),
            hintText: placeHolder),
      ),
    );
  }
}
