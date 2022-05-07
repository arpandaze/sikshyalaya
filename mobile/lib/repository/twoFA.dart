import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/student_note.dart';

class TwoFARepository {
  final Client httpclient = http.Client();
  final String? token;

  TwoFARepository({required this.token});

  Future<Map> getTwoFA() async {
    if (token != null) {
      final headers = {"Cookie": "session=$token"};
      final response = await httpclient
          .get(Uri.parse('$backendBase/2fa/enable/request'), headers: headers);

      if (response.statusCode != 200) {
        throw Exception(
            'Retrieve Failed! Error getting student dashboard info.');
      }

      if (response.body.isNotEmpty) {
        var listDecodedRespose = jsonDecode(response.body);
        return listDecodedRespose;
      } else {
        throw Exception('Body Empty');
      }
    } else {
      throw Exception("No Session Found!!");
    }
  }

  Future<Map> sendTwoFA({required String totcode}) async {
    if (token != null) {
      print("gsee");
      print(totcode);
      final headers = {
        "Cookie": "session=$token",
        "Content-Type": "application/json"
      };
      final response = await httpclient.post(
        Uri.parse('$backendBase/2fa/enable/confirm'),
        headers: headers,
        body: jsonEncode(
          {"totp": totcode},
        ),
      );
      if (response.statusCode != 200) {
        throw Exception(
            'Retrieve Failed! Error getting student dashboard info.');
      }

      if (response.body.isNotEmpty) {
        var listDecodedRespose = jsonDecode(response.body);
        return listDecodedRespose;
      } else {
        throw Exception('Body Empty');
      }
    } else {
      throw Exception("No Session Found!!");
    }
  }

  Future<Map> disableTwoFA() async {
    if (token != null) {
      final headers = {
        "Cookie": "session=$token",
        "Content-Type": "application/json"
      };
      final response = await httpclient.delete(
        Uri.parse('$backendBase/2fa/disable'),
        headers: headers,
      );
      print(response.body);
      if (response.statusCode != 200) {
        throw Exception(
            'Retrieve Failed! Error getting student dashboard info.');
      }

      if (response.body.isNotEmpty) {
        var listDecodedRespose = jsonDecode(response.body);
        return listDecodedRespose;
      } else {
        throw Exception('Body Empty');
      }
    } else {
      throw Exception("No Session Found!!");
    }
  }
}
