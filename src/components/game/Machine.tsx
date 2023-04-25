import React from "react";
import { Sprite } from "@pixi/react";
import { Drum } from "../../classes/actions/AdventureActions";

interface MachineProps {
  spinning: boolean;
  setSpinning: React.Dispatch<React.SetStateAction<boolean>>;
  drums: Drum[];
}

const Machine: React.FC<MachineProps> = ({ spinning, setSpinning, drums }) => {
  const [drumImg1, setDrumImg1] = React.useState<string>(
    "/assets/ChestYellow.png"
  );
  const [drumImg2, setDrumImg2] = React.useState<string>(
    "/assets/ChestYellow.png"
  );
  const [drumImg3, setDrumImg3] = React.useState<string>(
    "/assets/ChestYellow.png"
  );

  const drumImgs: string[] = [
    "/assets/ChestYellow.png",
    "/assets/sword.png",
    "/assets/heart.png",
    "/assets/Free-spins.png",
    "/assets/Wild.png",
  ];

  React.useEffect(() => {
    if (!spinning) {
      return;
    }

    spinDrum();
  }, [spinning]);

  React.useEffect(() => {
    setDrumImg(drums[0], setDrumImg1);
    setDrumImg(drums[1], setDrumImg2);
    setDrumImg(drums[2], setDrumImg3);

    setSpinning(false);
  }, [drums]);

  const setDrumImg = (
    drum: Drum,
    setImg: React.Dispatch<React.SetStateAction<string>>
  ) => {
    switch (drum) {
      case Drum.TREASURE:
        setImg("/assets/ChestYellow.png");
        break;
      case Drum.FIGHT:
        setImg("/assets/sword.png");
        break;
      case Drum.HEAL:
        setImg("/assets/heart.png");
        break;
      case Drum.FREE_SPINS:
        setImg("/assets/Free-spins.png");
        break;
      case Drum.WILD_CARD:
        setImg("/assets/Wild.png");
        break;
      case Drum.TRAP:
        setImg("/assets/trap.png");
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

export default Machine;
