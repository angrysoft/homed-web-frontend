import { Action } from ".";

export type User = {
  image: string,
  name: string,
}

export type userState = {
   user: User,
   isLoading: boolean,
   isAuthenticated: boolean,
}


const userReducer = (state: userState, action: Action): userState => {
  switch (action.type) {
    case 'USER_LOGGED':
      return {
        ...state,
        isLoading: false,
      }
    case "USER_AUTH_CHECK":
      return {
        ...state,
        isLoading: false,
      };
    case "USER_AUTH_FAILED":
      return {
        ...state,
        isLoading: false,
      };
    case "USER_LOGOUT":
      
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export {userReducer};
export type userReducerType = typeof userReducer;
