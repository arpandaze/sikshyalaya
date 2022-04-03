import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';

class TopBar extends StatelessWidget {
  const TopBar({
    Key? key,
    required this.size,
  }) : super(key: key);

  final Size size;

  @override
  Widget build(BuildContext context) {
    return content(context);
  }

  Container content(BuildContext context) {
    final authBloc = BlocProvider.of<AuthBloc>(context);

    return Container(
      width: size.width,
      height: size.height * 0.10,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
            margin: EdgeInsets.fromLTRB(20, size.height * 0.025, 0, 0),
            child:
                Text('Dashboard', style: Theme.of(context).textTheme.headline4),
          ),
          Container(
            margin: EdgeInsets.fromLTRB(0, size.height * 0.012, 20, 0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Container(
                        child: Text(
                          'Hello, ${authBloc.state.user?["full_name"] ?? "User"}',
                          style: Theme.of(context).textTheme.subtitle1,
                        ),
                      ),
                      Container(
                        child: Text(
                          authBloc.state.getGroupString(),
                          style: Theme.of(context).textTheme.caption,
                          textAlign: TextAlign.right,
                        ),
                      )
                    ],
                  ),
                ),
                Container(
                  margin: const EdgeInsets.fromLTRB(8, 0, 0, 0),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(14), // Image border
                    child: SizedBox.fromSize(
                      size: const Size.fromRadius(30), // Image radius
                      child: Image.asset('assets/images/pp.jpg',
                          fit: BoxFit.cover),
                    ),
                  ),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
