import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

AppTheme currentTheme = AppTheme();

class AppTheme with ChangeNotifier {
  static bool _isDarkTheme = false;
  ThemeMode get currentTheme => _isDarkTheme ? ThemeMode.dark : ThemeMode.light;

  void toggleTheme() {
    _isDarkTheme = !_isDarkTheme;
    notifyListeners();
  }

  static ThemeData get lightTheme {
    return ThemeData(
      colorScheme: const ColorScheme(
          brightness: Brightness.light,
          primary: Color(0xFFF14B4B),
          onPrimary: Color(0xFFFFFFFF),
          secondary: Color(0xFF363636),
          onSecondary: Color(0xFFFFFFFF),
          error: Color(0xFFFFCE37),
          onError: Color(0xFFFFFFFF),
          background: Color(0xFFFFFFFF),
          onBackground: Color(0xFF000000),
          surface: Color(0xFFA0A6AC),
          onSurface: Color(0xFF000000)),
      textTheme: TextTheme(
        headline1: GoogleFonts.roboto(
            fontSize: 97, fontWeight: FontWeight.w300, letterSpacing: -1.5),
        headline2: GoogleFonts.roboto(
            fontSize: 61, fontWeight: FontWeight.w300, letterSpacing: -0.5),
        headline3:
            GoogleFonts.roboto(fontSize: 48, fontWeight: FontWeight.w400),
        headline4: GoogleFonts.roboto(
            fontSize: 34, fontWeight: FontWeight.w400, letterSpacing: 0.25),
        headline5:
            GoogleFonts.roboto(fontSize: 24, fontWeight: FontWeight.w400),
        headline6: GoogleFonts.roboto(
            fontSize: 20, fontWeight: FontWeight.w500, letterSpacing: 0.15),
        subtitle1: GoogleFonts.roboto(
            fontSize: 18, fontWeight: FontWeight.w400, letterSpacing: 0.15),
        subtitle2: GoogleFonts.roboto(
            fontSize: 14, fontWeight: FontWeight.w500, letterSpacing: 0.1),
        bodyText1: GoogleFonts.roboto(
            fontSize: 16, fontWeight: FontWeight.w400, letterSpacing: 0.5),
        bodyText2: GoogleFonts.roboto(
            fontSize: 14, fontWeight: FontWeight.w400, letterSpacing: 0.25),
        button: GoogleFonts.roboto(
            fontSize: 14, fontWeight: FontWeight.w500, letterSpacing: 1.25),
        caption: GoogleFonts.roboto(
            fontSize: 12, fontWeight: FontWeight.w400, letterSpacing: 0.4),
        overline: GoogleFonts.roboto(
            fontSize: 10, fontWeight: FontWeight.w400, letterSpacing: 1.5),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData();
  }
}
