import { createContext, useReducer } from "react";
import { catObjType } from "../types/types";

type CatsContextType = {
  cats: catObjType[];
  addCat: ({ description, amount, date, name }: catObjType) => void;
  setCats: (cats: catObjType[]) => void;
  deleteCat: (id: string) => void;
  updateCat: (
    id: string,
    { description, amount, date, name }: catObjType
  ) => void;
};

export const CatsContext = createContext<CatsContextType>({
  cats: [],
  addCat: ({ description, amount, date, name }) => {},
  setCats: (cats) => {},
  deleteCat: (id) => {},
  updateCat: (id, { description, amount, date, name }) => {},
});

function catsReducer(state: catObjType[], action: any) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableCatIndex = state.findIndex(
        (cat: catObjType) => cat.id === action.payload.id
      );
      const updatableCat = state[updatableCatIndex];
      const updatedItem = { ...updatableCat, ...action.payload.data };
      const updatedCats = [...state];
      updatedCats[updatableCatIndex] = updatedItem;
      return updatedCats;
    case "DELETE":
      return state.filter((cat: catObjType) => cat.id !== action.payload);
    default:
      return state;
  }
}

function CatsContextProvider({ children }: any) {
  const [catsState, dispatch] = useReducer(catsReducer, []);

  function addCat(catData: catObjType) {
    dispatch({ type: "ADD", payload: catData });
  }

  function setCats(cats: catObjType[]) {
    dispatch({ type: "SET", payload: cats });
  }

  function deleteCat(id: string) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateCat(id: string, catData: any) {
    dispatch({ type: "UPDATE", payload: { id: id, data: catData } });
  }

  const value = {
    cats: catsState,
    setCats: setCats,
    addCat: addCat,
    deleteCat: deleteCat,
    updateCat: updateCat,
  };

  return <CatsContext.Provider value={value}>{children}</CatsContext.Provider>;
}

export default CatsContextProvider;
