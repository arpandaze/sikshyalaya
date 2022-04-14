import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/2fa/components/CustomOutlinedButton.dart';

class CustomOutlinedButton extends StatelessWidget {
  final Icon icon;
  final Widget page;
  final String label;
  const CustomOutlinedButton({
    Key? key,
    required this.page,
    required this.icon,
    this.label = "",
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return OutlinedButton.icon(
        onPressed: () => Navigator.of(context).push(
              PageRouteBuilder(
                pageBuilder: (context, animation1, animation2) => page,
                transitionDuration: Duration.zero,
                reverseTransitionDuration: Duration.zero,
              ),
            ),
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
