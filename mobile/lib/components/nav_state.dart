part of 'nav_bloc.dart';

class NavState extends Equatable {
  final Widget page;
  final int? pindex;
  final Object? context;

  const NavState(
      {this.page = const StudentDashboard(), this.pindex, this.context});

  NavState copyWith({
    Widget? page,
    int? pindex,
    Object? context,
  }) {
    return NavState(
      page: page ?? this.page,
      pindex: pindex ?? this.pindex,
      context: context ?? this.context,
    );
  }

  @override
  List<Object?> get props => [page, pindex, context];
}
