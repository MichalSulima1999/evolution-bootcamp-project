import React from "react";
import Enemy from "./Enemy";
import { Goblin } from "../../../classes/enemies/Enemies";

const Fight = () => {
  return (
    <>
      <Enemy x={150} y={250} enemy={Goblin} />
      <Enemy x={400} y={250} enemy={Goblin} />
      <Enemy x={650} y={250} enemy={Goblin} />
    </>
  );
};

export default Fight;
