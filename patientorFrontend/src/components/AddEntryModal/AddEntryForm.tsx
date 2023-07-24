import { SyntheticEvent, useState } from "react";
import { HealthCheckRating, newEntry } from "../../types";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

interface Props {
  onCancel: () => void;
  onSubmit: (values: newEntry) => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);

  type t = "Hospital" | "OccupationalHealthcare" | "HealthCheck";
  const [type, setType] = useState<t>("HealthCheck");

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    let entry: Record<string, unknown> = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };
    if (type === "HealthCheck") {
      entry["type"] = "HealthCheck";
      entry["healthCheckRating"] = healthCheckRating;
      onSubmit(entry as newEntry);
    } else if (type === "Hospital") {
      entry["discharge"] = {
        date: dischargeDate,
        criteria: dischargeCriteria,
      };
      entry["type"] = "Hospital";
      onSubmit(entry as newEntry);
    } else {
      entry["employerName"] = employerName;
      entry["sickLeave"] = { startDate, endDate };
      entry["type"] = "OccupationalHealthcare";
      onSubmit(entry as newEntry);
    }
  };

  return (
    <div>
      <Typography variant="h5">New Entry</Typography>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 10 }}>*Entry Type</InputLabel>
        <Select
          label="EntryType"
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value as t)}
        >
          <MenuItem key="HealthCheck" value="HealthCheck">
            HealthCheck
          </MenuItem>
          <MenuItem key="Hospital" value="Hospital">
            Hospital
          </MenuItem>
          <MenuItem key="OccupationalHealthcare" value="OccupationalHealthcare">
            OccupationalHealthcare
          </MenuItem>
        </Select>
        <TextField
          label="*Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={{ margin: "5px 0" }}
        />

        <TextField
          label="*Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          style={{ margin: "5px 0" }}
        />
        <TextField
          label="*Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          style={{ margin: "5px 0" }}
        />

        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) =>
            setDiagnosisCodes(target.value.replace(/\s/g, "").split(","))
          }
          style={{ margin: "5px 0" }}
        />

        {type === "HealthCheck" ? (
          <TextField
            label="*Healthcheck Rating"
            fullWidth
            value={healthCheckRating || 0}
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value))
            }
            style={{ margin: "5px 0" }}
          />
        ) : type === "Hospital" ? (
          <>
            <TextField
              label="*Discharge Date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              style={{ margin: "5px 0" }}
            />
            <TextField
              label="*Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              style={{ margin: "5px 0" }}
            />
          </>
        ) : type === "OccupationalHealthcare" ? (
          <>
            <TextField
              label="*Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              style={{ margin: "5px 0" }}
            />
            <TextField
              label="Sick Leave From Date"
              fullWidth
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
              style={{ margin: "5px 0" }}
            />
            <TextField
              label="Sick Leave Till Date"
              fullWidth
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
              style={{ margin: "5px 0" }}
            />
          </>
        ) : null}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{ float: "left", margin: "0 5px" }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
