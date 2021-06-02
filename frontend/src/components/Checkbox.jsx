import { Field } from "formik";

const Checkbox = ({ id, name, className }) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <input
            type="checkbox"
            id={id}
            className={className}
            checked={field.value}
            {...field}
          />
        );
      }}
    </Field>
  );
};

export default Checkbox;
