part of 'auth_bloc.dart';

class AuthState extends Equatable {
  final bool loaded;
  final AuthStatus status;
  final String? token;
  final Map<String, dynamic>? user;

  static const storage = FlutterSecureStorage();

  const AuthState({
    this.status = AuthStatus.notLoaded,
    this.loaded = false,
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
    if (user != null) {
      if (status == AuthStatus.studentSession) {
        var group = user?["group"];
        var sem = numToRoman(group?["sem"] % 2);
        var year = numToRoman((group?["sem"] ~/ 2) + 1);

        return '${group?["program"]?["name"] ?? "Unknown"} $year/$sem';
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  static Future<AuthState> load() async {
    var storedUser = await storage.read(key: "user");
    var storedToken = await storage.read(key: "token");

    if (storedUser != null && storedToken != null) {
      var userMap = jsonDecode(storedUser);

      var authStatus = AuthStatus.anonSession;

      switch (userMap["user_type"]) {
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

      return AuthState(
        status: authStatus,
        user: userMap,
        token: storedToken,
        loaded: true,
      );
    }

    return const AuthState(
      status: AuthStatus.anonSession,
      loaded: true,
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
