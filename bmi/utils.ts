export const isNotNumber = (argument: string) => isNaN(Number(argument));

export const parseArgumentsBmiCalculator = (args: string[]) => {
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

export const parseArgumentsExerciseCalculator = (args: string[]) => {
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
