const calculateBmi = (height: number, weight: number): string => {
	let bmi: number = weight / ((height * height) / 10000);

	if (bmi >= 18.5 && bmi <= 25) {
		return "Normal (healthy weight)";
	} else if (bmi > 25) {
		return "Overweight";
	} else if (bmi > 0 && bmi < 18.5) {
		return "Underweight";
	}
	return "";
};

let a: number = Number(process.argv[2]);
let b: number = Number(process.argv[3]);

console.log(calculateBmi(a, b));

export default calculateBmi;
