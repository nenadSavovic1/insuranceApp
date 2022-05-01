import create from "zustand";

import { calculateRisk } from "../utils";
import { IFormula } from "./Models";

interface AppState {
  formulas: IFormula[];
  addFormula: (formula: IFormula) => void;
  removeFormula: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  formulas: [],
  addFormula: (values) => {
    const formula = {
      ...values,
      risk: calculateRisk(values),
    };
    set((state) => {
      return {
        formulas: [formula, ...state.formulas],
      };
    });
  },
  removeFormula: (id) =>
    set((state) => {
      return {
        formulas: state.formulas.filter(
          (formula: IFormula) => formula.id !== id
        ),
      };
    }),
}));
