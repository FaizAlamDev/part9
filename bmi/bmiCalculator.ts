import { isNotNumber } from "./utils";

function calculateBmi(height: number, weight: number) {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal (healthy weight)";
  } else {
    return "Overweight";
  }
}

const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not Enough Arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Arguments are not of the correct type");
  }
};

const { height, weight } = parseArguments(process.argv);

console.log(calculateBmi(height, weight));
