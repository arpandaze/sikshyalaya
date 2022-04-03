part of 'auth_bloc.dart';

class AuthState extends Equatable {
  final AuthStatus status;
  final String? token;
  final Map<String, dynamic>? user;

  static const storage = FlutterSecureStorage();

  const AuthState({
    this.status = AuthStatus.anonSession,
    this.token,
    this.user,
  });

  String numToRoman(digit) {
    switch (digit) {
      case 1:
        return "I";

      case 2:
        return "II";

      case 3:
        return "III";

      case 4:
        return "IV";

      case 5:
        return "V";

      default:
        return "";
    }
  }

  String getGroupString() {
    final group = user?["group"];
    final sem = numToRoman(group?["sem"] % 2);
    final year = numToRoman((group?["sem"] ~/ 2) + 1);

    return '${group?["program"]?["name"] ?? "Unknown"} $year/$sem';
  }

  static Future<AuthState> load() async {
    var optionalUser = jsonDecode((await storage.read(key: "user"))!);
    var optionalToken = await storage.read(key: "token");

    var authStatus = AuthStatus.anonSession;

    if (optionalUser != null && optionalToken != null) {
      switch (optionalUser["user_type"]) {
        case 4:
          {
            authStatus = AuthStatus.studentSession;
          }
          break;

        case 3:
          {
            authStatus = AuthStatus.teacherSession;
          }
          break;
      }
    }

    return AuthState(
      status: authStatus,
      user: optionalUser,
      token: optionalToken,
    );
  }

  AuthState copyWith({
    AuthStatus? status,
    String? token,
    Map<String, dynamic>? user,
  }) {
    return AuthState(
      status: status ?? this.status,
      token: token ?? this.token,
      user: user ?? this.user,
    );
  }

  @override
  List<Object?> get props => [status, token, user];
}
