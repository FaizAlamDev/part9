interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercises = (arr: number[], target: number): Result => {
	let periodLength = arr.length;

	let trainingDays: number = 0;

	arr.map((day) => {
		if (day > 0) trainingDays++;
	});

	// Rating formula
	// If training days > 75% of all days
	// 		then rating = 3
	// If training days > 30% and <= 75% of all days
	// 		then rating = 2
	// Else
	// 		rating = 1
	let rating: number = 1;

	if (
		trainingDays / periodLength > 0.3 &&
		trainingDays / periodLength <= 0.75
	) {
		rating = 2;
	} else if (trainingDays / periodLength > 0.75) {
		rating = 3;
	}

	let ratingDescription: string;
	if (rating === 1) {
		ratingDescription = "too low";
	} else if (rating === 2) {
		ratingDescription = "not too bad but could be better";
	} else {
		ratingDescription = "perfect";
	}

	let average: number = 0;
	arr.map((day) => {
		average += day;
	});

	average = average / periodLength;

	let success = average >= target;

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};
};

let target: number = Number(process.argv[2]);

let args: number[] = [];

for (let i = 3; i < process.argv.length; i++) {
	args[i - 3] = Number(process.argv[i]);
}

console.log(calculateExercises(args, target));
