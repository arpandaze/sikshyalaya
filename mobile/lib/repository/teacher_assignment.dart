import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/teacher_assignment.dart';

class TeacherAssignmentRepository {
  final Client httpclient = http.Client();

  // Future<List<Note>> loadWithToken() async {
  //   final token = await storage.read(key: "token");
  //   return StudentAssignmentRepository(token: token!);
  // }

  // Uri getUrl({
  //   required String url,
  //   Map<String, String>? queryParameters,
  // }) {
  //   return Uri.parse('$backendBase/$url').replace(
  //     queryParameters: queryParameters,
  //   );
  // }

  Future<List<TAssignment>> getTeacherAssignment(
      {required String url, required String token}) async {
    final headers = {"Cookie": "Session=$token"};
    final response = await httpclient.get(Uri.parse('$backendBase/$url'),
        headers: {"Cookie": "session=$token"});

    if (response.statusCode != 200) {
      print(response.statusCode);
      throw Exception('Retrieve Failed! Error getting student dashboard info.');
    }

    if (response.body.isNotEmpty) {
      var listDecodedRespose = jsonDecode(response.body);

      final List<TAssignment> listAssignment = [];

      listDecodedRespose.forEach(
          (element) => {listAssignment.add(TAssignment.fromJson((element)))});
      return listAssignment;
    } else {
      throw Exception('Body Empty');
    }
  }
}
