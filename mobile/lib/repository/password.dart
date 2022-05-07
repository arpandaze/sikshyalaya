import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';

class PasswordRepository {
  final Client httpclient = http.Client();
  final String? token;

  PasswordRepository({required this.token});

  // Future<Map> getPersonal() async {
  //   if (token != null) {
  //     final headers = {"Cookie": "session=$token"};
  //     final response = await httpclient.get(Uri.parse('$backendBase/users/me/'),
  //         headers: headers);

  //     if (response.statusCode != 200) {
  //       throw Exception(
  //           'Retrieve Failed! Error getting student dashboard info.');
  //     }

  //     if (response.body.isNotEmpty) {
  //       var decodedRespose = jsonDecode(response.body);
  //       return decodedRespose;
  //     } else {
  //       throw Exception('Body Empty');
  //     }
  //   } else {
  //     throw Exception("No Session Found!!");
  //   }
  // }

  void editPassword({required Map body}) async {
    // var formData = FormData();
    // formData.add('full_name', body['full_name']);
    // formData.add('address', body['address']);
    // formData.add('contact_number', body['contact_number']);
    // formData.add('dob', body['dob']);
    print("this is body");
    print(body);
    if (token != null) {
      final headers = {
        "Cookie": "session=$token",
        "Content-Type": "application/json"
      };
      var response = await http.post(
        Uri.parse('$backendBase/auth/change-password/'),
        headers: headers,
        body: jsonEncode(body),
      );

      if (response.statusCode != 200) {
        throw Exception("Note Submit Failed");
      }

      if (response.body.isNotEmpty) {
        var decodedRespose = jsonDecode(response.body);
      } else {
        throw Exception("Body Empty");
      }
    } else {
      throw Exception("No Session not found!!");
    }
  }
}
