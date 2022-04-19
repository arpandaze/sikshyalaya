import 'package:flutter/material.dart';

class CustomDateButton extends StatefulWidget {
  final EdgeInsets margin;
  final String placeHolder;
  final bool isPassword;
  final double? width;
  final double height;
  final ValueChanged? onSend;
  final ValueChanged? onChanged;
  const CustomDateButton({
    Key? key,
    this.placeHolder = "",
    this.width,
    this.height = 55,
    this.isPassword = false,
    this.margin = const EdgeInsets.all(0),
    this.onChanged,
    this.onSend,
  }) : super(key: key);

  @override
  _CustomDateButtonState createState() => _CustomDateButtonState();
}

class _CustomDateButtonState extends State<CustomDateButton> {
  DateTime selectedDate = DateTime(2004, 8);

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime(1900, 8),
      lastDate: DateTime(2004, 8),
      initialEntryMode: DatePickerEntryMode.input,
    );
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked.toLocal();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(15),
          border: Border.all(
            color: const Color(0xFF939393),
          )),
      child: Row(
        children: [
          Container(
            width: widget.width,
            height: widget.height,
            margin: widget.margin,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: EdgeInsets.fromLTRB(20, 0, 0, 0),
                  child: Text(
                    '$selectedDate'.split(' ')[0],
                    style: Theme.of(context).textTheme.bodyText1,
                  ),
                ),
              ],
            ),
          ),
          GestureDetector(
            onTap: () => _selectDate(context),
            child: Container(
              margin: const EdgeInsets.fromLTRB(0, 0, 15, 0),
              child: Icon(
                Icons.date_range,
                color: Theme.of(context).colorScheme.primary,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
