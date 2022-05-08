import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/components/CustomFilledButtonSecond.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/quiz_answer.dart';
import 'package:sikshyalaya/repository/models/quiz_view.dart';
import 'package:sikshyalaya/screens/Quiz/answer_bloc.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz_bloc.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz_view_bloc.dart';

class QuizAttemptCard extends StatelessWidget {
  const QuizAttemptCard({
    Key? key,
    required this.quizView,
    required this.controller,
    required this.index,
    required this.multiple,
    required this.attemptedAnswers,
    required this.question_id,
  }) : super(key: key);

  final QuizView quizView;
  final PageController controller;
  final int index;
  final int? question_id;
  final bool multiple;
  final Map attemptedAnswers;

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => AnswerBloc(),
      child: body(context),
    );
  }

  Widget body(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocBuilder<AnswerBloc, AnswerState>(
      buildWhen: (previous, current) => checker(previous, current),
      builder: (context, state) {
        print(quizView.question_image);
        return Column(
          children: [
            Container(
              padding: EdgeInsets.only(bottom: size.height * 0.02),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.max,
                children: [
                  Container(
                    padding: const EdgeInsets.only(
                        left: 8.0, top: 6.0, right: 4.0, bottom: 10),
                    child: Text(
                      "$index. ${quizView.question_text}",
                      textAlign: TextAlign.left,
                      style: Theme.of(context).textTheme.headline4,
                    ),
                  ),
                  if (quizView.question_image != null &&
                      quizView.question_image!.isNotEmpty)
                    Container(
                      constraints: BoxConstraints(),
                      child: (GridView.builder(
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
                            '$fileServerBase/${quizView.question_image![index]}',
                            height: size.height * 0.2,
                            width: size.width * 0.2,
                            fit: BoxFit.contain,
                          );
                        },
                      )),
                    ),
                  Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: const Color(0xFFB4B4B4)),
                    ),
                    child: Expanded(
                      child: ListView.builder(
                          // physics: AlwaysScrollableScrollPhysics(),s
                          shrinkWrap: true,
                          itemCount: quizView.options != null
                              ? quizView.options!.length
                              : 0,
                          itemBuilder: (context, i) {
                            return multiple == false
                                ? RadioListTile(
                                    title: quizView.options![i].text != ""
                                        ? Text(
                                            quizView.options![i].text!,
                                            style: Theme.of(context)
                                                .textTheme
                                                .bodyText1,
                                          )
                                        : quizView.options![i].image != ""
                                            ? Image.network(
                                                '$fileServerBase/${quizView.options![i].image!}',
                                                height: size.height * 0.2,
                                                width: size.width * 0.2,
                                                fit: BoxFit.contain,
                                              )
                                            : Container(),
                                    value: i,
                                    groupValue: state.radioValueGroup,
                                    activeColor:
                                        Theme.of(context).colorScheme.primary,
                                    onChanged: (int? value) =>
                                        onRadioChanged(context, value))
                                : CheckboxListTile(
                                    controlAffinity:
                                        ListTileControlAffinity.leading,
                                    title: quizView.options![i].text != ""
                                        ? Text(
                                            quizView.options![i].text!,
                                            style: Theme.of(context)
                                                .textTheme
                                                .bodyText1,
                                            textAlign: TextAlign.left,
                                          )
                                        : quizView.options![i].image != ""
                                            ? Image.network(
                                                '$fileServerBase/${quizView.options![i].image!}',
                                                height: size.height * 0.2,
                                                width: size.width * 0.2,
                                                fit: BoxFit.contain,
                                              )
                                            : Container(),
                                    value: state.checkValues != null
                                        ? state.checkValues!.contains(i)
                                        : false,
                                    onChanged: (value) =>
                                        onCheckChanged(context, i),
                                    activeColor:
                                        Theme.of(context).colorScheme.primary,
                                  );
                          }),
                    ),
                  ),
                ],
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                SizedBox(
                  width: size.width * 0.25,
                  child: CustomFilledButtonSecond(
                      buttonText: 'Previous',
                      onPressed: () => (controller.previousPage(
                          duration: Duration(milliseconds: 250),
                          curve: Curves.linear))),
                ),
                // SizedBox(
                //   width: size.width * 0.2,
                //   child: Text(
                //       "${_controller.page!.toInt() + 1}/${state.quizViews.length}"),
                // ),

                SizedBox(
                  width: size.width * 0.25,
                  child: CustomFilledButtonSecond(
                      buttonText: 'Next',
                      onPressed: () => (controller.nextPage(
                          duration: Duration(milliseconds: 250),
                          curve: Curves.linear))),
                ),
              ],
            ),
          ],
        );
      },
    );
  }

  void onCheckChanged(BuildContext context, int i) {
    BlocProvider.of<AnswerBloc>(context).add(CheckedValueChanged(addValue: i));
  }

  void onRadioChanged(BuildContext context, int? value) {
    BlocProvider.of<AnswerBloc>(context)
        .add(RadioValueChanged(value: value ?? -1));
  }

  bool checker(AnswerState p, AnswerState c) {
    if (p.checkValues != c.checkValues) {
      attemptedAnswers["$question_id"] = c.checkValues;
    }

    if (p.radioValueGroup != c.radioValueGroup) {
      attemptedAnswers["$question_id"] = [c.radioValueGroup];
    }
    return p != c;
  }
}
