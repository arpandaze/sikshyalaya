import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/student_note.dart';

class ResetPasswordRepository {
  final Client httpclient = http.Client();
  final String? token;

  ResetPasswordRepository({required this.token});

  Future<Map> requestReset({required Map body}) async {
    final response = await httpclient.post(
      Uri.parse('$backendBase/auth/password-recovery/?email=${body['email']}'),
    );

    print(response.statusCode);
    if (response.statusCode != 200) {
      return {'message': 'Email Address not registered'};
    }

    if (response.body.isNotEmpty) {
      return {'message': 'Reset Password Email. Sent to your Email Address'};
    } else {
      return {'message': 'Could not send a Reset Email'};
    }
  }

  // void resetPass({required Map body}) async {
  //   if (token != null) {
  //     final headers = {"Cookie": "session=$token"};
  //     final response = await httpclient
  //         .get(Uri.parse('$backendBase/auth/reset-password'), headers: headers);

  //     if (response.statusCode != 200) {
  //       throw Exception(
  //           'Retrieve Failed! Error getting student dashboard info.');
  //     }

  //     if (response.body.isNotEmpty) {
  //       var listDecodedRespose = jsonDecode(response.body);

  //       final List<Note> listNote = [];
  //       listDecodedRespose
  //           .forEach((element) => {listNote.add(Note.fromJson((element)))});
  //       return listNote;
  //     } else {
  //       throw Exception('Body Empty');
  //     }
  //   } else {
  //     throw Exception("No Session Found!!");
  //   }
  // }
}
