import React, { useContext } from "react";
import { AppContext } from "../../store";

interface IPlacesProps {
  children?: JSX.Element | JSX.Element[];
}

interface IPlaceProps {
  name: string;
}

const Places: React.FC<IPlacesProps> = (props: IPlacesProps) => {
  return (
    <div
      className="grid grid-flow-col gap-1 w-full pt-1
                 overflow-auto
               bg-surface text-onSurface"
    >
      <Place name="Dupa1" />
      <Place name="Dupa2" />
      <Place name="Dupa3" />
      <Place name="Dupa4" />
      <Place name="Dupa5" />
      <Place name="Dupa6" />
      <Place name="Dupa7" />
      <Place name="Dupa8" />
      <Place name="Dupa9" />
    </div>
  );
};

const Place: React.FC<IPlaceProps> = (props: IPlaceProps) => {
  const { state, dispatch } = useContext(AppContext);
  let classes: string = "border-b-primary py-1 px-2 transition-all delay-150";
  if (state.places.selected === props.name) {
    classes = `${classes} font-bold border-b-4`;
  }
  
  return (
    <div
      className={classes}
      onClick={() => dispatch({ type: "PLACE_SELECTED", payload: props.name })}
    >
      {props.name}
    </div>
  );
};

export { Places };
