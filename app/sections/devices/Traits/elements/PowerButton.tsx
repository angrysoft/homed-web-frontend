import { PowerSettingsNewOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

interface IPowerButtonProps {
  handleClick: () => void;
  status: boolean;
}

const PowerButton: React.FC<IPowerButtonProps> = (props: IPowerButtonProps) => {
  return (
    <IconButton onClick={props.handleClick}>
      <PowerSettingsNewOutlined
        color={props.status ? "primary" : "secondary"}
      />
    </IconButton>
  );
};

export { PowerButton };
