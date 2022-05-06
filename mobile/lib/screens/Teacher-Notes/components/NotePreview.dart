import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:sikshyalaya/repository/models/teacher_note.dart';
import 'package:sikshyalaya/screens/Notes/note_view.dart';

class NotePreview extends StatelessWidget {
  final Note? noteData;
  const NotePreview({
    Key? key,
    this.noteData,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final Note? noteDefault = noteData;
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(25),
        color: Theme.of(context).colorScheme.surface,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Flexible(
            child: Container(
              padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
              child: Text(
                noteData!.title!,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.bodyText1,
              ),
            ),
          ),
          Flexible(
            child: Container(
              padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
              child: Text(
                jsonDecode(noteData!.content!)[0]["insert"],
                maxLines: 4,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.bodyText2,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
