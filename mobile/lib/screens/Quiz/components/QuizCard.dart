import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class QuizCard extends StatelessWidget {
  const QuizCard({
    Key? key,
    required this.size,
  }) : super(key: key);

  final Size size;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
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
            "1",
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.headline6,
          ),
        ),
        Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            border: Border.all(
              color: Theme.of(context).colorScheme.surface,
            ),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Container(
                padding: const EdgeInsets.only(
                    left: 8.0, top: 6.0, right: 4.0, bottom: 8.0),
                width: size.width * 0.82,
                decoration: const BoxDecoration(
                  shape: BoxShape.rectangle,
                ),
                child: Text(
                  "Virus Corona (COVID-19) yang menyerang manusia muncul di negara… pada awaltahun 2020.",
                  textAlign: TextAlign.left,
                  style: Theme.of(context).textTheme.headline6,
                ),
              ),
              Container(
                padding: const EdgeInsets.only(
                    left: 8.0, top: 6.0, right: 4.0, bottom: 8.0),
                width: size.width * 0.82,
                decoration: const BoxDecoration(
                  shape: BoxShape.rectangle,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ListTile(
                      title: Text(
                        "Male",
                        style: Theme.of(context).textTheme.headline6,
                      ),
                      leading: const Radio(
                        value: 1,
                        groupValue: null,
                        onChanged: null,
                        activeColor: Colors.green,
                      ),
                    ),
                    ListTile(
                      title: Text(
                        "Female",
                        style: Theme.of(context).textTheme.headline6,
                      ),
                      leading: const Radio(
                        value: 2,
                        groupValue: null,
                        onChanged: null,
                        activeColor: Colors.green,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
