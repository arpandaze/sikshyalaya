import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/quiz_view.dart';

class StudentQuizViewRepository {
  final Client httpclient = http.Client();

  StudentQuizViewRepository();

  Future<List<QuizView>> getStudentQuizView(
      {required String url, required String token}) async {
    final headers = {"Cookie": "Session=$token"};
    final response = await httpclient.get(Uri.parse('$backendBase/$url'),
        headers: {"Cookie": "session=$token"});

    // headers: {"Authorization": tok

    if (response.statusCode != 200) {
      print(response.statusCode);
      throw Exception('Retrieve Failed! Error getting student quiz info.');
    }

    if (response.body.isNotEmpty) {
      print(response.body);

      var listDecodedRespose = jsonDecode(response.body);

      final List<QuizView> listQuizView = [];

      listDecodedRespose.forEach(
          (element) => {listQuizView.add(QuizView.fromJson((element)))});
      // listClassSession.add(ClassSession.fromJson(json.decode(element)))});

      // print(listClassSession);
      return listQuizView;
    } else {
      throw Exception('Body Empty');
    }
  }
}
