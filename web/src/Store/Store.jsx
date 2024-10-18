import { createContext, useReducer } from "react";

const StoreContext = createContext(null);

// Define an initial state
const initialState = { user: null, places: null, ratings: null };

// Create a reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: {...state.user, ...action.payload}
      };
    case 'SET_PLACES':
        return {
          ...state,
          user: {...state.places, ...action.payload}
        };
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

const StoreProvider = ({ children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };





