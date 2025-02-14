import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

export default function TimeInput({placeholder, value, onChange}) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={placeholder}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
        minTime={dayjs().hour(6).minute(59)}
        maxTime={dayjs().hour(19).minute(0)}
        ampm={false}
      />
    </LocalizationProvider>
  );
}