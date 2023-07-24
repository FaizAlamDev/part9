import {
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface Props {
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectInput = ({ diagnosisCodes, setDiagnosisCodes }: Props) => {
  const codes = [
    "M24.2",
    "M51.2",
    "S03.5",
    "J10.1",
    "J06.9",
    "Z57.1",
    "N30.0",
    "H54.7",
    "J03.0",
    "L60.1",
    "Z74.3",
    "L20",
    "F43.2",
    "S62.5",
    "H35.29",
  ];

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <div>
      <InputLabel>Diagnosis Codes</InputLabel>
      <Select
        fullWidth
        multiple
        value={diagnosisCodes}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        style={{ margin: "5px 0" }}
      >
        {codes.map((code) => (
          <MenuItem key={code} value={code}>
            <Checkbox checked={diagnosisCodes.indexOf(code) > -1} />
            <ListItemText primary={code} />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectInput;
