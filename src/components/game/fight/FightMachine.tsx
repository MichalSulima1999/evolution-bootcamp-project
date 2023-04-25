import React from "react";
import { Sprite } from "@pixi/react";
import { FightDrum } from "../../../types";
import useDidUpdateEffect from "../../../hooks/UseDidUpdateEffect";

interface MachineProps {
  spinning: boolean;
  setSpinning: React.Dispatch<React.SetStateAction<boolean>>;
  drums: FightDrum[];
}

const FightMachine: React.FC<MachineProps> = ({
  spinning,
  setSpinning,
  drums,
}) => {
  const [drumImg1, setDrumImg1] = React.useState<string>("/assets/sword.png");
  const [drumImg2, setDrumImg2] = React.useState<string>("/assets/sword.png");
  const [drumImg3, setDrumImg3] = React.useState<string>("/assets/sword.png");

  const drumImgs: string[] = [
    "/assets/sword.png",
    "/assets/sword_special.png",
    "/assets/shield.png",
  ];

  useDidUpdateEffect(() => {
    if (!spinning) {
      return;
    }

    spinDrum();
  }, [spinning]);

  const setDrumImg = (
    drum: FightDrum,
    setImg: React.Dispatch<React.SetStateAction<string>>
  ) => {
    switch (drum) {
      case FightDrum.ATTACK:
        setImg("/assets/sword.png");
        break;
      case FightDrum.SPECIAL_ATTACK:
        setImg("/assets/sword_special.png");
        break;
      case FightDrum.DEFEND:
        setImg("/assets/shield.png");
        break;
    }
  };

  const spinDrum = async () => {
    const spinTimes = 3;
    const delay = 100;

    for (let i = 0; i < drumImgs.length * spinTimes; i++) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      setDrumImg1(drumImgs[i % drumImgs.length]);
      setDrumImg2(drumImgs[(i + 1) % drumImgs.length]);
      setDrumImg3(drumImgs[(i + 2) % drumImgs.length]);
    }

    setDrumImg(drums[0], setDrumImg1);
    setDrumImg(drums[1], setDrumImg2);
    setDrumImg(drums[2], setDrumImg3);

    setSpinning(false);
  };

  return (
    <>
      <Sprite image="/assets/bottom-ui.png" width={800} height={200} y={400} />
      <Sprite
        image="/assets/SMFrame_blank.png"
        scale={{ x: 1, y: 1 }}
        anchor={0.5}
        x={400}
        y={500}
      />
      <Sprite
        image={drumImg1}
        width={50}
        height={50}
        anchor={0.5}
        x={326}
        y={490}
      />
      <Sprite
        image={drumImg2}
        width={50}
        height={50}
        anchor={0.5}
        x={400}
        y={490}
      />
      <Sprite
        image={drumImg3}
        width={50}
        height={50}
        anchor={0.5}
        x={474}
        y={490}
      />
    </>
  );
};

export default FightMachine;
