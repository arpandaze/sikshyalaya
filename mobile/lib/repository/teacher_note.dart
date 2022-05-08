import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/teacher_note.dart';

class TeacherNoteRepository {
  final Client httpclient = http.Client();
  final String? token;

  TeacherNoteRepository({required this.token});

  Future<List<Note>> getTeacherNote({required String url}) async {
    if (token != null) {
      final headers = {"Cookie": "session=$token"};
      final response = await httpclient.get(Uri.parse('$backendBase/$url'),
          headers: headers);
      if (response.statusCode != 200) {
        throw Exception(
            'Retrieve Failed! Error getting teacher dashboard info.');
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

  Future<Note> submitNotes({required String url, required Map body}) async {
    if (token != null) {
      final headers = {
        "Cookie": "session=$token",
        "Content-Type": "application/json"
      };
      print(body);
      var response = await http.post(
        Uri.parse('$backendBase/$url'),
        headers: headers,
        body: jsonEncode(body),
      );

      if (response.statusCode != 200) {
        throw Exception("Note Submit Failed");
      }

      if (response.body.isNotEmpty) {
        var decodedResponse = jsonDecode(response.body);
        final Note createdNote = Note.fromJson(decodedResponse);
        return createdNote;
      } else {
        throw Exception("Body Empty");
      }
    } else {
      throw Exception("No Session not found!!");
    }
  }

  Future<Note> editNotes({required String url, required Map body}) async {
    if (token != null) {
      final headers = {
        "Cookie": "session=$token",
        "Content-Type": "application/json"
      };
      var response = await http.put(
        Uri.parse('$backendBase/$url'),
        headers: headers,
        body: jsonEncode(body),
      );

      if (response.statusCode != 200) {
        throw Exception("Note Submit Failed");
      }

      if (response.body.isNotEmpty) {
        var decodedResponse = jsonDecode(response.body);
        final Note createdNote = Note.fromJson(decodedResponse);
        return createdNote;
      } else {
        throw Exception("Body Empty");
      }
    } else {
      throw Exception("No Session not found!!");
    }
  }

  Future<Note> deleteNotes({required String url}) async {
    if (token != null) {
      final headers = {
        "Cookie": "session=$token",
        "Content-Type": "application/json"
      };
      var response = await http.delete(
        Uri.parse('$backendBase/$url'),
        headers: headers,
      );

      if (response.statusCode != 200) {
        throw Exception("Note Delete Failed");
      }

      if (response.body.isNotEmpty) {
        var decodedResponse = jsonDecode(response.body);
        final Note createdNote = Note.fromJson(decodedResponse);
        return createdNote;
      } else {
        throw Exception("Body Empty");
      }
    } else {
      throw Exception("No Session not found!!");
    }
  }
}
