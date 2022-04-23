import 'dart:ffi';

import 'package:flutter/material.dart';

class CustomFilledButtonSecond extends StatelessWidget {
  final String buttonText;
  Color colorType;
  Color textColor;
  final VoidCallback? onPressed;
  CustomFilledButtonSecond({
    Key? key,
    required this.buttonText,
    this.colorType = const Color(0xFFF14B4B),
    this.textColor = const Color(0xFFF14B4B),
    this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        padding: EdgeInsets.symmetric(
          vertical: 10,
          horizontal: 10,
        ),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: colorType,
          ),
        ),
        child: Center(
          child: Text(
            buttonText,
            style: TextStyle(
              color: textColor,
              fontSize: 15,
            ),
          ),
        ),
      ),
    );
  }
}
