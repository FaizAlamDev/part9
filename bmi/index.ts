import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.send({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);
  res.send({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" });
  }

  if (isNaN(Number(target))) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  const result = calculateExercises(
    daily_exercises as number[],
    target as number
  );

  res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
