import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { v4 } from "uuid";
import { useStore } from "../store/Store";
import CarService from "../services/CarService";
import { IFormula as FormulaType, ICarBrand, ICarModel } from "../store/Models";
import { generateArrayOfYears, isFormValid } from "../utils";
import {
  comparisonTypes,
  fuelTypes,
  objKeyConstants,
  formFields,
  formPlaceHolders,
} from "../constants";
import Formula from "./Formula";
import CustomSelect from "./CustomSelect";
import img from "./car_graphic.jpg";

const Home: React.FC = () => {
  const [carBrands, setCarBrands] = useState<ICarBrand[]>([]);
  const [models, setModels] = useState<ICarModel[]>([]);
  const [years, setYears] = useState(generateArrayOfYears());
  const [error, setError] = useState<string>("");

  const { addFormula, removeFormula } = useStore();
  const formulas = useStore((state) => state.formulas);
  const { getAllManufacturers, getModelsForBrand } = CarService;

  const formik = useFormik({
    initialValues: {
      makeName: "",
      modelName: "",
      yearComparisonType: "",
      year: "",
      fuelType: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (!isFormValid(values)) {
        alert("Select at least one parameter");
        return;
      }
      const newFormula = {
        ...values,
        id: v4(),
      };
      addFormula(newFormula as FormulaType);
      resetForm();
    },
  });

  useEffect(() => {
    getAllManufacturers()
      .then((res) => {
        setCarBrands(res.data.Results);
        setError("");
      })
      .catch((e) => {
        setError("Something went wrong");
      });
  }, []);

  const getModelsForMake = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getModelsForBrand(e.target.value)
      .then((res) => {
        setModels(res.data.Results);
        setError("");
      })
      .catch((e) => {
        setError("Something went wrong with fetching car models...");
      });
  };

  const btnDisabled = isFormValid(formik.values);

  return (
    <div className="h-auto w-screen flex items-center justify-center relative">
      <div className="flex-row lg:w-11/12 sm:w-auto lg:ml-20 z-20 sm:mt-20 ">
        <div className="lg:w-1/2 h-20 lg:text-6xl sm:text-4xl text-red-500">
          We Make Insurance Easy!
        </div>

        <div className="lg:text-2xl sm:text-xl h-20  lg:mb-10 sm:mb-4">
          Create your risk formula by entering vehicle data in the form below
          <p className="animate-bounce">&darr;</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="lg:w-5/5  lg:h-40 sm:h-64 lg:flex lg:items-center lg:content-center lg:justify-around sm:justify-center sm:flex sm:items-center rounded-lg bg-gradient-to-l from-gray-200 to-transparent">
            <div className="lg:flex lg:justify-around lg:mb-0 w-4/5">
              <CustomSelect
                name={formFields.makeName}
                onChangeCallback={formik.handleChange}
                additionalCallback={getModelsForMake}
                value={formik.values.makeName}
                data={carBrands}
                dataKey={objKeyConstants.makeName}
                placeHolderSelect={formPlaceHolders.makeName}
              />

              <CustomSelect
                name={formFields.modelName}
                onChangeCallback={formik.handleChange}
                value={formik.values.modelName}
                data={models}
                dataKey={objKeyConstants.modelName}
                placeHolderSelect={formPlaceHolders.modelName}
              />

              <CustomSelect
                name={formFields.fuelType}
                onChangeCallback={formik.handleChange}
                value={formik.values.fuelType}
                data={fuelTypes}
                dataKey={objKeyConstants.fuelType}
                placeHolderSelect={formPlaceHolders.fuelType}
              />

              <CustomSelect
                name={formFields.yearComparisonType}
                onChangeCallback={formik.handleChange}
                value={formik.values.yearComparisonType}
                data={comparisonTypes}
                dataKey={objKeyConstants.comparisonChar}
                placeHolderSelect={formPlaceHolders.yearComparisonType}
              />

              <CustomSelect
                name={formFields.year}
                onChangeCallback={formik.handleChange}
                value={formik.values.year}
                data={years}
                dataKey={objKeyConstants.yearValue}
                placeHolderSelect={formPlaceHolders.year}
              />
            </div>
            <div className="mr-4 lg:ml-0">
              <button
                type="submit"
                className={
                  btnDisabled
                    ? "bg-blue-400 hover:bg-blue-700 text-white font-bold lg:py-3 lg:px-8 sm:py-2 sm:px-4 rounded"
                    : "bg-blue-400 text-white font-bold lg:py-3 lg:px-8 sm:py-2 sm:px-4 rounded disabled:opacity-75 pointer-events-none	"
                }
              >
                Create
              </button>
            </div>
          </div>
        </form>
        {error && <h5 className="mt-12 font-bold text-red-500">{error}</h5>}
        {formulas?.length > 0 &&
          formulas.map((formula) => {
            return (
              <Formula
                makeName={formula.makeName}
                modelName={formula.modelName}
                year={formula.year}
                fuelType={formula.fuelType}
                risk={formula?.risk?.risk}
                color={formula?.risk?.color}
                id={formula.id}
                removeFormula={removeFormula}
                yearComparisonType={formula.yearComparisonType}
              />
            );
          })}
      </div>

      <img
        className="lg:w-2/5 sm:w-3/4 sm:bottom-16 absolute top-8 right-8 sm:opacity-70 lg:opacity-80"
        src={img}
      />
    </div>
  );
};

export default Home;
