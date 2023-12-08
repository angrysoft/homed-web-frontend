import { useContext } from "react";
import { AppContext } from "../store";
import { Place } from "./Place";

interface IPlacesProps {
  children?: React.ReactNode;
}

const Places: React.FC<IPlacesProps> = (props: IPlacesProps) => {
  const { state, dispatch } = useContext(AppContext);

  const placeElements = state.places.places.map((name, index) => (
    <Place
      key={index}
      name={name}
      handelClick={() => {
        dispatch({ type: "PLACE_SELECTED", payload: name });
        localStorage.setItem("placeSelected", name);
      }}
      selected={name === state.places.selected}
    />
  ));

  return (
    <div
      className="grid grid-flow-col  w-full pt-1
                 overflow-auto no-scrollbar
                 bg-surface text-onSurface"
    >
      {placeElements}
    </div>
  );
};

export { Places };
