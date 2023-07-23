import {
  Diagnosis,
  Entry,
  Gender,
  HealthCheckRating,
  newEntry as newEntryType,
  newPatientEntry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (value: unknown): value is number => {
  return value != null && value !== "" && !isNaN(Number(value.toString()));
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }

  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

export const toNewPatientEntry = (object: unknown): newPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntry: newPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: object.entries as Entry[],
    };

    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

// ============================================

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect or missing healthCheckRating");
  }

  return healthCheckRating;
};

export const toNewEntry = (object: unknown): newEntryType => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const returnedObject: Record<string, unknown> = {};

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    returnedObject.description = parseDescription(object.description);
    returnedObject.date = parseDate(object.date);
    returnedObject.specialist = parseSpecialist(object.specialist);
    returnedObject.diagnosisCodes = parseDiagnosisCodes(object);

    if (object.type === "Hospital") {
      if (
        !("discharge" in object) ||
        !object.discharge ||
        typeof object.discharge !== "object"
      ) {
        throw new Error("Incorrect or missing discharge");
      }

      returnedObject.type = object.type;
      returnedObject.discharge = object.discharge as {
        date: string;
        criteria: string;
      };
    }

    if (object.type === "HealthCheck") {
      if (!("healthCheckRating" in object)) {
        throw new Error("Incorrect or missing healthCheckRating");
      }

      const healthCheckRating = parseHealthCheckRating(
        object.healthCheckRating
      );

      returnedObject.type = object.type;
      returnedObject.healthCheckRating = healthCheckRating;
    }

    if (object.type === "OccupationalHealthcare") {
      if (!("employerName" in object) || !isString(object.employerName)) {
        throw new Error("Incorrect or missing employerName");
      }

      returnedObject.type = object.type;
      returnedObject.employerName = object.employerName;

      if ("sickLeave" in object) {
        returnedObject.sickLeave = object.sickLeave as {
          startDate: string;
          endDate: string;
        };
      }
    }
    return returnedObject as newEntryType;
  }

  throw new Error("Incorrect data: a field missing");
};
