import { Action } from ".";

interface DeviceInfo {
  traits: Array<string>;
  name: string;
  place: string;
  model: string;
  sid: string;
  [key:string]: any;
}


type devicesState = {
  [key:string]: DeviceInfo;
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
      const sid = action.payload.sid as string;
      return {
        ...state,
        [sid]: {...state[sid], ...action.payload.data},
      };
    }

    default:
      return state;
  }
};

export {devicesReducer};
export type {DeviceInfo, devicesState};
export type devicesReducerType = typeof devicesReducer;