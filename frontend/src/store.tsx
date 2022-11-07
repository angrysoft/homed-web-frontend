import { createContext, useReducer } from "react";
import rootReducer, { RootState } from "./reducers/rootReducer";

const initialState: RootState = {
  users: {
    user: {
      name: "",
      image: "",
    },
    isAuthenticated: false,
    isLoading: false,
  },
  devices: {},
  places: {
    selected: "",
    places: [],
  },
};

interface IProviderProps {
  children: JSX.Element | JSX.Element[];
}

const Provider = (props: IProviderProps) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

const AppContext = createContext<{
  state: RootState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export { Provider, AppContext, initialState };
