import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';

class PersonalRepository {
  final Client httpclient = http.Client();
  final String? token;

  PersonalRepository({required this.token});

  Future<Map> getPersonal() async {
    if (token != null) {
      final headers = {"Cookie": "session=$token"};
      final response = await httpclient.get(Uri.parse('$backendBase/users/me/'),
          headers: headers);

      if (response.statusCode != 200) {
        throw Exception(
            'Retrieve Failed! Error getting student dashboard info.');
      }

      if (response.body.isNotEmpty) {
        var decodedRespose = jsonDecode(response.body);
        return decodedRespose;
      } else {
        throw Exception('Body Empty');
      }
    } else {
      throw Exception("No Session Found!!");
    }
  }

  Future<Map> editPersonal({required Map body}) async {
    print(jsonEncode(body));
    if (token != null) {
      final headers = {
        "Cookie": "session=$token",
        "Content-Type": "application/json"
      };
      var response = await http.put(
        Uri.parse('$backendBase/users/me/'),
        headers: headers,
        body: jsonEncode(body),
      );

      if (response.statusCode != 200) {
        throw Exception("Note Submit Failed");
      }

      if (response.body.isNotEmpty) {
        var decodedResponse = jsonDecode(response.body);
        return decodedResponse;
      } else {
        throw Exception("Body Empty");
      }
    } else {
      throw Exception("No Session not found!!");
    }
  }
}
