import { createContext, useReducer } from "react";

const StoreContext = createContext(null);

// Define an initial state
const initialState = { user: null };

// Create a reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_VISITED_PLACE':
      return {
        ...state,
        user: {
          ...state.user,
          visited_places: [...(state.user.visited_places || []), action.payload]
        }
      };
      //and also post this to backend
    default:
      return state;
  }
}

const StoreProvider = ({ passedDownElements}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {passedDownElements}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };





