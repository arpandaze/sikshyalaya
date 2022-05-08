import 'package:flutter/material.dart';

class CustomNumberField extends StatelessWidget {
  final EdgeInsets margin;
  final String placeHolder;
  final double height;
  final ValueChanged? onChanged;
  final double? width;
  final TextEditingController? titleController;

  const CustomNumberField({
    Key? key,
    this.placeHolder = "",
    this.width,
    this.height = 20,
    this.margin = const EdgeInsets.all(0),
    this.onChanged,
    this.titleController,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      width: width,
      margin: margin,
      child: TextField(
        controller: titleController,
        keyboardType: TextInputType.number,
        onChanged: onChanged,
        decoration: InputDecoration(
          contentPadding: EdgeInsets.all(21),
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12.0)),
          hintText: placeHolder,
        ),
      ),
    );
  }
}
