import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/teacher_quiz.dart';
import 'package:sikshyalaya/repository/models/teacher_dash.dart';

class TeacherQuizRepository {
  final Client httpclient = http.Client();

  TeacherQuizRepository();

  Future<List<TQuiz>> getTeacherQuiz(
      {required String url, required String token}) async {
    final headers = {"Cookie": "Session=$token"};
    final response = await httpclient.get(Uri.parse('$backendBase/$url'),
        headers: {"Cookie": "session=$token"});

    print(headers);
    // headers: {"Authorization": tok

    if (response.statusCode != 200) {
      print(response.statusCode);
      throw Exception('Retrieve Failed! Error getting Teacher quiz info.');
    }

    if (response.body.isNotEmpty) {
      print(response.body);

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
}
