import 'package:flutter/material.dart';

class NotAvailable extends StatelessWidget {
  const NotAvailable({
    Key? key,
    required this.size,
    required this.text,
  }) : super(key: key);

  final Size size;
  final String text;

  @override
  Widget build(BuildContext context) {
    return body(context);
  }

  Container body(BuildContext context) {
    return Container(
      padding:
          EdgeInsets.fromLTRB(0, size.height * 0.01, 0, size.height * 0.01),
      child: Column(
        children: [
          // Container(
          //   margin: const EdgeInsets.fromLTRB(8, 0, 0, 0),
          //   child: ClipRRect(
          //     borderRadius: BorderRadius.circular(14), // Image border
          //     child: SizedBox.fromSize(
          //       size: const Size.fromRadius(30), // Image radius
          //       child: Icon(Icons.quiz_sharp, size: size.height * 0.040),
          //     ),
          //   ),
          // ),
          SizedBox(
            height: size.height * 0.01,
          ),
          Center(
            child: Text(text, style: Theme.of(context).textTheme.subtitle1),
          ),
          SizedBox(
            height: size.height * 0.01,
          ),
        ],
      ),
    );
  }
}
