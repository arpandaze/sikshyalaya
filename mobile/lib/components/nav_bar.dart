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
      height: size.height * 0.08,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Container(
            width: size.width * 0.2,
            height: size.width * 0.06,
            child: SvgPicture.asset(
              "assets/images/home.svg",
            ),
          ),
          Container(
            width: size.width * 0.2,
            height: size.width * 0.06,
            child: SvgPicture.asset(
              "assets/images/quiz.svg",
            ),
          ),
          Container(
            width: size.width * 0.2,
            height: size.width * 0.06,
            child: SvgPicture.asset(
              "assets/images/assignment.svg",
            ),
          ),
          Container(
            width: size.width * 0.2,
            height: size.width * 0.06,
            child: SvgPicture.asset(
              "assets/images/note.svg",
            ),
          ),
          Container(
            width: size.width * 0.2,
            height: size.width * 0.06,
            child: SvgPicture.asset(
              "assets/images/message.svg",
            ),
          ),
        ],
      ),
    );
  }
}
