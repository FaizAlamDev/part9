import { Container, Typography } from "@mui/material";
import { Patient } from "../types";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientView = ({ id }: { id: string | undefined }) => {
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      const p = await patientService.getPatient(id);
      setPatient(p);
    };

    void fetchPatient();
  }, [id]);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: "20px 0" }}>
        {patient?.name}{" "}
        {patient?.gender === "male" ? (
          <MaleIcon />
        ) : patient?.gender === "female" ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </Typography>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
    </Container>
  );
};

export default PatientView;
