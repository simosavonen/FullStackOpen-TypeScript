import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, ExerciseHours } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight) || height < 0 || weight < 0)
    return res.json({ error: 'malformatted parameters' });

  return res.json({
    weight,
    height,
    bmi: calculateBmi({ height, weight })
  });
});

app.post('/exercises', (req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body.target || !req.body.daily_exercises || !Array.isArray(req.body.daily_exercises))
    return res.json({ error: "parameters missing" });


  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if (Number.isNaN(req.body.target) || req.body.daily_exercises.some(isNaN))
    return res.json({ error: "malformatted parameters" });

  return res.json(calculateExercises(req.body as ExerciseHours));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});