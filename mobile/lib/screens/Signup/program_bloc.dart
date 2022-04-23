import 'dart:convert';

import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;
import 'package:sikshyalaya/constants.dart';

part 'program_state.dart';
part 'program_event.dart';

class ProgramBloc extends Bloc<FetchEvent, ProgramState> {
  ProgramBloc() : super(const ProgramState()) {
    on<FetchEvent>(_onFetchEvent);

    add(FetchEvent());
  }

  void _onFetchEvent(FetchEvent event, Emitter<ProgramState> emit) async {
    final client = http.Client();

    final programsUri = Uri.parse("$backendBase/program/");
    final progResp = await client.get(programsUri);

    final groupsUri = Uri.parse("$backendBase/group/all/");
    final groupResp = await client.get(groupsUri);

    print(jsonDecode(progResp.body));

    emit(state.copyWith(
      program: jsonDecode(progResp.body) as List<dynamic>,
      group: jsonDecode(groupResp.body) as List<dynamic>,
    ));
  }
}
