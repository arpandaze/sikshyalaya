import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/student_note.dart';

class SessionsRepository {
  final Client httpclient = http.Client();
  final String? token;

  SessionsRepository({required this.token});

  Future<List<Map?>> getSession() async {
    if (token != null) {
      final headers = {"Cookie": "session=$token"};
      final response = await httpclient.get(
          Uri.parse('$backendBase/auth/active-sessions/'),
          headers: headers);

      if (response.statusCode != 200) {
        throw Exception(
            'Retrieve Failed! Error getting student dashboard info.');
      }

      if (response.body.isNotEmpty) {
        var listDecodedRespose = jsonDecode(response.body);

        final List<Map?> listSessions = [];

        listDecodedRespose.forEach(
          (element) => {
            listSessions.add({'ua': element['ua'], 'ip': element['ip']})
          },
        );
        print(listSessions);
        return listSessions;
      } else {
        throw Exception('Body Empty');
      }
    } else {
      throw Exception("No Session Found!!");
    }
  }

  // Future<Note> deleteNotes({required String url}) async {
  //   if (token != null) {
  //     final headers = {
  //       "Cookie": "session=$token",
  //       "Content-Type": "application/json"
  //     };
  //     var response = await http.delete(
  //       Uri.parse('$backendBase/$url'),
  //       headers: headers,
  //     );

  //     if (response.statusCode != 200) {
  //       throw Exception("Note Delete Failed");
  //     }

  //     if (response.body.isNotEmpty) {
  //       var decodedResponse = jsonDecode(response.body);
  //       final Note createdNote = Note.fromJson(decodedResponse);
  //       return createdNote;
  //     } else {
  //       throw Exception("Body Empty");
  //     }
  //   } else {
  //     throw Exception("No Session not found!!");
  //   }
  // }
}
