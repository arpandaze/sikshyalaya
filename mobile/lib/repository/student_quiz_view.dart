import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/quiz_answer.dart';
import 'package:sikshyalaya/repository/models/quiz_view.dart';

class StudentQuizViewRepository {
  final Client httpclient = http.Client();
  final String? token;

  StudentQuizViewRepository({required this.token});

  Future<List<QuizView>> getStudentQuizView({
    required String url,
  }) async {
    if (token != null) {
      final headers = {"Cookie": "session=$token"};
      final response = await httpclient.get(Uri.parse('$backendBase/$url'),
          headers: headers);

      // headers: {"Authorization": tok

      if (response.statusCode != 200) {
        throw Exception('Retrieve Failed! Error getting student quiz info.');
      }

      if (response.body.isNotEmpty) {
        var listDecodedRespose = jsonDecode(response.body);

        final List<QuizView> listQuizView = [];

        listDecodedRespose.forEach(
            (element) => {listQuizView.add(QuizView.fromJson((element)))});
        // listClassSession.add(ClassSession.fromJson(json.decode(element)))});

        return listQuizView;
      } else {
        throw Exception('Body Empty');
      }
    } else {
      throw Exception("No Session Found");
    }
  }

  Future<Map> getStudentAnswer({required String url}) async {
    if (token != null) {
      final headers = {"Cookie": "session=$token"};

      final responseExists = await httpclient
          .get(Uri.parse('$backendBase/$url/exists/'), headers: headers);
      if (responseExists.statusCode != 200) {
        throw Exception('Retrieve Failed! Error getting existence of answer.');
      }
      if (responseExists.body.isNotEmpty) {
        var decodedResposeExists = jsonDecode(responseExists.body);

        if (decodedResposeExists['exists'] == true) {
          final response = await httpclient.get(Uri.parse('$backendBase/$url'),
              headers: {"Cookie": "session=$token"});

          if (response.statusCode != 200) {
            throw Exception(
                'Retrieve Failed! Error getting student quiz answer.');
          }

          if (response.body.isNotEmpty) {
            var listDecodedRespose = jsonDecode(response.body);

            final QuizAnswer quizAnswer =
                QuizAnswer.fromJson(listDecodedRespose);

            return {"quiz_answer": quizAnswer, "exists": true};
          } else {
            throw Exception('Body Empty');
          }
        } else {
          return {"quiz_answer": QuizAnswer.empty, "exists": false};
        }
      } else {
        throw Exception('Body Empty');
      }
    } else {
      throw Exception("No Session Found");
    }
  }

  Future<QuizAnswer> postStudentAnswer(
      {required String url, required Map body}) async {
    if (token != null) {
      final headers = {
        "Cookie": "session=$token",
        "Content-Type": "application/json"
      };
      var response = await http.post(
        Uri.parse('$backendBase/$url'),
        headers: headers,
        body: jsonEncode(body),
      );

      if (response.statusCode != 200) {
        throw Exception("Post Failed");
      }

      if (response.body.isNotEmpty) {
        var decodedResponse = jsonDecode(response.body);
        final QuizAnswer quizAnswer = QuizAnswer.fromJson(decodedResponse);
        return quizAnswer;
      } else {
        throw Exception("Body Empty");
      }
    } else {
      throw Exception("No Session not found!!");
    }
  }
}
