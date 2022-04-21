import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/student_note.dart';

class StudentNoteRepository {
  final Client httpclient = http.Client();
  final String? token;

  StudentNoteRepository({required this.token});

  Future<List<Note>> getStudentNote({required String url}) async {
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

        final List<Note> listNote = [];
        listDecodedRespose
            .forEach((element) => {listNote.add(Note.fromJson((element)))});
        return listNote;
      } else {
        throw Exception('Body Empty');
      }
    } else {
      throw Exception("No Session Found!!");
    }
  }
}
