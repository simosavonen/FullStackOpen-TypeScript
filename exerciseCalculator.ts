interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription?: string;
  target: number;
  average: number;
}

interface ExerciseHours {
  target: number;
  hours: Array<number>;
}

const parseArguments = (args: Array<string>): ExerciseHours => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const parsedArguments: ExerciseHours = {
    target: 0,
    hours: []
  };

  for (let i = 2; i < args.length; i++) {
    const numberArgument = Number(args[i]);

    if (isNaN(numberArgument) || numberArgument < 0 || numberArgument > 24)
      throw new Error(`Invalid argument: ${args[i]}`);

    if (!parsedArguments.target) {
      parsedArguments.target = numberArgument;
    } else {
      parsedArguments.hours.push(numberArgument);
    }
  }

  return parsedArguments;
};

const calculateExercises = (exerciseHours: ExerciseHours): Result => {  
  
  const rating = (average: number, target: number): number => {
    if(average >= target) return 3;
    if(average >= target * 0.7) return 2;
    return 1;
  };

  const ratingDescription = (rating: number): string => {
    if(rating === 3) return 'You reached your target!';
    if(rating === 2) return 'You nearly reached your target.';
    return 'You missed your target, was it set too high?';
  };

  const result: Result = {
    periodLength: exerciseHours.hours.length,
    trainingDays: exerciseHours.hours.filter(h => h > 0).length,
    average: exerciseHours.hours.reduce((a, b) => (a + b)) / exerciseHours.hours.length,
    target: exerciseHours.target,
    success: false,
    rating: 0,
    ratingDescription: ""
  };

  result.success = result.average >= result.target;
  result.rating = rating(result.average, result.target);
  result.ratingDescription = ratingDescription(result.rating);

  return result;
};

try {
  const result = calculateExercises(parseArguments(process.argv));
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}