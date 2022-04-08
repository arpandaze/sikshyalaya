import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/student_dash.dart';

class StudentDashboardRepository {
  final Client httpclient = http.Client();
  // static const storage = FlutterSecureStorage();
  // final String token;

  StudentDashboardRepository(
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

  Future<List<ClassSession>> getStudentDashboard(
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
      print(response.body);

      var listDecodedRespose = jsonDecode(response.body);

      final List<ClassSession> listClassSession = [];

      listDecodedRespose.forEach((element) =>
          {listClassSession.add(ClassSession.fromJson((element)))});
      // listClassSession.add(ClassSession.fromJson(json.decode(element)))});

      // print(listClassSession);
      return listClassSession;
    } else {
      throw Exception('Body Empty');
    }
  }
}
