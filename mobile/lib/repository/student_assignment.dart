import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/student_assignment.dart';

class StudentAssignmentRepository {
  final Client httpclient = http.Client();

  final String? token;

  StudentAssignmentRepository({required this.token});

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

  Future<List<Assignment>> getStudentAssignment({
    required String url,
  }) async {
    if (token != null) {
      final headers = {"Cookie": "session=$token"};
      final response = await httpclient.get(Uri.parse('$backendBase/$url'),
          headers: headers);

      if (response.statusCode != 200) {
        throw Exception(
            'Retrieve Failed! Error getting student dashboard info.');
      }

      if (response.body.isNotEmpty) {
        var listDecodedRespose = jsonDecode(response.body);

        final List<Assignment> listAssignment = [];
        print(listDecodedRespose[0]);
        listDecodedRespose.forEach(
          (element) => {
            listAssignment.add(
              Assignment.fromJson(element),
            ),
          },
        );

        return listAssignment;
      } else {
        throw Exception('Body Empty');
      }
    } else {
      throw Exception("No Session found");
    }
  }

  Future<Map> getStudentAssignmentUploads({required int assignmentid}) async {
    if (token != null) {
      final headers = {"Cookie": "session=$token"};
      final response = await httpclient.get(
          Uri.parse('$backendBase/assignmentupload/$assignmentid'),
          headers: headers);

      if (response.statusCode != 200) {
        throw Exception(
            'Retrieve Failed! Error getting student dashboard info.');
      } else {
        var decodedResponse = jsonDecode(response.body);

        return decodedResponse;
      }
    } else {
      throw Exception("No Session found");
    }
  }
}
