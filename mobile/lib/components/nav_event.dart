part of 'nav_bloc.dart';

class NavChangeEvent extends Equatable {
  final Widget page;
  final int? pindex;
  final Object? context;

  const NavChangeEvent({required this.page, this.pindex, this.context});

  @override
  List<Object?> get props => [context, pindex, page];
}
