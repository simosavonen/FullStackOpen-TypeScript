interface bmiParameters {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): bmiParameters => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if(isNaN(Number(args[2])) || isNaN(Number(args[3])))
    throw new Error('Arguments need to be numbers!');
  
  const bmiParams: bmiParameters = {
    height: Number(args[2]),
    weight: Number(args[3])
  }

  if(bmiParams.height < 0 || bmiParams.weight < 0) 
    throw new Error('Arguments need to be positive numbers!')

  return bmiParams;
}

const calculateBmi = (bmiParams: bmiParameters): string => {
  const heightInMeters = bmiParams.height / 100
  const bmi = bmiParams.weight / (heightInMeters * heightInMeters)

  if(bmi <= 16.0) { return "Underweight (Severe thinness)"; }
  if(bmi <= 16.9) { return "Underweight (Moderate thinness)"; }
  if(bmi <= 18.4) { return "Underweight (Mild thinness)"; }
  if(bmi <= 24.9) { return "Normal (healthy weight)"; }
  if(bmi <= 29.9) { return "Overweight (Pre-obese)"; }
  if(bmi <= 34.9) { return "Obese (Class I)"; }
  if(bmi <= 39.9) { return "Obese (Class II)"; }
  if(bmi > 39.9) { return "Obese (Class III)"; }
}

try {
  const result = calculateBmi(parseBmiArguments(process.argv))
  console.log(result)
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}