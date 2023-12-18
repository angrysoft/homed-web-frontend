"use client";
import { IDevices } from "./DeviceInfo";

interface Action {
  type: string;
  payload: any;
}
export const devicesReducer = (state: IDevices, action: Action): IDevices => {
  switch (action.type) {
    case "DEVICES_LOADED": {
      return {
        ...state,
        ...action.payload,
      };
    }

    case "UPDATE_DEVICE": {
      const sid = action.payload.sid as string;
      return {
        ...state,
        [sid]: { ...state[sid], ...action.payload.payload },
      };
    }

    default:
      return state;
  }
};
