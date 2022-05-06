import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/components/CustomFilledButton.dart';
import 'package:sikshyalaya/components/not_available.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/global/authentication/auth_bloc.dart';
import 'package:sikshyalaya/repository/models/file.dart';
import 'package:sikshyalaya/screens/Dashboard/resource_bloc.dart';
import 'package:url_launcher/url_launcher.dart';

class ResourceViewer extends StatelessWidget {
  final String? title;
  final String? description;
  final String? instructors;
  final String? courseCode;
  final int? classid;

  const ResourceViewer({
    required this.title,
    required this.description,
    required this.instructors,
    required this.courseCode,
    required this.classid,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocProvider(
      create: (context) => ResourceBloc(
          id: classid, token: context.read<AuthBloc>().state.token),
      child: body(size, context),
    );
  }

  Widget body(Size size, BuildContext context) {
    return BlocBuilder<ResourceBloc, ResourceState>(
      buildWhen: (previous, current) => previous != current,
      builder: (context, state) {
        return SafeArea(
          top: true,
          bottom: true,
          child: Scaffold(
            body: Stack(
              alignment: Alignment.center,
              children: <Widget>[
                ListView(
                  shrinkWrap: true,
                  padding: EdgeInsets.fromLTRB(10, size.width * 0.17, 10, 10),
                  children: <Widget>[
                    Container(
                      padding: EdgeInsets.fromLTRB(20, 20, 20, 20),
                      decoration: BoxDecoration(
                        color: Theme.of(context).colorScheme.primary,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Container(
                            padding: EdgeInsets.fromLTRB(0, 0, 10, 0),
                            width: size.width * 0.9,
                            child: Text(
                              '$courseCode',
                              style: Theme.of(context).textTheme.headline3,
                            ),
                          ),
                          Container(
                            padding: EdgeInsets.fromLTRB(0, 10, 10, 0),
                            width: size.width * 0.9,
                            child: Text(
                              '$title',
                              style: Theme.of(context).textTheme.headline4,
                            ),
                          ),
                          Container(
                            padding: EdgeInsets.fromLTRB(0, 10, 10, 0),
                            width: size.width * 0.9,
                            child: Text(
                              '$description',
                              style: Theme.of(context).textTheme.headline6,
                            ),
                          ),
                          Container(
                            padding: EdgeInsets.fromLTRB(0, 10, 10, 0),
                            width: size.width * 0.9,
                            child: Text(
                              '$instructors',
                              textAlign: TextAlign.right,
                              style: Theme.of(context).textTheme.subtitle1,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.fromLTRB(20, 10, 20, 10),
                    ),
                    state.resourceFetch == true
                        ? Container(
                            alignment: Alignment.center,
                            child: state.resources == null ||
                                    state.resources!.length < 1 ||
                                    state.resources![0] == List.empty
                                ? NotAvailable(
                                    size: size,
                                    text: "No Resources / Files Available",
                                    large: true)
                                : Column(
                                    children: [
                                      Container(
                                          alignment: Alignment.centerLeft,
                                          padding: EdgeInsets.fromLTRB(
                                              10, 10, 10, 10),
                                          child: Text(
                                            "Resources",
                                            style: Theme.of(context)
                                                .textTheme
                                                .headline6,
                                          )),
                                      ListView.builder(
                                        physics: NeverScrollableScrollPhysics(),
                                        shrinkWrap: true,
                                        itemCount: state.resources != null
                                            ? state.resources!.length
                                            : 0,
                                        itemBuilder:
                                            (BuildContext context, int index) {
                                          return Column(
                                            children: <Widget>[
                                              Container(
                                                padding: EdgeInsets.fromLTRB(
                                                    20, 20, 20, 20),
                                                alignment: Alignment.centerLeft,
                                                // padding: EdgeInsets.fromLTRB(
                                                //     0, 10, 10, 0),
                                                child: InkWell(
                                                  onTap: () => _launchUrl(
                                                      '$fileServerBase/${state.resources![index].path}/${state.resources![index].name}'),
                                                  child: Text(
                                                    '${index + 1}. ${state.resources![index].name}',
                                                    style: Theme.of(context)
                                                        .textTheme
                                                        .subtitle1,
                                                  ),
                                                ),
                                                // child: Text(
                                                //     "${state.resources![0].name} Files Available",
                                                //     style: Theme.of(context)
                                                //         .textTheme
                                                //         .headline5),
                                              ),
                                              Divider(
                                                color: Theme.of(context)
                                                    .colorScheme
                                                    .onSurface
                                                    .withOpacity(0.2),
                                              ),
                                            ],
                                          );
                                        },
                                      ),
                                    ],
                                  ),
                          )
                        : Container(
                            height: size.height * 0.6,
                            width: size.width * 0.9,
                            alignment: Alignment.center,
                            child: CircularProgressIndicator(
                              color: Theme.of(context).colorScheme.primary,
                            ),
                          ),
                  ],
                ),
                Positioned(
                  top: size.height * 0.02,
                  right: 10,
                  child: GestureDetector(
                    onTap: () => {
                      Navigator.pop(context),
                    },
                    child: SizedBox(
                      child: Icon(
                        Icons.close,
                        color: Theme.of(context).colorScheme.primary,
                        size: 30,
                      ),
                    ),
                  ),
                )
              ],
            ),
          ),
        );
      },
    );
  }

  _launchUrl(String url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }
}
