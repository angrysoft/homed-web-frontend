interface IPlaceProps {
  name: string;
  onClick: () => void;
  selected?: boolean;
}

const Place: React.FC<IPlaceProps> = (props: IPlaceProps) => {
  let classes: string =
    "border-b-4 py-1 px-2 transition-all delay-150 whitespace-nowrap text-center";
  const el = document.getElementById(props.name);
  if (props.selected) {
    classes += " border-primary";
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center" });
  } else {
    classes += " border-surface";
  }

  return (
    <div id={props.name} className={classes} onClick={() => props.onClick()} role="none">
      {props.name}
    </div>
  );
};

export { Place };
