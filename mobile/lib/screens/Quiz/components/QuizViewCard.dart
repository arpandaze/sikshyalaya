import 'package:flutter/material.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/instructor.dart';
import 'package:sikshyalaya/repository/models/quiz_view.dart';
import 'package:sikshyalaya/screens/Quiz/components/ImageViewer.dart';

class QuizViewCard extends StatelessWidget {
  QuizViewCard({
    Key? key,
    required this.quizView,
    required this.size,
    required this.index,
    required this.selectedAnswer,
    required this.toShow,
  }) : super(key: key);
  final QuizView quizView;
  final Size size;
  final int index;
  final selectedAnswer;
  final bool toShow;

  @override
  Widget build(BuildContext context) {
    return body(context);
  }

  Widget body(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(top: 10),
      child: Container(
        width: size.width * 0.800,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: const Color(0xFFB4B4B4)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.max,
          children: [
            Row(
              mainAxisSize: MainAxisSize.max,
              children: <Widget>[
                Container(
                  width: size.width * 0.95,
                  padding: const EdgeInsets.fromLTRB(
                    10,
                    10,
                    10,
                    10,
                  ),
                  child: Text(
                    "${index}. ${quizView.question_text}",
                    textAlign: TextAlign.left,
                    style: Theme.of(context).textTheme.headline4,
                  ),
                ),
              ],
            ),
            if (quizView.question_image != null)
              Container(
                padding: EdgeInsets.symmetric(vertical: 20, horizontal: 10),
                child: (GridView.builder(
                  physics: const NeverScrollableScrollPhysics(),
                  padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
                  shrinkWrap: true,
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 5,
                    mainAxisSpacing: 5,
                  ),
                  itemCount: quizView.question_image != null
                      ? quizView.question_image!.length
                      : 0,
                  itemBuilder: (BuildContext context, int index) {
                    return GestureDetector(
                      onTap: () => imageDialog(
                          quizView.question_image![index],
                          '$fileServerBase/${quizView.question_image![index]}',
                          context),
                      child: Image.network(
                          '$fileServerBase/${quizView.question_image![index]}'),
                    );
                  },
                )),
              ),
            Container(
              padding: EdgeInsets.fromLTRB(10, 10, 10, 10),
              child: ListView.builder(
                physics: NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                itemCount:
                    quizView.options != null ? quizView.options!.length : 0,
                itemBuilder: (context, i) {
                  return Column(
                    children: [
                      Container(
                        margin: EdgeInsets.symmetric(vertical: 10),
                        decoration: BoxDecoration(
                          border: Border.all(
                            color: colorPicker(i, context),
                          ),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: ListTile(
                          title: quizView.options![i].text != ""
                              ? Text(
                                  quizView.options![i].text!,
                                  style: Theme.of(context).textTheme.subtitle1,
                                )
                              : quizView.options![i].image != ""
                                  ? GestureDetector(
                                      onTap: () => imageDialog(
                                          quizView.options![i].image,
                                          '$fileServerBase/${quizView.options![i].image!}',
                                          context),
                                      child: Image.network(
                                          '$fileServerBase/${quizView.options![i].image!}'))
                                  : Container(),
                        ),
                      ),
                    ],
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Color colorPicker(int index, context) {
    print(toShow);
    if (toShow) {
      if (selectedAnswer["${quizView.id}"].runtimeType == List) {
        if (selectedAnswer["${quizView.id}"].contains(index)) {
          return Theme.of(context).colorScheme.primary;
        }
      } else {
        if (selectedAnswer["${quizView.id}"] == index) {
          return Theme.of(context).colorScheme.tertiary;
        }
      }
    }
    return Theme.of(context).colorScheme.surface;
  }
}
