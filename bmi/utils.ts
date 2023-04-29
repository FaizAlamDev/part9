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
