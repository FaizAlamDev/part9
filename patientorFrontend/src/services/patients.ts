import axios from "axios";
import { Entry, Patient, PatientFormValues, newEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatient = async (id: string | undefined) => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients/${id}`);
  return data[0];
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (object: newEntry, id: string | undefined) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getPatient,
  create,
  createEntry,
};
