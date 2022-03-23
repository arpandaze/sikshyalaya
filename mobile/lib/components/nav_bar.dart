import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class NavBar extends StatelessWidget {
  const NavBar({
    Key? key,
    required this.size,
  }) : super(key: key);

  final Size size;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size.width,
      height: size.height * 0.10,
      decoration:
          BoxDecoration(color: Theme.of(context).colorScheme.background),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Container(
            margin: EdgeInsets.fromLTRB(0, 0, 0, size.height * 0.02),
            height: size.width * 0.06,
            child: Image.asset('assets/images/home.png', fit: BoxFit.cover),
          ),
          Container(
            margin: EdgeInsets.fromLTRB(0, 0, 0, size.height * 0.02),
            height: size.width * 0.06,
            child: Image.asset('assets/images/quiz.png', fit: BoxFit.cover),
          ),
          Container(
            margin: EdgeInsets.fromLTRB(0, 0, 0, size.height * 0.02),
            height: size.width * 0.06,
            child:
                Image.asset('assets/images/assignment.png', fit: BoxFit.cover),
          ),
          Container(
            margin: EdgeInsets.fromLTRB(0, 0, 0, size.height * 0.02),
            height: size.width * 0.06,
            child: Image.asset('assets/images/note.png', fit: BoxFit.cover),
          ),
          Container(
            margin: EdgeInsets.fromLTRB(0, 0, 0, size.height * 0.02),
            height: size.width * 0.06,
            child: Image.asset('assets/images/message.png', fit: BoxFit.cover),
          ),
        ],
      ),
    );
  }
}
