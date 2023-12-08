import {userReducer, userState} from "./userReducer";
import { Action } from ".";
import { devicesReducer, devicesState } from "./devicesReducer";
import { placesReducer, placesState } from "./placesReducer";
import { mainReducer, mainState } from "./mainReducer";


type RootState = {
  users: userState,
  devices: devicesState,
  places: placesState,
  main: mainState,
}

type State = userState | devicesState | placesState | mainState;


const combineReducers = () => {
  return (state: RootState, action: Action): RootState => {
    return {
      ...state,
      users: userReducer(state["users"], action),
      devices: devicesReducer(state["devices"], action),
      places: placesReducer(state["places"], action),
      main: mainReducer(state["main"], action),
    };
  };
};


export default combineReducers();
export type {RootState, State};

export type ReducerType = typeof combineReducers;