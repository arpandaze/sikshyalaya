import 'package:http/http.dart' as http;
import 'package:sikshyalaya/constants.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:convert';

class AuthenticationRepository {
  final client = http.Client();

  static const storage = FlutterSecureStorage();

  Future<Object> login({
    required String username,
    required String password,
  }) async {
    final url = Uri.parse('$backendBase/auth/web/');
    var response = await http.post(url,
        body: jsonEncode({
          "username": username,
          "password": password,
          "remember_me": true,
        }),
        headers: {"Content-Type": "application/json"});

    if (response.statusCode != 200) {
      throw Exception("Login failed! Check email or password!");
    }

    storage.write(
      key: "token",
      value: response.headers["set-cookie"]!.substring(8, 40),
    );

    var decodedResponse =
        jsonDecode(utf8.decode(response.bodyBytes)) as Map<String, dynamic>;

    storage.write(
      key: "user",
      value: jsonEncode(decodedResponse["user"]),
    );

    return decodedResponse;
  }

  Future<Object> logout() async {
    await storage.deleteAll();
    return "Logged out successfully!";
  }
}
