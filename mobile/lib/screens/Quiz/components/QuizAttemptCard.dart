import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/repository/models/quiz_answer.dart';
import 'package:sikshyalaya/repository/models/quiz_view.dart';
import 'package:sikshyalaya/screens/Quiz/answer_bloc.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz_bloc.dart';
import 'package:sikshyalaya/screens/Quiz/student_quiz_view_bloc.dart';

class QuizAttemptCard extends StatelessWidget {
  QuizAttemptCard({
    Key? key,
    required this.quizView,
    required this.size,
    required this.index,
    required this.multiple,
    required this.attemptedAnswers,
    required this.question_id,
  }) : super(key: key);

  final QuizView quizView;
  final Size size;
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
    return BlocBuilder<AnswerBloc, AnswerState>(
      buildWhen: (previous, current) => checker(previous, current),
      builder: (context, state) {
        return Column(
          children: [
            Row(
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  width: size.width * 0.070,
                  height: size.width * 0.070,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: Theme.of(context).colorScheme.surface,
                    ),
                  ),
                  child: Text(
                    "$index",
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.subtitle1,
                  ),
                ),
                SizedBox(
                  width: size.width * 0.02,
                ),
                Container(
                  width: size.width * 0.800,
                  height: size.height * 0.90,
                  decoration: BoxDecoration(
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
                              return multiple == false
                                  ? RadioListTile(
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
                                                  .subtitle1,
                                            )
                                          : quizView.options![i].image != ""
                                              ? Image.network(
                                                  quizView.options![i].image!)
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
