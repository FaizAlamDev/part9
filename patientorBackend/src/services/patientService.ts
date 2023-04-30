import { v1 as uuid } from "uuid";
import patientData from "../data/patients";

import { NonSensitivePatient, Patient, newPatientEntry } from "../types";

const getEntries = (): Patient[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: newPatientEntry): Patient => {
  const id = uuid();

  const newPatient = {
    id,
    ...entry,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default { getEntries, getNonSensitiveEntries, addEntry };
