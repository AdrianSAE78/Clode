import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const MenuForm = ({ title, options, stateHandler, state }) => {
  return (
    <FormControl variant="filled" sx={{ minWidth: 221 }}>
      <InputLabel id="demo-simple-select-filled-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={state}
        onChange={stateHandler}
      >
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MenuForm;
