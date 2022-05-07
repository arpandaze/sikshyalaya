import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/repository/teacher_quiz.dart';
import 'package:sikshyalaya/screens/Teacher-Quiz/teacher_quiz_bloc.dart';
import 'package:sikshyalaya/screens/Teacher-Quiz/teacher_quiz_review.dart';

class QuizReviewCard extends StatelessWidget {
  const QuizReviewCard({
    Key? key,
    required this.id,
    required this.profile_image,
    required this.marks_obtained,
    required this.quiz_id,
    required this.studentName,
  }) : super(key: key);
  final int id;
  final int marks_obtained;
  final int quiz_id;
  final String studentName;
  final String profile_image;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        border: Border(
            bottom: BorderSide(
          width: 1.0,
          color: Color.fromARGB(255, 214, 213, 213),
        )),
      ),
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        Container(
            child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              padding: EdgeInsets.only(right: 10),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(50), // Image border
                child: SizedBox.fromSize(
                  size: const Size.fromRadius(18), // Image radius
                  child: getProfileImage(profile_image),
                ),
              ),
            ),
            Container(
              child: Text(
                studentName,
                style: TextStyle(
                    fontSize: 15, fontFamily: "OpenSans", color: Colors.black),
              ),
            )
          ],
        )),
        Container(
          child: Text(
            "$marks_obtained",
            style: TextStyle(
                fontSize: 15, fontFamily: "OpenSans", color: Colors.black),
          ),
        ),
      ]),
    );
  }

  Widget getProfileImage(String? profilePath) {
    if (profilePath != null) {
      return CachedNetworkImage(
        imageUrl: '$fileServerBase/$profilePath',
        imageBuilder: (context, imageProvider) => Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: imageProvider,
              fit: BoxFit.contain,
            ),
          ),
        ),
        placeholder: (context, url) => const CircularProgressIndicator(),
        errorWidget: (context, url, error) => const Icon(Icons.error),
      );
    } else {
      return SvgPicture.asset(
        "assets/images/defaultProfile.svg",
        fit: BoxFit.cover,
      );
    }
  }
}
