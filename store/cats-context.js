import { createContext, useReducer } from "react";

export const CatsContext = createContext({
  cats: [],
  addCat: ({ description, amount, date, name }) => {},
  setCats: (cats) => {},
  deleteCat: (id) => {},
  updateCat: (id, { description, amount, date, name }) => {},
});

function catsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableCatIndex = state.findIndex(
        (cat) => cat.id === action.payload.id
      );
      const updatableCat = state[updatableCatIndex];
      const updatedItem = { ...updatableCat, ...action.payload.data };
      const updatedCats = [...state];
      updatedCats[updatableCatIndex] = updatedItem;
      return updatedCats;
    case "DELETE":
      return state.filter((cat) => cat.id !== action.payload);
    default:
      return state;
  }
}

function CatsContextProvider({ children }) {
  const [catsState, dispatch] = useReducer(catsReducer, []);

  function addCat(catData) {
    dispatch({ type: "ADD", payload: catData });
  }

  function setCats(cats) {
    dispatch({ type: "SET", payload: cats });
  }

  function deleteCat(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateCat(id, catData) {
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
