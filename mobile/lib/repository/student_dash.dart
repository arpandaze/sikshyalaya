import 'dart:convert';
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/student_dash.dart';

class StudentDashboardRepository {
  final Client httpclient = Client();
  final String path = "class_session/";
  // static const storage = FlutterSecureStorage();
  final String? token;

  StudentDashboardRepository({
    required this.token,
  });

  // static Future<StudentDashboardRepository> loadWithToken() async {
  //   final token = await storage.read(key: "token");
  //   return StudentDashboardRepository(token: token!);
  // }

  // Uri getUrl({
  //   required String url,
  //   Map<String, String>? queryParameters,
  // }) {
  //   return Uri.parse('$backendBase/$url').replace(
  //     queryParameters: queryParameters,
  //   );
  // }

  Future<List<ClassSession>> getStudentDashboard() async {
    if (token != null) {
      final headers = {"Cookie": "session=$token"};
      final response = await httpclient.get(
        Uri.parse('$backendBase/$path'),
        headers: headers,
      );
      print(token);

      if (response.statusCode != 200) {
        throw Exception(
            'Retrieve Failed! Error getting student dashboard info.');
      }

      if (response.body.isNotEmpty) {
        var listDecodedRespose = jsonDecode(response.body);

        final List<ClassSession> listClassSession = [];

        listDecodedRespose.forEach((element) =>
            {listClassSession.add(ClassSession.fromJson((element)))});

        return listClassSession;
      } else {
        throw Exception('Body Empty');
      }
    } else {
      throw Exception("Not logged in!");
    }
  }
}
