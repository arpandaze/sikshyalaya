import 'package:flutter/material.dart';

class CustomOutlinedButton extends StatelessWidget {
  final Icon icon;
  final String label;
  final Widget press;
  const CustomOutlinedButton({
    Key? key,
    required this.icon,
    required this.press,
    this.label = "",
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return OutlinedButton.icon(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => press),
          );
        },
        icon: icon,
        label: const Text(''),
        style: OutlinedButton.styleFrom(
          shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(5))),
          side: BorderSide(
              color: Theme.of(context).colorScheme.primary, width: 1),
        ));
  }
}
