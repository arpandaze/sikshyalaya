import 'package:http/http.dart' as http;
import 'package:sikshyalaya/constants.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:convert';

class AuthenticationRepository {
  final client = http.Client();

  static const storage = FlutterSecureStorage();

  Future<Map<String, dynamic>?> login({
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

    var decodedResponse =
        jsonDecode(utf8.decode(response.bodyBytes)) as Map<String, dynamic>;

    if (decodedResponse["two_fa_required"] == true) {
      return {
        "temp-token": response.headers["set-cookie"]!.substring(13, 45),
        "two_fa_required": true
      };
    } else {
      storage.write(
        key: "token",
        value: response.headers["set-cookie"]!.substring(8, 40),
      );

      storage.write(
        key: "user",
        value: jsonEncode(decodedResponse["user"]),
      );
      return {"response": decodedResponse, "two_fa_required": false};
    }
  }

  Future<Object> refetchProfile() async {
    final url = Uri.parse('$backendBase/users/me/');

    final token = await storage.read(key: "token");
    final headers = {"Cookie": "session=$token"};

    var response = await http.get(url, headers: headers);

    if (response.statusCode != 200) {
      throw Exception("Profile refetch failed!");
    }

    var decodedResponse =
        jsonDecode(utf8.decode(response.bodyBytes)) as Map<String, dynamic>;

    storage.write(
      key: "user",
      value: jsonEncode(decodedResponse),
    );

    return decodedResponse;
  }

  Future<Object> logout() async {
    await storage.deleteAll();
    return "Logged out successfully!";
  }
}
