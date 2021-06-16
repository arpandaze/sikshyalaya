import { Field } from "formik";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import colorscheme from "../utils/colors";

const CustomCheckbox = ({ id, name, label, className }) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                id={id}
                checked={field.value}
                name={label}
                className={className}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
                {...field}
              />
            }
            label={label}
          />
        );
      }}
    </Field>
  );
};

export default CustomCheckbox;
