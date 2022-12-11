import express from "express";
import bmiCalculator from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	if (req.query.height === undefined || req.query.weight === undefined) {
		res.status(400).send({ error: "malformatted parameters" });
		return;
	}
	let height = Number(req.query.height);
	let weight = Number(req.query.weight);

	const result = { height, weight, bmi: bmiCalculator(height, weight) };
	res.send(result);
});

const PORT = 3002;
app.listen(PORT, () => console.log(`App started on port ${PORT}`));
