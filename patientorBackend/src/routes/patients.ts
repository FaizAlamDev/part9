import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const patients = patientService.getEntries();
  const id = req.params.id;

  const patient = patients.filter((p) => p.id === id);
  res.send(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errMsg = "Something went wrong";
    if (error instanceof Error) {
      errMsg += "Error: " + error.message;
    }
    res.status(400).send(errMsg);
  }
});

export default router;
