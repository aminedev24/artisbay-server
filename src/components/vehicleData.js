let makesData = [];
let modelsData = {};

export const setMakesData = (makes) => {
  makesData = makes;
};

export const getMakesData = () => {
  return makesData;
};

export const setModelsData = (models) => {
  modelsData = models;
};

export const getModelsData = () => {
  return modelsData;
};

// Fetch makes from local JSON file
export const fetchMakes = async () => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/make_models.json`); // Fetch local JSON
    const data = await response.json();

    const makes = Object.keys(data); // Extract makes from JSON keys

    setMakesData(makes);
    return makes;
  } catch (error) {
    console.error("Error loading makes:", error);
    return [];
  }
};

// Fetch models for a selected make
export const fetchModelsForMake = async (make) => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/make_models.json`);
    const data = await response.json();

    const models = data[make] || []; // Get models for the make

    setModelsData((prev) => ({ ...prev, [make]: models }));
    return models;
  } catch (error) {
    console.error(`Error loading models for ${make}:`, error);
    return [];
  }
};

export const bodyTypeOptions = [
  "Sedan", "Hatchback", "SUV", "Coupe", "Convertible",
  "Wagon", "Van", "Pickup", "Minivan", "Truck", "Other"
];

export const transmissionOptions = [
  "Automatic", "Manual", "Semi-Automatic", "CVT"
];
