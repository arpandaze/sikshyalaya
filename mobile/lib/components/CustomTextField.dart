import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final EdgeInsets margin;
  final String placeHolder;
  final bool isPassword;
  final double height;
  final ValueChanged? onChanged;

  const CustomTextField({
    Key? key,
    this.placeHolder = "",
    this.height = 20,
    this.isPassword = false,
    this.margin = const EdgeInsets.all(0),
    this.onChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      width: size.width * 0.9,
      margin: margin,
      child: TextField(
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
