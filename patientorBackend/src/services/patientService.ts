import { v1 as uuid } from "uuid";
import patientData from "../data/patients";

import {
  Entry,
  NonSensitivePatient,
  Patient,
  newEntry,
  newPatientEntry,
} from "../types";

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

const addPatientEntry = (entry: newPatientEntry): Patient => {
  const id = uuid();

  const newPatient = {
    id,
    ...entry,
  };

  patientData.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (entry: newEntry, patientId: string): Entry => {
  const id = uuid();

  const newEntry = {
    id,
    ...entry,
  };

  const patient = patientData.find((p) => p.id === patientId);

  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatientEntry,
  addEntryToPatient,
};
