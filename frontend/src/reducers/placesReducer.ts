import { Action } from ".";

export type placesState = {
  selected: string;
  places: Array<string>
}


const placesReducer = (
  state: placesState,
  action: Action,
): placesState => {
  switch (action.type) {
    case "PLACES_LOADED": {
      return {
        ...state,
        places: action.payload,
        selected: action.payload[0],
      };
    }
    case "PLACE_SELECTED": {
      return {
        ...state,
        selected: action.payload
      };
    }
    default: 
      return state;
  }
}

export {placesReducer};
export type placesReducerType = typeof placesReducer;

