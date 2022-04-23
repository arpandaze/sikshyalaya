import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/quiz.dart';
import 'package:sikshyalaya/repository/models/student_dash.dart';

class StudentQuizRepository {
  final Client httpclient = http.Client();
  final String? token;

  StudentQuizRepository({required this.token});

  Future<List<Quiz>> getStudentQuiz({required String url}) async {
    if (token != null) {
      final headers = {"Cookie": "session=$token"};
      final response = await httpclient.get(Uri.parse('$backendBase/$url'),
          headers: headers);

      if (response.statusCode != 200) {
        throw Exception('Retrieve Failed! Error getting student quiz info.');
      }

      if (response.body.isNotEmpty) {
        var listDecodedRespose = jsonDecode(response.body);

        final List<Quiz> listQuiz = [];

        listDecodedRespose
            .forEach((element) => {listQuiz.add(Quiz.fromJson((element)))});

        return listQuiz;
      } else {
        throw Exception('Body Empty');
      }
    } else {
      throw Exception("No Session Found!");
    }
  }
}
