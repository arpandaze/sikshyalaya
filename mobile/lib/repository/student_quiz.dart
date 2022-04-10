import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/quiz.dart';
import 'package:sikshyalaya/repository/models/student_dash.dart';

class StudentQuizRepository {
  final Client httpclient = http.Client();

  StudentQuizRepository();

  Future<List<Quiz>> getStudentQuiz(
      {required String url, required String token}) async {
    final headers = {"Cookie": "Session=$token"};
    final response = await httpclient.get(Uri.parse('$backendBase/$url'),
        headers: {"Cookie": "session=$token"});

    print(headers);
    // headers: {"Authorization": tok

    if (response.statusCode != 200) {
      print(response.statusCode);
      throw Exception('Retrieve Failed! Error getting student quiz info.');
    }

    if (response.body.isNotEmpty) {
      print(response.body);

      var listDecodedRespose = jsonDecode(response.body);

      final List<Quiz> listQuiz = [];

      listDecodedRespose
          .forEach((element) => {listQuiz.add(Quiz.fromJson((element)))});
      // listClassSession.add(ClassSession.fromJson(json.decode(element)))});

      // print(listClassSession);
      return listQuiz;
    } else {
      throw Exception('Body Empty');
    }
  }
}
