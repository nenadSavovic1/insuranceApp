interface IRisk {
  risk: string;
  color: string;
}

export interface IFormula {
  id: string;
  makeName: string;
  modelName: string;
  year: string;
  fuelType: string;
  risk?: IRisk;
  yearComparisonType: string;
}

export interface ICarBrand {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export interface ICarModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}
