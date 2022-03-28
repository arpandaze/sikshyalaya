part of 'route_bloc.dart';

class RouteState extends Equatable {
  final Widget page;
  final Object? context;

  const RouteState({this.page = const WelcomeScreen(), this.context});

  RouteState copyWith({
    Widget? page,
    Object? context,
  }) {
    return RouteState(
      page: page ?? this.page,
      context: context ?? this.context,
    );
  }

  @override
  List<Object?> get props => [page, context];
}
