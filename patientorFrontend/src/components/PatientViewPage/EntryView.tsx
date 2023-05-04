import { useEffect, useState } from "react";
import diagnosisService from "../../services/diagnoses";
import { Diagnosis, Patient } from "../../types";
import { Card, Typography } from "@mui/material";
import EntryDetails from "./EntryDetails";

const EntryView = ({ patient }: { patient: Patient | undefined }) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const d = await diagnosisService.getAll();
      setDiagnosis(d);
    };

    void fetchDiagnosis();
  }, []);

  return (
    <>
      <Typography variant="h5">entries</Typography>
      {patient?.entries.map((entry) => {
        return (
          <Card
            key={entry.id}
            variant="outlined"
            style={{ margin: "10px 0", padding: "10px" }}
          >
            <EntryDetails entry={entry}>
              <div>
                <em>{entry.description}</em>
              </div>
              <ul>
                {entry.diagnosisCodes?.map((code) => (
                  <li key={code}>
                    {code}{" "}
                    {
                      diagnosis?.find((diagnose) => diagnose.code === code)
                        ?.name
                    }
                  </li>
                ))}
              </ul>
              diagnosed by {entry.specialist}
            </EntryDetails>
          </Card>
        );
      })}
    </>
  );
};

export default EntryView;
