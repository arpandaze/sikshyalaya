import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_quill/flutter_quill.dart' hide Text;
import 'package:google_fonts/google_fonts.dart';
import 'package:sikshyalaya/repository/models/student_note.dart';
import 'package:sikshyalaya/screens/Notes/components/CustomEditTextField.dart';
import 'package:sikshyalaya/screens/Notes/student_notes_bloc.dart';
import 'package:tuple/tuple.dart';

class NoteView extends StatelessWidget {
  final Note noteData;
  const NoteView({
    Key? key,
    this.noteData = Note.empty,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // QuillController _controller = QuillController.basic();
    QuillController _controller = QuillController(
        document: Document.fromJson(jsonDecode(noteData.content!)),
        selection: const TextSelection.collapsed(offset: 0));

    //   // final String title = noteData.title != null ? noteData.title! : "";
    TextEditingController title = TextEditingController()..text = "";
    Size size = MediaQuery.of(context).size;
    final FocusNode _focusNode = FocusNode();
    var quillEditor = QuillEditor(
      controller: _controller,
      scrollController: ScrollController(),
      scrollable: true,
      focusNode: _focusNode,
      autoFocus: false,
      readOnly: false,
      placeholder: 'Type Something...',
      expands: false,
      padding: EdgeInsets.zero,
      customStyles: DefaultStyles(
        h1: DefaultTextBlockStyle(Theme.of(context).textTheme.headline2!,
            const Tuple2(16, 0), const Tuple2(0, 0), null),
        h2: DefaultTextBlockStyle(Theme.of(context).textTheme.headline3!,
            const Tuple2(16, 0), const Tuple2(0, 0), null),
        h3: DefaultTextBlockStyle(Theme.of(context).textTheme.headline4!,
            const Tuple2(16, 0), const Tuple2(0, 0), null),
        paragraph: DefaultTextBlockStyle(Theme.of(context).textTheme.bodyText1!,
            const Tuple2(16, 0), const Tuple2(0, 0), null),
      ),
    );

    return BlocBuilder<StudentNoteBloc, StudentNoteState>(
        builder: (context, state) {
      print(state.currentNote.id);
      void _noteSave(int mode) {
        if (mode == 1) {
          context.read<StudentNoteBloc>().add(
                PostStudentNote(
                  postUrl: "personal_note/",
                  ctitle: title.text,
                  cContent: jsonEncode(
                    _controller.document.toDelta().toJson(),
                  ),
                ),
              );
        } else if (mode == 2) {
          context.read<StudentNoteBloc>().add(
                EditStudentNote(
                  postUrl: "personal_note/${state.currentNote.id}/",
                  ctitle: title.text,
                  cContent: jsonEncode(
                    _controller.document.toDelta().toJson(),
                  ),
                ),
              );
        }
      }

      return SafeArea(
        child: Scaffold(
          floatingActionButton: Container(
            width: 120,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Visibility(
                  visible: state.eMode == 2,
                  child: FloatingActionButton(
                    onPressed: () => {
                      context.read<StudentNoteBloc>().add(
                            DeleteStudentNote(
                              postUrl: "personal_note/${state.currentNote.id}/",
                              ctitle: title.text,
                              cContent: jsonEncode(
                                _controller.document.toDelta().toJson(),
                              ),
                            ),
                          )
                    },
                    backgroundColor: Theme.of(context).colorScheme.primary,
                    child: const Icon(
                      Icons.delete,
                      size: 30,
                    ),
                  ),
                ),
                FloatingActionButton(
                  onPressed: () => {_noteSave(state.eMode!)},
                  backgroundColor: Theme.of(context).colorScheme.tertiary,
                  child: const Icon(
                    Icons.save,
                    size: 30,
                  ),
                ),
              ],
            ),
          ),
          body: SizedBox(
            width: double.infinity,
            height: size.height,
            child: Stack(
              alignment: Alignment.center,
              children: <Widget>[
                Container(
                  width: size.width * 0.904,
                  margin: EdgeInsets.fromLTRB(0, size.height * 0.16, 0, 0),
                  decoration:
                      BoxDecoration(borderRadius: BorderRadius.circular(20)),
                  child: Column(
                    children: [
                      QuillToolbar.basic(controller: _controller),
                      Expanded(
                        child: Container(
                          child: quillEditor,
                        ),
                      )
                    ],
                  ),
                ),
                Positioned(
                  top: size.height * 0.04,
                  left: 0,
                  child: SizedBox(
                    width: size.width,
                    height: size.height * 0.10,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Container(
                          margin: EdgeInsets.fromLTRB(
                              20, size.height * 0.025, 0, 0),
                          child: CustomEditTextField(
                            titleController: title
                              ..text = state.currentNote.title!,
                            placeHolder: "Enter Text Here",
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Positioned(
                  top: size.height * 0.02,
                  left: size.width * 0.90,
                  child: SizedBox(
                    width: size.width,
                    height: size.height * 0.10,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Container(
                          child: GestureDetector(
                            onTap: () => {
                              context.read<StudentNoteBloc>().add(
                                    ToggleEditor(),
                                  ),
                            },
                            child: Icon(
                              Icons.close,
                              size: 30,
                              color: Theme.of(context).colorScheme.primary,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    });
  }
}
