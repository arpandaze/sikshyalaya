import 'package:flutter/material.dart';

class CustomFilledButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;

  const CustomFilledButton({
    Key? key,
    this.onPressed,
    required this.text,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return MaterialButton(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      minWidth: size.width * 0.8,
      padding: const EdgeInsets.fromLTRB(0, 20, 0, 20),
      color: Theme.of(context).colorScheme.onSurface,
      child: Text(
        text,
        style: TextStyle(color: Theme.of(context).colorScheme.onPrimary),
      ),
      onPressed: () {
        onPressed?.call();
      },
    );
  }
}
