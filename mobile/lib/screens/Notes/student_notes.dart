import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/repository/student_note.dart';
import 'package:sikshyalaya/screens/Notes/components/NotePreview.dart';
import 'package:sikshyalaya/screens/Notes/components/CustomTextField.dart';
import 'package:sikshyalaya/screens/Notes/student_notes_bloc.dart';

class StudentNotes extends StatelessWidget {
  const StudentNotes({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return RepositoryProvider(
      create: (context) => StudentNoteRepository.loadWithToken(),
      child: BlocProvider<StudentNoteBloc>(
        create: (context) =>
            StudentNoteBloc(sNRepo: context.read<StudentNoteRepository>())
              ..add(
                GetStudentNote(url: 'personal_note'),
              ),
        child: body(context),
      ),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return ListView(
      children: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            CustomTextField(
              placeHolder: "Search Notes",
              margin: EdgeInsets.fromLTRB(0, 0, 0, 0),
            ),
          ],
        ),
        Row(
          children: <Widget>[
            Container(
              margin: const EdgeInsets.fromLTRB(20, 30, 0, 30),
              child: Text(
                'Recent Notes',
                style: Theme.of(context).textTheme.headline5,
              ),
            )
          ],
        ),
        GridView.count(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
          primary: false,
          crossAxisCount: 2,
          crossAxisSpacing: 20,
          shrinkWrap: true,
          children: <Widget>[
            NotePreview(size: size),
            NotePreview(size: size),
          ],
        ),
        Row(
          children: <Widget>[
            Container(
              margin: const EdgeInsets.fromLTRB(20, 30, 0, 30),
              child: Text(
                'Others',
                style: Theme.of(context).textTheme.headline5,
              ),
            )
          ],
        ),
        GridView.count(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
          primary: false,
          crossAxisCount: 2,
          crossAxisSpacing: 20,
          shrinkWrap: true,
          children: <Widget>[
            NotePreview(size: size),
            NotePreview(size: size),
          ],
        ),
      ],
    );
  }
}
