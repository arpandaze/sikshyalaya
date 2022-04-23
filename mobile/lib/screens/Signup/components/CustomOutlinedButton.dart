import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sikshyalaya/screens/Signup/signup_bloc.dart';

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
          context.read<SignupBloc>().add(NextPage());
          /* Navigator.push( */
          /*   context, */
          /*   SlideLeftRoute(widget: press), */
          /* ); */
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

class SlideLeftRoute extends PageRouteBuilder {
  final Widget widget;
  SlideLeftRoute({required this.widget})
      : super(pageBuilder: (BuildContext context, Animation<double> animation,
            Animation<double> secondaryAnimation) {
          return widget;
        }, transitionsBuilder: (BuildContext context,
            Animation<double> animation,
            Animation<double> secondaryAnimation,
            Widget child) {
          return SlideTransition(
            position: Tween<Offset>(
              begin: const Offset(1.0, 0.0),
              end: Offset.zero,
            ).animate(animation),
            child: child,
          );
        });
}
