import 'package:flutter/material.dart';

class CustomFilledButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final double? height;

  const CustomFilledButton({
    Key? key,
    this.onPressed,
    this.text = "Login",
    this.height = 60,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return MaterialButton(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      minWidth: size.width * 0.8,
      height: height!,
      padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
      color: Theme.of(context).colorScheme.primary,
      child: Text(
        text,
        style: (Theme.of(context).textTheme.subtitle1)!
            .merge(TextStyle(color: Theme.of(context).colorScheme.onPrimary)),
      ),
      onPressed: () {
        onPressed?.call();
      },
    );
  }
}
