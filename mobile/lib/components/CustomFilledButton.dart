import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/global/route/route_bloc.dart';

class CustomFilledButton extends StatelessWidget {
  final String buttonText;
  final Color colorType;
  final Color textColor;
  final Widget? onPressed;
  final double height;
  const CustomFilledButton({
    Key? key,
    required this.buttonText,
    required this.colorType,
    required this.textColor,
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
          context.read<RouteBloc>().add(RouteChangeEvent(page: onPressed!));
        }
      },
    );
  }
}
