import 'package:flutter/material.dart';
import 'package:sikshyalaya/components/CustomFilledButton.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:url_launcher/url_launcher.dart';

class AssignmentSubmission extends StatelessWidget {
  final String? title;
  final String? dueDate;
  final String? contents;
  final List<String>? files;

  const AssignmentSubmission({
    required this.title,
    required this.dueDate,
    required this.contents,
    required this.files,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    print(files);
    Size size = MediaQuery.of(context).size;
    return SafeArea(
      top: true,
      bottom: true,
      child: Scaffold(
        body: Stack(
          alignment: Alignment.center,
          children: <Widget>[
            ListView(
              padding: EdgeInsets.fromLTRB(0, size.width * 0.10, 0, 0),
              scrollDirection: Axis.vertical,
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Container(
                      width: size.width * 0.8,
                      alignment: Alignment.topLeft,
                      padding: const EdgeInsets.fromLTRB(20, 20, 0, 20),
                      child: Text(title!,
                          style: Theme.of(context).textTheme.headline5),
                    ),
                    Container(
                      width: size.width * 0.14,
                    )
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(25),
                          color: Theme.of(context).colorScheme.surface),
                      width: size.width * 0.89,
                      margin: const EdgeInsets.fromLTRB(20, 0, 20, 0),
                      alignment: Alignment.topLeft,
                      padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
                      child: Column(
                        children: <Widget>[
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text("Due, ${dueDate!}",
                                  style: Theme.of(context).textTheme.subtitle2),
                              Text(
                                "Assigned",
                                style: Theme.of(context).textTheme.subtitle2,
                              )
                            ],
                          ),
                          Container(
                              margin: const EdgeInsets.fromLTRB(0, 30, 0, 20),
                              child: Text(
                                contents!,
                                style: Theme.of(context).textTheme.bodyText1,
                              )),
                          Container(
                            // decoration: BoxDecoration(
                            //     border: Border.all(color: Colors.black)),
                            padding: EdgeInsets.symmetric(
                                vertical: 10, horizontal: 0),
                            child: (ListView.builder(
                              physics: const NeverScrollableScrollPhysics(),
                              padding:
                                  const EdgeInsets.fromLTRB(20, 10, 20, 10),
                              shrinkWrap: true,
                              itemCount: files == null ? 0 : files!.length,
                              itemBuilder: (BuildContext context, int index) {
                                return Container(
                                  padding: EdgeInsets.fromLTRB(5, 10, 5, 10),
                                  child: files == null && files!.length == 0
                                      ? null
                                      : InkWell(
                                          onTap: () => _launchUrl(
                                              '$fileServerBase/${files![index]}'),
                                          child: Text(
                                            '${index + 1}. ${files![index].split("/").last}',
                                            style: (Theme.of(context)
                                                    .textTheme
                                                    .subtitle1)!
                                                .merge(TextStyle(
                                                    color: Theme.of(context)
                                                        .colorScheme
                                                        .primary)),
                                          ),
                                        ),
                                );
                              },
                            )),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: size.width * 0.89,
                      margin: const EdgeInsets.fromLTRB(20, 20, 20, 0),
                      padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: const Color(0xFFB4B4B4)),
                      ),
                      child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Container(
                              padding: const EdgeInsets.fromLTRB(0, 20, 0, 20),
                              child: Text('Your Work',
                                  style: Theme.of(context).textTheme.headline5),
                            ),
                            Container(
                              margin: const EdgeInsets.fromLTRB(70, 0, 70, 0),
                              width: size.width * 0.5,
                              child: const CustomFilledButton(
                                colorType: Colors.black,
                                textColor: Colors.white,
                                buttonText: "Upload File(s)",
                              ),
                            ),
                          ]),
                    ),
                  ],
                )
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
  }

  _launchUrl(String url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }
}
