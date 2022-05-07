import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sikshyalaya/helpers/helper.dart';
import 'package:sikshyalaya/repository/sessions.dart';

part 'sessions_state.dart';
part 'sessions_event.dart';

class SessionsBloc extends Bloc<SessionsEvent, SessionsState> {
  final int? userId;
  SessionsBloc({required this.sessionRepository, this.userId})
      : super(const SessionsState()) {
    on<GetSession>(_onGetSession);
    // on<LogOutSession>(_onLogOutSession);
    add(
      GetSession(),
    );
  }
  final SessionsRepository sessionRepository;
  void _onGetSession(GetSession event, Emitter<SessionsState> emit) async {
    final session = await sessionRepository.getSession();
    emit(
      state.copyWith(
        sessionList: session,
      ),
    );
  }

  // void _onEditPersonal(EditPersonal event, Emitter<PersonalState> emit) async {
  //   var fullname = event.firstname;
  //   if (event.middlename != "") {
  //     fullname += " ${event.middlename}";
  //   }
  //   fullname += " ${event.lastname}";

  //   var newPersonal = {
  //     "full_name": fullname,
  //     "address": event.address,
  //     "contact_number": event.contactNumber,
  //     "dob": event.dob,
  //   };
  //   var returnPersonal = await personalRepository.editPersonal(
  //     body: newPersonal,
  //   );
  //   emit(state.copyWith(
  //     // fullname: returnPersonal["fullname"],
  //     address: returnPersonal["address"],
  //     contactNumber: returnPersonal["contactNumber"],
  //     dob: returnPersonal["dob"],
  //   ));
  // }
}
