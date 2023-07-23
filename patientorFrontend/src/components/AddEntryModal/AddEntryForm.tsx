import { SyntheticEvent, useState } from "react";
import { HealthCheckRating, newEntry } from "../../types";
import { Button, Grid, TextField, Typography } from "@mui/material";

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

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes,
      type: "HealthCheck",
    });
  };

  return (
    <div>
      <Typography variant="h5">New HealthCheck Entry</Typography>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={{ margin: "5px 0" }}
        />

        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          style={{ margin: "5px 0" }}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          style={{ margin: "5px 0" }}
        />

        <TextField
          label="Healthcheck Rating"
          fullWidth
          value={healthCheckRating || 0}
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
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
