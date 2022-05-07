import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/answer.dart';
import 'package:sikshyalaya/repository/models/student_assignment.dart';
import 'package:sikshyalaya/repository/models/submitted_assignment.dart';

class TeacherAssignmentReviewRepository {
  final Client httpclient = http.Client();
  final String? token;

  TeacherAssignmentReviewRepository({required this.token});

  // Future<List<Note>> loadWithToken() async {
  //   final token = await storage.read(key: "token");
  //   return TeacherAssignmentReview(token: token!);s
  // }

  // Uri getUrl({
  //   required String url,
  //   Map<String, String>? queryParameters,
  // }) {
  //   return Uri.parse('$backendBase/$url').replace(
  //     queryParameters: queryParameters,
  //   );
  // }

  Future<List<SubmittedAssignment>> getTeacherAssignmentReview({
    required int assignmentId,
  }) async {
    if (token != null) {
      final headers = {"Cookie": "session=$token"};
      final response = await httpclient.get(
        Uri.parse(
            '$backendBase/assignmentupload/$assignmentId/getUploadsAsTeacher/'),
        headers: headers,
      );
      print(response.body);
      if (response.statusCode != 200) {
        throw Exception('Retrieve Failed! Error getting uploads info.');
      }

      if (response.body.isNotEmpty) {
        var listDecodedRespose = jsonDecode(response.body);

        final List<SubmittedAssignment> listAnswers = [];

        listDecodedRespose.forEach((element) =>
            {listAnswers.add(SubmittedAssignment.fromJson((element)))});
        return listAnswers;
      } else {
        throw Exception('Body Empty');
      }
    } else {
      throw Exception("No Session found");
    }
  }
}
