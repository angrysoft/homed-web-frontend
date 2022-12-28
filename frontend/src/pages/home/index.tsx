import React from "react";
import {Devices} from "../../devices/Devices";
import { Places } from "./places";

interface IHomeProps {
  children?: JSX.Element | JSX.Element[];
}

const Home: React.FC<IHomeProps> = (props: IHomeProps) => {

  return (
    <div className="grid content-baseline bg-background h-screen text-onBackground">
      <Places />
      <Devices />
    </div>
  );
};

export default Home;
