import express from "express";
import bmiCalculator from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	if (!req.query.height || !req.query.weight) {
		res.status(400).send({ error: "malformatted parameters" });
		return;
	}
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	const result = { height, weight, bmi: bmiCalculator(height, weight) };
	res.send(result);
});

app.post("/exercises", (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target) {
		res.status(400).send({ error: "parameters missing" });
		return;
	}

	if (isNaN(Number(target))) {
		res.status(400).send({ error: "malformatted parameters" });
		return;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const result = calculateExercises(daily_exercises, target);
	res.json(result);
});

const PORT = 3002;
app.listen(PORT, () => console.log(`App started on port ${PORT}`));
