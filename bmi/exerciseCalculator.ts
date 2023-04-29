import { isNotNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(dailyArr: number[], target: number): Result {
  const periodLength = dailyArr.length;

  const trainingDays = dailyArr.filter((hours) => hours > 0).length;

  const average = dailyArr.reduce((sum, curr) => sum + curr, 0) / periodLength;

  const success = average > target ? true : false;

  const rating = average < 1 ? 1 : average >= 1 && average < 2 ? 2 : 3;

  let ratingDescription = "";
  if (rating === 1) ratingDescription = "needs improvement";
  else if (rating === 2) ratingDescription = "not too bad but could be better";
  else ratingDescription = "target achieved. Well done";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not Enough Arguments");

  const target = args[2];
  const dailyArr = args.slice(3);

  if (isNotNumber(target)) {
    throw new Error("Incorrect types");
  }

  if (dailyArr.some((val) => isNotNumber(val))) {
    throw new Error("Incorrect types");
  }
  return {
    target: Number(target),
    dailyArr: dailyArr.map(Number),
  };
};

const { target, dailyArr } = parseArguments(process.argv);

console.log(calculateExercises(dailyArr, target));
