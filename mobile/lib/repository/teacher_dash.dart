import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/teacher_dash.dart';

class TeacherDashboardRepository {
  final Client httpclient = http.Client();
  // static const storage = FlutterSecureStorage();
  // final String token;

  TeacherDashboardRepository(
      //{required this.token}
      );

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

  Future<List<TeacherClassSession>> getTeacherDashboard(
      {required String url, required String token}) async {
    final headers = {"Cookie": "Session=$token"};
    final response = await httpclient.get(Uri.parse('$backendBase/$url'),
        headers: {"Cookie": "session=$token"});

    print(headers);
    // headers: {"Authorization": tok

    if (response.statusCode != 200) {
      print(response.statusCode);
      throw Exception('Retrieve Failed! Error getting student dashboard info.');
    }

    if (response.body.isNotEmpty) {
      var listDecodedRespose = jsonDecode(response.body);

      final List<TeacherClassSession> listClassSession = [];

      listDecodedRespose.forEach((element) =>
          {listClassSession.add(TeacherClassSession.fromJson((element)))});
      // listClassSession.add(ClassSession.fromJson(json.decode(element)))});

      // print(listClassSession);
      return listClassSession;
    } else {
      throw Exception('Body Empty');
    }
  }
}
