interface ISectionTitleProps {
  title: string;
  show?: boolean;
}

const SectionTitle = (props: ISectionTitleProps) => {
  if (!props.show) {
    return <></>;
  }
  return <h2 className="text-center col-span-2">{props.title}</h2>;
};

export { SectionTitle };
