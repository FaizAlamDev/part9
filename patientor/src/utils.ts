import { newPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error("Incorrect or missing name");
	}
	return name;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error("Incorrect or missing dateOfBirth");
	}
	return date;
};

const parseSSN = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error("Incorrect or missing SSN");
	}
	return ssn;
};

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error("Incorrect or missing occupation");
	}
	return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error("Incorrect or missing gender");
	}
	return gender;
};

type Fields = {
	name: unknown;
	dateOfBirth: unknown;
	ssn: unknown;
	occupation: unknown;
	gender: unknown;
};

const toNewPatient = ({
	name,
	dateOfBirth,
	ssn,
	occupation,
	gender,
}: Fields): newPatient => {
	const newEntry: newPatient = {
		name: parseName(name),
		dateOfBirth: parseDateOfBirth(dateOfBirth),
		ssn: parseSSN(ssn),
		occupation: parseOccupation(occupation),
		gender: parseGender(gender),
	};
	return newEntry;
};

export default toNewPatient;
