import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Dashboard/student_dashboard.dart';
import 'package:sikshyalaya/screens/Login/login_screen.dart';
import 'package:sikshyalaya/screens/Welcome/welcome_screen.dart';
import 'package:sikshyalaya/screens/Signup/signup_screen.dart';
import 'package:sikshyalaya/constants.dart';

part 'nav_state.dart';
part 'nav_event.dart';

class NavBloc extends Bloc<NavChangeEvent, NavState> {
  NavBloc() : super(const NavState()) {
    on<NavChangeEvent>(_onNavChange);
  }

  void _onNavChange(NavChangeEvent event, Emitter<NavState> emit) {
    emit(state.copyWith(pindex: event.pindex, context: event.context));
  }
}
