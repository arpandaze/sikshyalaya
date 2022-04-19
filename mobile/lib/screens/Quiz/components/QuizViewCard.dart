import 'package:flutter/material.dart';
import 'package:sikshyalaya/repository/models/quiz_view.dart';

class QuizViewCard extends StatelessWidget {
  QuizViewCard({
    Key? key,
    required this.quizView,
    required this.size,
    required this.index,
    this.selectedAnswer,
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
    return Column(
      children: [
        Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              width: size.width * 0.10,
              height: size.width * 0.10,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surface,
                shape: BoxShape.circle,
                border: Border.all(
                  color: Theme.of(context).colorScheme.surface,
                ),
              ),
              child: Text(
                "$index",
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.headline5,
              ),
            ),
            SizedBox(
              width: size.width * 0.02,
            ),
            Container(
              width: size.width * 0.800,
              height: size.height * 0.9,
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surface,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(
                  color: Theme.of(context).colorScheme.surface,
                ),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.max,
                children: [
                  Row(
                    mainAxisSize: MainAxisSize.max,
                    children: <Widget>[
                      Container(
                        padding: const EdgeInsets.only(
                            left: 8.0, top: 6.0, right: 4.0, bottom: 8.0),
                        child: Text(
                          quizView.question_text ?? "",
                          textAlign: TextAlign.left,
                          style: Theme.of(context).textTheme.headline6,
                        ),
                      ),
                    ],
                  ),
                  GridView.builder(
                    physics: const NeverScrollableScrollPhysics(),
                    padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
                    shrinkWrap: true,
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      crossAxisSpacing: 5,
                      mainAxisSpacing: 5,
                    ),
                    itemCount: quizView.question_image != null
                        ? quizView.question_image!.length
                        : 0,
                    itemBuilder: (BuildContext context, int index) {
                      return Image.network(
                        quizView.question_image![index],
                      );
                    },
                  ),
                  Expanded(
                    child: ListView.builder(
                      physics: NeverScrollableScrollPhysics(),
                      shrinkWrap: false,
                      itemCount: quizView.options != null
                          ? quizView.options!.length
                          : 0,
                      itemBuilder: (context, i) {
                        return Column(
                          children: [
                            Container(
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
                                        style: Theme.of(context)
                                            .textTheme
                                            .subtitle1,
                                      )
                                    : quizView.options![i].image != ""
                                        ? Image.network(
                                            quizView.options![i].image!)
                                        : Container(),
                              ),
                            ),
                            SizedBox(
                              height: size.height * 0.005,
                            )
                          ],
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        SizedBox(
          height: size.height * 0.009,
        ),
      ],
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
          return Theme.of(context).colorScheme.primary;
        }
      }
    }
    return Theme.of(context).colorScheme.background;
  }
}
