part of 'nav_bloc.dart';

class NavChangeEvent extends Equatable {
  final Widget page;
  final Object? context;

  const NavChangeEvent({required this.page, this.context});

  @override
  List<Object?> get props => [context, page];
}
