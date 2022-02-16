import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Students from "./Student";
import useAPI from "../../../utils/useAPI";
const validationSchema = yup.object({
  full_name: yup.string("Enter your name").required("Name is required"),
  address: yup.string("Enter your address").required("Address is required"),
  join_year: yup.number("Enter Joined Year").required("Join year is required"),
  dob: yup.string("Enter Date of Birth").required("Date of Birth is required"),
  phone_number: yup.number().typeError("Not a valid phone number"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email!")
    .required("Email is required"),
  semester: yup.number().required("Semester is required"),
  program: yup.number().required("Program is required"),
});
const StudentPagination = ({
  fetchEndpoint,
  formatter,
  search,
  setSelectedUser,
  setEdit,
  setEditState,
  setPopUp,
  ...rest
}) => {
  const defaultValues = [];
  const [filteredData, setFilteredData] = useState([]);
  const [data, dataComplete] = useAPI(
    { endpoint: fetchEndpoint },
    formatter,
    defaultValues
  );
  const programFormatter = (value) =>
    value.data.map((item) => ({
      name: item.name,
      value: item.id,
    }));

  const [program] = useAPI({ endpoint: "/api/v1/program/" }, programFormatter);

  useEffect(() => {
    if (search != "" && dataComplete && data) {
      let temp = [...data];
      let filtered = temp.filter((element) => {
        return (
          element.name.toLowerCase().search(search.toLowerCase()) !== -1 ||
          program
            .filter((e) => e.value === element.program)[0]
            .name.toLowerCase()
            .search(search.toLowerCase()) !== -1
        );
      });
      temp = [];
      setFilteredData([...filtered]);
    } else {
      setFilteredData([]);
    }
  }, [search, data]);
  return (
    <Grid container direction="row">
      {filteredData.map((data) => (
        <Grid xs={6} item key={data.id}>
          <Students
            key={data.id}
            name={data.name}
            onView={() => {
              setEditState(true);
              setPopUp(true);
              setSelectedUser(data);
            }}
            onEdit={() => {
              setEditState(true);
              setPopUp(true);
              setEdit(true);
              setSelectedUser(data);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StudentPagination;
