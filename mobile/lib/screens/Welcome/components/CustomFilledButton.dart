import 'package:flutter/material.dart';

class CustomFilledButton extends StatelessWidget {
  final String buttonText;
  final Color colorType;
  final Color textColor;
  final Widget onPressed;
  const CustomFilledButton({
    Key? key,
    required this.buttonText,
    required this.colorType,
    required this.textColor,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return MaterialButton(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      padding: const EdgeInsets.fromLTRB(0, 20, 0, 20),
      color: colorType,
      child: Text(buttonText, style: TextStyle(color: textColor)),
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => onPressed),
        );
      },
    );
  }
}
