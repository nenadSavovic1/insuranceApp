export const generateArrayOfYears = () => {
  const max = new Date().getFullYear();
  let years = [];

  for (let i = max; i >= 1850; i--) {
    const yearObj = {
      yearValue: i,
    };
    years.push(yearObj);
  }
  return years;
};

export const calculateRisk = (values: any) => {
  if (!values.makeName || !values.year) {
    return { risk: "unknown", color: "black" };
  } else if (values.year < 1900) return { risk: "high", color: "red" };
  else if (values.year > 2019 && values.makeName !== "PEUGEOT") {
    return { risk: "low", color: "green" };
  } else if (values.makeName === "PEUGEOT")
    return { risk: "medium", color: "blue" };
  else if (
    values.makeName === "VOLKSWAGEN" &&
    values.fuelType === "electric" &&
    values.year < 2013
  ) {
    return { risk: "medium", color: "blue" };
  } else if (
    values.makeName === "HONDA" &&
    values.modelName === "Civic" &&
    values.year < 1999
  )
    return { risk: "high", color: "red" };
  else if (values.year > 1900 && values.year < 2019) {
    return { risk: "medium", color: "blue" };
  } else return { risk: "unknown", color: "black" };
};

export const isFormValid = (values: any) =>
  !!values.makeName || !!values.modelName || !!values.fuelType || !!values.year;
