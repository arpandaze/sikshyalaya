part of 'route_bloc.dart';

class RouteChangeEvent extends Equatable {
  final Widget page;
  final Object? context;

  const RouteChangeEvent({required this.page, this.context});

  @override
  List<Object?> get props => [context, page];
}

/* class HomeRouteEvent extends RouteEvent { */
/*   HomeRouteEvent(String? context) : super(context); */
/* } */
/**/
/* class LoginRouteEvent extends RouteEvent { */
/*   LoginRouteEvent(String? context) : super(context); */
/* } */
/**/
/* class SignupRouteEvent extends RouteEvent { */
/*   SignupRouteEvent(String? context) : super(context); */
/* } */
/**/
/* class ForgotPasswordRouteEvent extends RouteEvent { */
/*   ForgotPasswordRouteEvent(String? context) : super(context); */
/* } */
/**/
/* class ResetPasswordRouteEvent extends RouteEvent { */
/*   ResetPasswordRouteEvent(String? context) : super(context); */
/* } */
