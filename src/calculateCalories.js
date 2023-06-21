const activityData = {
  'no activity': {
    activityMultiplier: 1.2,
    macroRatio: {
      proteinRatio: 20,
      fatRatio: 30,
      carbsRatio: 50,
    },
  },
  '1-3 light activities per week': {
    activityMultiplier: 1.375,
    macroRatio: {
      proteinRatio: 20,
      fatRatio: 30,
      carbsRatio: 50,
    },
  },
  '3-5 moderate activities per week': {
    activityMultiplier: 1.55,
    macroRatio: {
      proteinRatio: 30,
      fatRatio: 30,
      carbsRatio: 40,
    },
  },
  '5-6 moderate activities per week': {
    activityMultiplier: 1.725,
    macroRatio: {
      proteinRatio: 30,
      fatRatio: 20,
      carbsRatio: 50,
    },
  },
  '7 vigorous activities per week': {
    activityMultiplier: 1.9,
    macroRatio: {
      proteinRatio: 25,
      fatRatio: 15,
      carbsRatio: 60,
    },
  },
};

const formulasData = {
  'Mifflin-St Jeor': {
    weightCoefficient: {
      male: 10,
      female: 10,
    },
    heightCoefficient: {
      male: 6.25,
      female: 6.25,
    },
    ageCoefficient: {
      male: 5,
      female: 5,
    },
    genderCoefficient: {
      male: 5,
      female: -161,
    },
  },
  'Harris-Benedict': {
    weightCoefficient: {
      male: 13.7,
      female: 9.6,
    },
    heightCoefficient: {
      male: 5,
      female: 1.8,
    },
    ageCoefficient: {
      male: 6.76,
      female: 4.7,
    },
    genderCoefficient: {
      male: 66,
      female: 655,
    },
  },
};

const getMacrosAmount = (calories, macroRatio, caloriesInMacro) => (
  Math.round((calories * macroRatio) / 100 / caloriesInMacro)
);

const calculateMacros = (calories, { proteinRatio, fatRatio, carbsRatio }) => {
  const caloriesInProtein = 4;
  const caloriesInFat = 9;
  const caloriesInCarbs = 4;

  return {
    protein: getMacrosAmount(calories, proteinRatio, caloriesInProtein),
    fat: getMacrosAmount(calories, fatRatio, caloriesInFat),
    carbs: getMacrosAmount(calories, carbsRatio, caloriesInCarbs),
    macroRatio: `${proteinRatio}% ${fatRatio}% ${carbsRatio}%`,
  };
};

const calculateCalories = (gender, age, height, weight, physicalActivity, formula) => {
  const calories = Math.round((
    (formulasData[formula].weightCoefficient[gender] * weight)
  + (formulasData[formula].heightCoefficient[gender] * height)
  - (formulasData[formula].ageCoefficient[gender] * age)
  + formulasData[formula].genderCoefficient[gender])
  * activityData[physicalActivity].activityMultiplier);

  const {
    protein, fat, carbs, macroRatio,
  } = calculateMacros(calories, activityData[physicalActivity].macroRatio);

  return {
    calories,
    protein,
    fat,
    carbs,
    macroRatio,
  };
};

export default calculateCalories;
