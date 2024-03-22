import { Typography } from "@mui/material";

interface ISectionTitleProps {
  title: string;
  show?: boolean;
}

const SectionTitle = (props: ISectionTitleProps) => {
  if (!props.show) {
    return <></>;
  }
  return <Typography textAlign={"center"}>{props.title}</Typography>;
};

export { SectionTitle };
