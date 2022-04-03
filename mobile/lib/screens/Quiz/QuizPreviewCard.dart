import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Signup/signup_screen.dart';
import 'package:sikshyalaya/components/CustomFilledButton.dart';

class QuizPreviewCard extends StatelessWidget {
  final Color colorType;
  final String month;
  final String day;
  final String course;
  final String description;
  final String instructor;
  const QuizPreviewCard({
    Key? key,
    required this.size,
    required this.colorType,
    required this.month,
    required this.day,
    required this.course,
    required this.description,
    required this.instructor,
  }) : super(key: key);

  final Size size;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          margin: const EdgeInsets.fromLTRB(10, 10, 0, 10),
          width: size.width * 0.20,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                margin: const EdgeInsets.all(0),
                child:
                    Text(month, style: Theme.of(context).textTheme.subtitle1),
              ),
              Container(
                height: size.width * 0.11,
                decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                        color: Theme.of(context).colorScheme.onBackground)),
                child: Align(
                  alignment: Alignment.center,
                  child: Text(
                    day,
                    style: Theme.of(context).textTheme.subtitle1,
                  ),
                ),
              )
            ],
          ),
        ),
        Container(
          alignment: Alignment.center,
          margin: const EdgeInsets.fromLTRB(0, 0, 10, 10),
          width: size.width * 0.65,
          height: 200,
          decoration: BoxDecoration(
            color: colorType,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                margin: const EdgeInsets.fromLTRB(20, 10, 10, 5),
                width: size.width * 0.55,
                child: Text(
                  course,
                  style: Theme.of(context).textTheme.headline5,
                ),
              ),
              Container(
                margin: const EdgeInsets.fromLTRB(20, 0, 10, 5),
                width: size.width * 0.55,
                child: Text(
                  description,
                  style: Theme.of(context).textTheme.bodyText1,
                ),
              ),
              Container(
                margin: const EdgeInsets.fromLTRB(20, 0, 10, 5),
                width: size.width * 0.55,
                child: Text(
                  instructor,
                  style: Theme.of(context).textTheme.subtitle1,
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Positioned(
                    child: Container(
                      margin: const EdgeInsets.fromLTRB(0, 0, 12, 0),
                      width: size.width * 0.35,
                      child: CustomFilledButton(
                        height: size.width * 0.04,
                        buttonText: "Attempt Quiz",
                        /* onPressed: const SignupScreen(), */
                        textColor: Theme.of(context).colorScheme.onSurface,
                        colorType: Theme.of(context).colorScheme.onPrimary,
                      ),
                    ),
                  )
                ],
              ),
            ],
          ),
        )
      ],
    );
  }
}
