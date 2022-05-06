import 'dart:convert';

import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart';
import 'package:sikshyalaya/constants.dart';
import 'package:sikshyalaya/repository/models/file.dart';

part 'resource_state.dart';
part 'resource_event.dart';

class ResourceBloc extends Bloc<ResourceEvent, ResourceState> {
  final httpClient = Client();
  final int? id;
  final String? token;
  ResourceBloc({required this.id, required this.token})
      : super(const ResourceState()) {
    on<GetResource>(_onGetResource);
    add(GetResource());
  }

  void _onGetResource(GetResource event, Emitter<ResourceState> emit) async {
    if (token != null) {
      final headers = {"Cookie": "session=$token"};
      final response = await httpClient
          .get(Uri.parse('$backendBase/class_session/$id/'), headers: headers);

      assert(response.statusCode == 200);

      List listFiles = [];
      List<File> listFileResources = [];
      if (response.body.isNotEmpty) {
        var decodedResponse = jsonDecode(response.body);
        listFiles = decodedResponse['files'];
        listFiles.forEach(
          (element) => {
            listFileResources.add(
              File.fromJson(element),
            ),
          },
        );
      } else {
        throw Exception('Body Empty');
      }

      emit(
        state.copyWith(
          resources: listFileResources,
          resourceFetch: true,
        ),
      );
    }
  }
}
