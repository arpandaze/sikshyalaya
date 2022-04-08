import 'package:json_annotation/json_annotation.dart';

part 'content.g.dart';

@JsonSerializable()
class Content {
  final Map? attributes;
  final String? insert;

  const Content({
    this.attributes,
    this.insert,
  });

  static const empty = Content(
    attributes: {},
    insert: '',
  );

  factory Content.fromJson(Map<String, dynamic> json) =>
      _$ContentFromJson(json);

  @override
  List<Object?> get props => [attributes, insert];
}
