import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/helpers/helper.dart';
import 'package:sikshyalaya/repository/personal.dart';
import 'package:sikshyalaya/repository/twoFALogin.dart';
import 'package:http/http.dart' as http;
import 'package:sikshyalaya/constants.dart';
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

part 'twoFALogin_state.dart';
part 'twoFALogin_event.dart';

class TwoFALoginBloc extends Bloc<TwoFALoginEvent, TwoFALoginState> {
  TwoFALoginBloc({required this.twoFARepository})
      : super(const TwoFALoginState()) {
    on<SendTwoFA>(_onSendTwoFA);
  }

  final TwoFALoginRepository twoFARepository;
  void _onSendTwoFA(SendTwoFA event, Emitter<TwoFALoginState> emit) async {
    final response = await sendTwoFA(totcode: event.totpCode, token: event.tempToken);
    const storage = FlutterSecureStorage();
    final decodedResponse = jsonDecode(response.body);

    // Two set cookie, temp sess expire is being used
    storage.write(
      key: "token",
      value: response.headers["set-cookie"]!.substring(96, 128),
    );

    storage.write(
      key: "user",
      value: jsonEncode(decodedResponse["user"]),
    );

    emit(state.copyWith(twoFASuccess: true));
  }

  Future<http.Response> sendTwoFA(
      {required String totcode, required String token}) async {
    final headers = {
      "cookie": "temp_session=$token",
      "Content-Type": "application/json"
    };
    final httpclient = http.Client();
    final response = await httpclient.post(
      Uri.parse('$backendBase/2fa/login/confirm'),
      headers: headers,
      body: jsonEncode(
        {"totp": totcode},
      ),
    );
    if (response.statusCode != 200) {
      throw Exception(response.body);
    }

    if (response.body.isNotEmpty) {
      return response;
    } else {
      throw Exception('Body Empty');
    }
  }
}
