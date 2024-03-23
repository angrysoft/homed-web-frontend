import { PowerSettingsNewOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

interface IPowerButtonProps {
  handleClick: () => void;
  status: boolean;
}

const PowerButton: React.FC<IPowerButtonProps> = (props: IPowerButtonProps) => {
  const color = props.status ? "secondary" : "primary";

  return (
    <Button onClick={props.handleClick} variant="outlined" color={color}>
      <PowerSettingsNewOutlined
        color={color}
      />
    </Button>
  );
};

export { PowerButton };
