import 'dart:ffi';

import 'package:flutter/material.dart';

class CustomFilledButton extends StatelessWidget {
  final String buttonText;
  final Color colorType;
  final Color textColor;
  final double height;
  final String? onPressed;
  const CustomFilledButton({
    Key? key,
    required this.buttonText,
    required this.colorType,
    this.textColor = Colors.black,
    this.height = 20,
    this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return MaterialButton(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(height * 0.75),
      ),
      padding: EdgeInsets.fromLTRB(0, height, 0, height),
      color: colorType,
      child: Text(buttonText, style: TextStyle(color: textColor)),
      onPressed: () {
        if (onPressed != null) {
          Navigator.pushNamed(
            context,
            onPressed!,
          );
        }
      },
    );
  }
}
