import {userReducer, userState} from "./userReducer";
import { Action } from ".";
import { devicesReducer, devicesState } from "./devicesReducer";
import { placesReducer, placesState } from "./placesReducer";


type RootState = {
  users: userState,
  devices: devicesState,
  places: placesState,
}

type State = userState | devicesState | placesState;


const combineReducers = () => {
  return (state: RootState, action: Action): RootState => {
    return {
      ...state,
      users: userReducer(state["users"], action),
      devices: devicesReducer(state["devices"], action),
      places: placesReducer(state["places"], action),
    };
  };
};


export default combineReducers();
export type {RootState, State};

export type ReducerType = typeof combineReducers;