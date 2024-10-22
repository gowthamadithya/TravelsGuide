import { createContext, useReducer } from "react";

const StoreContext = createContext({});

// Define an initial state
const initialState = { user: {}, places: [], ratings: [], history: [], auth: {} };

// Create a reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    case 'SET_PLACES':
      return {
        ...state,
        user: { ...state.places, ...action.payload }
      };
    // case 'ADD_VISITED_PLACE':
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       visited_places: [...(state.user.visited_places || []), action.payload]
    //     }
    //   };
    //   //and also post this to backend
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        history: [action.payload, ...state.history]
      };
      case 'ADD_AUTH':
        return {
          ...state,
          auth: action.payload
        };
    default:
      return state;
  }
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };





