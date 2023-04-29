interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export default function calculateExercises(
  dailyArr: number[],
  target: number
): Result {
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
