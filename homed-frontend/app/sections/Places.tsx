import { Place } from "./Place";

interface IPlacesProps {
  onChange: (placeName: string) => void;
  items: string[];
  selected: string;
}

const Places: React.FC<IPlacesProps> = (props: IPlacesProps) => {
  const placeElements = props.items.map((name) => (
    <Place
      key={name}
      name={name}
      onClick={() => {
        props.onChange(name);
      }}
      selected={name === props.selected}
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
