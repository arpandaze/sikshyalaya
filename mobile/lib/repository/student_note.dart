import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/student_note.dart';
import 'package:sikshyalaya/screens/Student/student_wrapper.dart';

class StudentNoteRepository {
  final String token;
  final Client httpclient = http.Client();
  static const storage = FlutterSecureStorage();

  StudentNoteRepository({required this.token});

  static Future<StudentNoteRepository> loadWithToken() async {
    final token = await storage.read(key: "token");
    return StudentNoteRepository(token: token!);
  }

  Uri getUrl({
    required String url,
    Map<String, String>? queryParameters,
  }) {
    return Uri.parse('$backendBase/$url').replace(
      queryParameters: queryParameters,
    );
  }

  Future<List<Note>> getStudentNote({required String url}) async {
    print('gg');
    final response = await httpclient.get(
      getUrl(url: url),
    );

    if (response.statusCode != 200) {
      print(response.statusCode);
      throw Exception('Retrieve Failed! Error getting student dashboard info.');
    }

    if (response.body.isNotEmpty) {
      print(response.body);
      List<Note> notes = [];
      for (var i = 0; i < response.body.length; i++) {
        notes.add(Note.fromJson(jsonDecode(response.body[i])));
      }
      // print(notes);
      return notes;
    } else {
      throw Exception('Body Empty');
    }
  }
}
