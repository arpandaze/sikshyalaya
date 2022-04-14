part of 'nav_bloc.dart';

class NavState extends Equatable {
  final int? pindex;
  final Object? context;

  const NavState({this.pindex, this.context});

  NavState copyWith({
    int? pindex,
    Object? context,
  }) {
    return NavState(
      pindex: pindex ?? this.pindex,
      context: context ?? this.context,
    );
  }

  @override
  List<Object?> get props => [pindex, context];
}
