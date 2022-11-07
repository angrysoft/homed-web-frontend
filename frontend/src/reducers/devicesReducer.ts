import { Action } from ".";

interface Device {
  traits: Array<string>;
  name: object;
  place: object;
  model: string;
  sid: string;
  [key:string]: any;
}


type devicesState = {
  [key:string]: Device;
}


const devicesReducer = (
  state: devicesState,
  action: Action,
): devicesState => {
  switch (action.type) {
    case "ALL_DEVICES_LOADED": {
      return {
        ...state,
        ...action.payload,
      };
    }
    
    case "UPDATE_DEVICE": {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};

export {devicesReducer};
export type {Device, devicesState};
export type devicesReducerType = typeof devicesReducer;