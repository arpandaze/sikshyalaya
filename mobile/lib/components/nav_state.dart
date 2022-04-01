part of 'nav_bloc.dart';

class NavState extends Equatable {
  final Widget page;
  final Object? context;

  const NavState({this.page = const StudentDashboard(), this.context});

  NavState copyWith({
    Widget? page,
    Object? context,
  }) {
    return NavState(
      page: page ?? this.page,
      context: context ?? this.context,
    );
  }

  @override
  List<Object?> get props => [page, context];
}
