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
          surface: Color(0xFFEEEDED),
          onSurface: Color(0xFF000000)),
      textTheme: TextTheme(
        headline1: GoogleFonts.openSans(
            fontSize: 97, fontWeight: FontWeight.w300, letterSpacing: -1.5),
        headline2: GoogleFonts.openSans(
            fontSize: 61, fontWeight: FontWeight.w300, letterSpacing: -0.5),
        headline3: GoogleFonts.openSans(
            fontSize: 48,
            fontWeight: FontWeight.w400,
            color: const Color(0xFF000000)),
        headline4: GoogleFonts.openSans(
          fontSize: 34,
          fontWeight: FontWeight.w400,
          color: const Color(0xFF000000),
          letterSpacing: 0.25,
        ),
        headline5: GoogleFonts.openSans(
          fontSize: 22,
          fontWeight: FontWeight.w600,
          color: const Color(0xFF000000),
        ),
        headline6: GoogleFonts.openSans(
            fontSize: 12,
            fontWeight: FontWeight.w400,
            letterSpacing: 0.9,
            color: const Color(0xFF000000),
            height: 2),
        subtitle1: GoogleFonts.openSans(
            fontSize: 18,
            fontWeight: FontWeight.w400,
            letterSpacing: 0.15,
            color: const Color(0xFFF14B4B)),
        subtitle2: GoogleFonts.openSans(
            fontSize: 12,
            fontWeight: FontWeight.w500,
            letterSpacing: 0.1,
            color: const Color(0xFFF14B4B)),
        bodyText1: GoogleFonts.openSans(
            fontSize: 16,
            fontWeight: FontWeight.w400,
            letterSpacing: 0.8,
            color: const Color(0xFFA0A6AC),
            height: 1.8),
        bodyText2: GoogleFonts.openSans(
            fontSize: 15,
            fontWeight: FontWeight.w400,
            letterSpacing: 0.9,
            color: const Color(0xFFA0A6AC),
            height: 2),
        button: GoogleFonts.openSans(
            fontSize: 14, fontWeight: FontWeight.w500, letterSpacing: 1.25),
        caption: GoogleFonts.openSans(
            fontSize: 12, fontWeight: FontWeight.w400, letterSpacing: 0.4),
        overline: GoogleFonts.openSans(
            fontSize: 10, fontWeight: FontWeight.w400, letterSpacing: 1.5),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData();
  }
}
