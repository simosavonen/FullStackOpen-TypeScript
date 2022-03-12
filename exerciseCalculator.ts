interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (target: number, hours: Array<number>): Result => {
  
  const rating = (average: number, target: number): number => {
    if(average >= target) return 3;
    if(average >= target * 0.7) return 2;
    return 1;
  }

  const ratingDescription = (rating: number): string => {
    if(rating === 3) return 'You reached your target!';
    if(rating === 2) return 'You nearly reached your target.';
    return 'You missed your target, was it set too high?';
  }
  
  const result: Result = {
    periodLength: hours.length,
    trainingDays: hours.filter(h => h > 0).length,
    average: hours.reduce((a, b) => (a + b)) / hours.length,
    target,
    success: undefined,
    rating: undefined,
    ratingDescription: undefined
  }

  result.success = result.average >= result.target;
  result.rating = rating(result.average, result.target);
  result.ratingDescription = ratingDescription(result.rating);

  return result;
}

console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));