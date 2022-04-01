import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/material.dart';
import 'package:sikshyalaya/screens/Login/login_screen.dart';
import 'package:sikshyalaya/screens/Welcome/welcome_screen.dart';
import 'package:sikshyalaya/screens/Signup/signup_screen.dart';
import 'package:sikshyalaya/constants.dart';


part 'route_event.dart';
part 'route_state.dart';


class RouteBloc extends Bloc<RouteChangeEvent, RouteState> {
  RouteBloc() : super(const RouteState()) {
    on<RouteChangeEvent>(_onRouteChange);
  }

  void _onRouteChange(RouteChangeEvent event, Emitter<RouteState> emit) {
    emit(state.copyWith(page: event.page, context: event.context));
  }

}

/* class RouteBloc extends Bloc<RouteEvent, RouteState> { */
/*   RouteBloc() : super(RouteState()) { */
/*     on<Home>(_onHome); */
/*     on<Login>(_onLogin); */
/*     on<Signup>(_onSignup); */
/*     on<ForgotPassword>(_onForgotPassword); */
/*     on<ResetPassword>(_onResetPassword); */
/*   } */
/**/
/*   void _onHome(Home event, Emitter<RouteState> emit) { */
/*     emit(state.copyWith(page: const LoginScreen(), context: event.context)); */
/*   } */
/**/
/*   void _onLogin(Login event, Emitter<RouteState> emit) { */
/*     emit(state.copyWith(page: const WelcomeScreen(), context: event.context)); */
/*   } */
/**/
/*   void _onSignup(Signup event, Emitter<RouteState> emit) { */
/*     emit(state.copyWith(page: const SignupScreen(), context: event.context)); */
/*   } */
/**/
/*   void _onForgotPassword(ForgotPassword event, Emitter<RouteState> emit) { */
/*     emit(state.copyWith(page: const WelcomeScreen(), context: event.context)); */
/*   } */
/**/
/*   void _onResetPassword(ResetPassword event, Emitter<RouteState> emit) { */
/*     emit(state.copyWith(page: const WelcomeScreen(), context: event.context)); */
/*   } */
/* } */
