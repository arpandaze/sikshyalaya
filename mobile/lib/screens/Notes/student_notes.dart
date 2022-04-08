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
      create: (context) => StudentNoteRepository(),
      child: BlocProvider(
        create: (context) => StudentNoteBloc(
            studentNoteRepository: context.read<StudentNoteRepository>())
          ..add(
            GetStudentNote(url: 'personal_note'),
          ),
        child: body(context),
      ),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocBuilder<StudentNoteBloc, StudentNoteState>(
        buildWhen: (((previous, current) => (previous != current))),
        builder: (context, state) {
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
                  NotePreview(
                    title: "no",
                    content: "yes",
                  ),
                  NotePreview(
                    title: "no",
                    content: "yes",
                  ),
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
              GridView.builder(
                physics: NeverScrollableScrollPhysics(),
                padding: const EdgeInsets.fromLTRB(20, 0, 20, 30),
                shrinkWrap: true,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 20,
                  mainAxisSpacing: 20,
                ),
                itemCount: state.noteList.length,
                itemBuilder: (context, int i) {
                  return NotePreview(
                    title: state.noteList[i].title,
                    content: state.noteList[i].title,
                  );
                },
              ),
            ],
          );
        });
  }
}
