import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/screens/Login/components/CustomTextField.dart';

class Message extends StatefulWidget {
  final String message;
  final bool isMe;
  final String senderName;
  final String time;
  final String? senderImage;
  const Message({
    Key? key,
    required this.message,
    required this.senderImage,
    required this.time,
    required this.senderName,
    required this.isMe,
  }) : super(key: key);

  @override
  State<Message> createState() => _MessageState();
}

class _MessageState extends State<Message> {
  bool _isVisible = false;

  void changeVisible() {
    setState(() {
      _isVisible = !_isVisible;
    });
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      alignment: widget.isMe ? Alignment.centerRight : Alignment.centerLeft,
      margin: const EdgeInsets.symmetric(
        vertical: 10,
      ),
      child: Row(
        mainAxisAlignment:
            widget.isMe ? MainAxisAlignment.end : MainAxisAlignment.start,
        children: widget.isMe
            ? [
                SizedBox(
                  width: size.width * 0.8,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Visibility(
                        visible: _isVisible,
                        child: Container(
                          margin: const EdgeInsets.fromLTRB(8, 0, 0, 0),
                          child: Text(widget.time),
                        ),
                      ),
                      Row(
                        children: [
                          GestureDetector(
                            onTap: (() => changeVisible()),
                            child: Container(
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(15),
                                color: const Color.fromARGB(255, 226, 95, 95),
                                // border: Border.all(color: Colors.black),
                              ),
                              padding: const EdgeInsets.all(10),
                              constraints: BoxConstraints(
                                  minWidth: size.width * 0.05,
                                  maxWidth: size.width * 0.6),
                              child: Text(
                                widget.message,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w500,
                                  fontSize: 13,
                                  fontFamily: 'OpenSans',
                                ),
                              ),
                            ),
                          ),
                          Container(
                            margin: const EdgeInsets.fromLTRB(8, 0, 0, 0),
                            child: ClipRRect(
                              borderRadius:
                                  BorderRadius.circular(80), // Image border
                              child: SizedBox.fromSize(
                                size: const Size.fromRadius(18), // Image radius
                                /* child: Image.asset(widget.senderImage), */
                                child: getProfileImage(widget.senderImage),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ]
            : [
                SizedBox(
                  width: size.width * 0.8,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Container(
                            child: ClipRRect(
                              borderRadius:
                                  BorderRadius.circular(50), // Image border
                              child: SizedBox.fromSize(
                                size: const Size.fromRadius(18), // Image radius
                                child: getProfileImage(widget.senderImage),
                              ),
                            ),
                          ),
                          GestureDetector(
                            onTap: (() => changeVisible()),
                            child: Container(
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(15),
                                color: const Color.fromARGB(255, 88, 88, 88),
                                // border: Border.all(color: Colors.black),
                              ),
                              padding: const EdgeInsets.all(10),
                              margin: const EdgeInsets.fromLTRB(8, 0, 0, 0),
                              constraints: BoxConstraints(
                                  minWidth: size.width * 0.05,
                                  maxWidth: size.width * 0.6),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    widget.senderName,
                                    style: const TextStyle(
                                      color: Color.fromARGB(255, 155, 155, 155),
                                      fontWeight: FontWeight.w600,
                                      fontSize: 10,
                                      fontFamily: 'OpenSans',
                                    ),
                                  ),
                                  Text(
                                    widget.message,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.w600,
                                      fontSize: 13,
                                      fontFamily: 'OpenSans',
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      Visibility(
                        visible: _isVisible,
                        child: Container(
                          margin: const EdgeInsets.fromLTRB(8, 0, 0, 0),
                          child: Text(widget.time),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
      ),
    );
  }

  Widget getProfileImage(String? profilePath) {
    if (profilePath != null) {
      return CachedNetworkImage(
        imageUrl: '$fileServerBase/$profilePath',
        imageBuilder: (context, imageProvider) => Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: imageProvider,
              fit: BoxFit.contain,
            ),
          ),
        ),
        placeholder: (context, url) => const CircularProgressIndicator(),
        errorWidget: (context, url, error) => const Icon(Icons.error),
      );
    } else {
      return SvgPicture.asset(
        "assets/images/defaultProfile.svg",
        fit: BoxFit.cover,
      );
    }
  }
}
