part of 'nav_bloc.dart';

class NavChangeEvent extends Equatable {
  final int? pindex;
  final Object? context;

  const NavChangeEvent({this.pindex, this.context});

  @override
  List<Object?> get props => [context, pindex];
}
