import 'dart:async';

String studentInstructor(instructors) {
  final List instructorNames = [];
  if (instructors.length > 0) {
    instructors.forEach((element) => instructorNames.add(element.full_name));
    return instructorNames.join(' and ');
  }
  return '';
}

Map dateHandler(String dateTime) {
  String hour = "";
  String minute = "";
  String ampm = "";
  int day;
  String weekDay = "";
  DateTime? dateTimeParsed;
  String completeDate = "";
  int monthInt;
  String month = "";
  String monthDay = "";
  bool passed = false;
  int differenceInDays = 0;
  String passedDays = "";

  dateTimeParsed = DateTime.tryParse(dateTime);

  if (dateTimeParsed != null) {
    dateTimeParsed = dateTimeParsed.add(dateTimeParsed.timeZoneOffset);
    if (dateTimeParsed.hour > 12) {
      hour = (dateTimeParsed.hour - 12).toString().padLeft(2, '0');
      ampm = "PM";
    } else {
      hour = dateTimeParsed.hour.toString().padLeft(2, '0');
      ampm = "AM";
    }

    minute = dateTimeParsed.minute.toString().padLeft(2, '0');
    day = dateTimeParsed.weekday;
    monthInt = dateTimeParsed.month;
    monthDay = dateTimeParsed.day.toString().padLeft(2, '0');

    differenceInDays = dateTimeParsed.difference(DateTime.now()).inDays;
    var completeDateDay;

    switch (day) {
      case 1:
        weekDay = "Mon";
        break;

      case 2:
        weekDay = "Tue";
        break;

      case 3:
        weekDay = "Wed";
        break;

      case 4:
        weekDay = "Thur";
        break;

      case 5:
        weekDay = "Fri";
        break;

      case 6:
        weekDay = "Sat";
        break;

      case 7:
        weekDay = "Sun";
        break;

      default:
        weekDay = "";
        break;
    }

    switch (monthInt) {
      case 1:
        month = "Jan";
        break;

      case 2:
        month = "Feb";
        break;

      case 3:
        month = "Mar";
        break;

      case 4:
        month = "Apr";
        break;

      case 5:
        month = "May";
        break;

      case 6:
        month = "Jun";
        break;

      case 7:
        month = "Jul";
        break;

      case 8:
        month = "Aug";
        break;

      case 9:
        month = "Sep";
        break;

      case 10:
        month = "Oct";
        break;

      case 11:
        month = "Nov";
        break;

      case 12:
        month = "Dec";
        break;

      default:
        month = "";
        break;
    }

    if (differenceInDays < 0) {
      passed = true;
      passedDays = '${(-differenceInDays).toString()} days ago';
    }

    if (differenceInDays == 0) {
      completeDateDay = "Today";
      passedDays = 'Today';
    } else if (differenceInDays == 1) {
      completeDateDay = "Tomorrow";
    } else if (differenceInDays < 7) {
      completeDateDay = weekDay;
    } else {
      completeDateDay = monthDay + " " + month;
    }

    completeDate = '$completeDateDay, $hour:$minute $ampm';
  }

  return {
    "hour": hour,
    "minute": minute,
    "ampm": ampm,
    "day": weekDay,
    "completeDate": completeDate,
    "month": month,
    "monthDay": monthDay,
    "passed": passed,
    "passedDays": passedDays,
  };
}

Map nameHandler(String fullName) {
  String firstName = "";
  String middleName = "";
  String lastName = "";

  if (fullName.length == 0) {
    return {
      "firstName": firstName,
      "middleName": middleName,
      "lastName": lastName,
    };
  }

  List nameList = fullName.split(" ");

  if (nameList.length > 2) {
    firstName = nameList[0];
    middleName = nameList[1];
    lastName = nameList[2];
  } else {
    firstName = nameList[0];
    lastName = nameList[1];
  }

  return {
    "firstName": firstName,
    "middleName": middleName,
    "lastName": lastName,
  };
}
