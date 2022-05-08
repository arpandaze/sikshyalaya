import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/quiz.dart';
import 'package:sikshyalaya/repository/models/teacher_quiz.dart';
import 'package:sikshyalaya/repository/models/teacher_dash.dart';
import 'package:sikshyalaya/screens/Teacher-Quiz/teacher_quiz_bloc.dart';

class TeacherQuizRepository {
  final Client httpclient = http.Client();
  final String? token; 

  TeacherQuizRepository({required this.token});

  Future<List<TQuiz>> getTeacherQuiz(
      {required String url}) async {
    final headers = {"Cookie": "Session=$token"};
    final response = await httpclient.get(Uri.parse('$backendBase/$url'),
        headers: {"Cookie": "session=$token"});

    // headers: {"Authorization": tok

    if (response.statusCode != 200) {
      throw Exception('Retrieve Failed! Error getting Teacher quiz info.');
    }

    if (response.body.isNotEmpty) {
      var listDecodedRespose = jsonDecode(response.body);

      final List<TQuiz> listQuiz = [];

      listDecodedRespose
          .forEach((element) => {listQuiz.add(TQuiz.fromJson((element)))});
      // listClassSession.add(ClassSession.fromJson(json.decode(element)))});

      // print(listClassSession);
      return listQuiz;
    } else {
      throw Exception('Body Empty');
    }
  }
  Future<TQuiz> deleteQuiz({required int quiz_id}) async {
    if (token != null) {
      final headers = {
        "Cookie": "session=$token",
      };
      var response = await http.delete(
        Uri.parse('$backendBase/quiz/$quiz_id/'),
        headers: headers,
        body: json.encode({"quizid": quiz_id}),
      );

      print(response.statusCode);

      if (response.statusCode != 200) {
        throw Exception("Quiz Delete Failed");
      }

      if (response.body.isNotEmpty) {
        var decodedResponse = jsonDecode(response.body);
        final TQuiz createdNote = TQuiz.fromJson(decodedResponse);
        return createdNote;
      } else {
        throw Exception("Body Empty");
      }
    } else {
      throw Exception("No Session not found!!");
    }
  }
}
