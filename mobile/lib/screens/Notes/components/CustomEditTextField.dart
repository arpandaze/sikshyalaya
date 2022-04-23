import 'package:flutter/material.dart';

class CustomEditTextField extends StatelessWidget {
  final EdgeInsets margin;
  final String placeHolder;
  final String title;
  final bool isPassword;
  final ValueChanged? onChanged;
  final TextInputType? keyboardType;
  final TextEditingController? titleController;

  const CustomEditTextField({
    Key? key,
    this.placeHolder = "",
    this.title = "",
    this.isPassword = false,
    this.margin = const EdgeInsets.all(0),
    this.onChanged,
    this.keyboardType = TextInputType.text,
    this.titleController,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      width: size.width * 0.9,
      margin: margin,
      child: TextField(
        controller: titleController,
        style: Theme.of(context).textTheme.headline5,
        obscureText: isPassword,
        onChanged: onChanged,
        keyboardType: keyboardType,
        decoration: InputDecoration(
          contentPadding:
              const EdgeInsets.symmetric(vertical: 20, horizontal: 5),
          hintText: placeHolder,
        ),
      ),
    );
  }
}
