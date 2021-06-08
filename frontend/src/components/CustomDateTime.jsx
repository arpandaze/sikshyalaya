import React, { useState } from "react";
import { Field } from "formik";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDateTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";

const DatePicker = ({ id, label, ...rest }) => {
	return (
		<Field name={id} {...rest}>
			{({ field, form: { setFieldValue } }) => (
				<>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							{...field}
							margin="normal"
							id={id}
							label={label}
							inputVariant="outlined"
							format="MM/dd/yyyy"
							value={field.value}
							onChange={(value) => setFieldValue(id, value)}
							KeyboardButtonProps={{
								"aria-label": "change time",
							}}
							{...rest}
						/>
					</MuiPickersUtilsProvider>
				</>
			)}
		</Field>
	);
};
export default DatePicker;
