import React, { useContext } from "react";
import { AppContext } from "../../store";

interface IPlacesProps {
  children?: JSX.Element | JSX.Element[];
}

interface IPlaceProps {
  name: string;
  handelClick: CallableFunction;
  selected?: boolean;
}

const Places: React.FC<IPlacesProps> = (props: IPlacesProps) => {
  const { state, dispatch } = useContext(AppContext);

  const placeElements = state.places.places.map((name,index) =>
      <Place
        key={index}
        name={name}
        handelClick={() =>
          dispatch({ type: "PLACE_SELECTED", payload: name })
        }
        selected={name === state.places.selected}
      />
  );

  return (
    <div
      className="grid grid-flow-col  w-full pt-1
                 overflow-auto
               bg-surface text-onSurface"
    >
      {placeElements}
    </div>
  );
};

const Place: React.FC<IPlaceProps> = (props: IPlaceProps) => {
  let classes: string = "border-primary py-1 px-2 transition-all delay-150 whitespace-nowrap";
  if (props.selected) {
    classes = `${classes} font-bold border-b-4`;
  }

  return (
    <div className={classes} onClick={()=> props.handelClick()}>
      {props.name}
    </div>
  );
};

export { Places };
