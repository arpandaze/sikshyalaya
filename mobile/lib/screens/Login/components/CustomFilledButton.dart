import 'package:flutter/material.dart';

class CustomFilledButton extends StatelessWidget {
  const CustomFilledButton({
    Key? key,
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
      color: Theme.of(context).colorScheme.primary,
      child: Text("Login",
          style: TextStyle(color: Theme.of(context).colorScheme.onPrimary)),
      onPressed: () {},
    );
  }
}
