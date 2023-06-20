import { Action } from ".";

export type mainState = {
  loading: boolean;
  deviceList: Array<{[key:string]: any}>;
}

const mainReducer = (
  state: mainState,
  action: Action,
): mainState => {
  switch(action.type) {
    case "REFRESH_NEEDED_TRUE": {
      return {
        ...state,
        deviceList: action.payload,
      }
    }
    case "REFRESH_NEEDED_FALSE": {
      return {
        ...state,
        deviceList: [],
      }
    }

    case "LOADING_TRUE": {
      return {
        ...state,
        loading: true,
      }
    }
    case "LOADING_FALSE": {
      return {
        ...state,
        loading: false,
      }
    }

    default:
      return state;
  }
}

export {mainReducer}
export type mainReducerType = typeof mainReducer;