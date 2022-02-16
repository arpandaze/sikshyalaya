import { createContext } from "react";

export const UserContext = createContext({
  id: null,
  email: null,
  profile_image: null,
  full_name: null,
  address: null,
  group: {
    id: null,
    sem: null,
    program: { name: null, department_id: null, id: null },
    course: [
      {
        course_code: null,
        course_name: null,
        course_credit: null,
        department_id: null,
        id: null,
      },
    ],
  },
  contact_number: null,
  dob: null,
  join_year: null,
});
