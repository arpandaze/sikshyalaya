import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'option.g.dart';

@JsonSerializable()
class Option extends Equatable {
  final String? image;
  final String? text;

  const Option({
    this.image,
    this.text,
  });

  static const empty = Option(
    image: null,
    text: null,
  );

  factory Option.fromJson(Map<String, dynamic> json) => _$OptionFromJson(json);

  @override
  List<Object?> get props => [text, image];
}
