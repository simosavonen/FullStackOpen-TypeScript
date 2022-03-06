const calculateBmi = (height: number, weight: number): string => {
  if(height <= 0 || weight <= 0) {
    return "Error: Provided values need to be positive numbers!" 
  }
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)

  if(bmi <= 16.0) { return "Underweight (Severe thinness)"; }
  if(bmi <= 16.9) { return "Underweight (Moderate thinness)"; }
  if(bmi <= 18.4) { return "Underweight (Mild thinness)"; }
  if(bmi <= 24.9) { return "Normal (healthy weight)"; }
  if(bmi <= 29.9) { return "Overweight (Pre-obese)"; }
  if(bmi <= 34.9) { return "Obese (Class I)"; }
  if(bmi <= 39.9) { return "Obese (Class II)"; }
  if(bmi > 39.9) { return "Obese (Class III)"; }
}

console.log(calculateBmi(180, 74));