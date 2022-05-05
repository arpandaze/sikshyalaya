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
    // var formData = FormData();
    // formData.add('full_name', body['full_name']);
    // formData.add('address', body['address']);
    // formData.add('contact_number', body['contact_number']);
    // formData.add('dob', body['dob']);
    print("this is body");
    print(body);
    if (token != null) {
      var uri = Uri.parse('$backendBase/users/me/');
      var request = http.MultipartRequest(
        'PUT',
        uri,
      )
        ..fields['full_name'] = body['full_name']
        ..fields['address'] = body['address']
        ..fields['contact_number'] = body['contact_number']
        ..fields['dob'] = body['dob'];
      // ..files.add(await http.MultipartFile.fromPath(
      //     'package', 'build/package.tar.gz',
      //     contentType: MediaType('application', 'x-tar')));
      request.headers['Cookie'] = "session=$token";

      var response = await request.send();
      if (response.statusCode == 200) print('Uploaded!');

      if (response.statusCode != 200) {
        throw Exception("Submit Failed");
      }
      var responseBody = await response.stream.bytesToString();
      if (responseBody != "") {
        var decodedResponse = jsonDecode(responseBody);
        return decodedResponse;
      } else {
        throw Exception("Body Empty");
      }
    } else {
      throw Exception("No Session not found!!");
    }
  }
}
