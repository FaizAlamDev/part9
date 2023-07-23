import { Button, Container, Typography } from "@mui/material";
import { Patient, newEntry } from "../../types";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryView from "./EntryView";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";

const PatientView = ({ id }: { id: string | undefined }) => {
  const [patient, setPatient] = useState<Patient>();
  const [refresh, setRefresh] = useState(false);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      const p = await patientService.getPatient(id);
      setPatient(p);
    };

    void fetchPatient();
  }, [refresh, id]);

  const submitNewEntry = async (values: newEntry) => {
    try {
      const entry = await patientService.createEntry(values, patient?.id);
      patient?.entries.concat(entry);
      setModalOpen(false);
      setRefresh(!refresh);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />

      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>

      <EntryView patient={patient} />
    </Container>
  );
};

export default PatientView;
