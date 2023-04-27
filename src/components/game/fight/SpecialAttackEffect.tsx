import { AnimatedSprite } from "@pixi/react";
import { Resource, Texture } from "pixi.js";
import React from "react";
import { getFilenamesFromFolder } from "../../../helpers/FileHelper";

interface SpecialAttackEffectProps {
  setSpecialAttackActive: React.Dispatch<React.SetStateAction<boolean>>;
  x: number;
  y: number;
}

const SpecialAttackEffect: React.FC<SpecialAttackEffectProps> = ({
  setSpecialAttackActive,
  x,
  y,
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [textures, setTextures] = React.useState<Texture<Resource>[]>([]);

  const getTextures = (
    name: string,
    numberOfFrames: number
  ): Texture<Resource>[] => {
    const textures = [];

    const images = getFilenamesFromFolder(
      `assets/special_attacks/special_1`,
      `${name}`,
      numberOfFrames
    );

    for (let i = 0; i < numberOfFrames; i++) {
      const texture = Texture.from(images[i]);
      textures.push(texture);
    }
    return textures;
  };

  React.useEffect(() => {
    setTextures(getTextures("special", 8));
    setIsPlaying(true);
  }, []);

  const onComplete = () => {
    setSpecialAttackActive(false);
  };

  return (
    <>
      {isPlaying && (
        <AnimatedSprite
          anchor={0.5}
          textures={textures}
          isPlaying={isPlaying}
          loop={false}
          onComplete={onComplete}
          initialFrame={0}
          animationSpeed={0.1}
          scale={3}
          x={x}
          y={y}
        />
      )}
    </>
  );
};

export default SpecialAttackEffect;
