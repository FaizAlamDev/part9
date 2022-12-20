/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientData from "../../data/patients";

import { Patient, NonSensitivePatient, newPatient } from "../types";

import { v1 as uuid } from "uuid";

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

const addPatient = (data: newPatient): Patient => {
	const id = uuid();
	const newPatientData = {
		id,
		...data,
	};
	patientData.push(newPatientData);
	return newPatientData;
};

export default {
	getEntries,
	getNonSensitiveEntries,
	addPatient,
};
