import { Place } from "./Place";

interface IPlacesProps {
  onChange: (placeName: string) => void;
  items: string[];
  selected: string;
}

const Places: React.FC<IPlacesProps> = (props: IPlacesProps) => {
  let localSelected = props.selected;
  if (props.selected === "") {
    localSelected = props.items[0]
  }
  const placeElements = props.items.map((name) => (
    <Place
      key={name}
      name={name}
      onClick={() => {
        props.onChange(name);
      }}
      selected={name === localSelected}
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
