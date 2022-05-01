import http from "./http-common";

const getAllManufacturers = () => {
  return http.get("/vehicles/GetMakesForVehicleType/car?format=json");
};

const getModelsForBrand = (brand: string) => {
  return http.get(`/vehicles/GetModelsForMake/${brand}?format=json`);
};

const CarService = {
  getAllManufacturers,
  getModelsForBrand,
};

export default CarService;
