import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final EdgeInsets margin;
  final String placeHolder;
  final bool isPassword;
  final ValueChanged? onChanged;
  final TextInputType? keyboardType;

  final TextEditingController? controller;

  const CustomTextField({
    Key? key,
    required this.placeHolder,
    this.isPassword = false,
    this.margin = const EdgeInsets.all(0),
    this.onChanged,
    this.keyboardType = TextInputType.text,
    this.controller,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      width: size.width * 0.8,
      margin: margin,
      child: TextField(
        obscureText: isPassword,
        controller: controller,
        onChanged: onChanged,
        keyboardType: keyboardType,
        decoration: InputDecoration(
          contentPadding:
              const EdgeInsets.symmetric(vertical: 25, horizontal: 20),
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12.0)),
          hintText: placeHolder,
        ),
      ),
    );
  }
}
