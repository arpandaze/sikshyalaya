import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';

QuillController _controller = QuillController.basic();

class NoteView extends StatelessWidget {
  const NoteView({
    Key? key,
    required this.size,
  }) : super(key: key);

  final Size size;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: Column(
        children: [
          QuillToolbar.basic(controller: _controller),
          Expanded(
            child: Container(
              child: QuillEditor.basic(
                controller: _controller,
                readOnly: false, // true for view only mode
              ),
            ),
          )
        ],
      ),
    );
  }
}
