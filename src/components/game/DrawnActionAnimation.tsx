import { Container, Sprite, Text } from "@pixi/react";
import React, { useEffect, useRef, useState } from "react";
import { DrawnActionAnimationInterface } from "../../types";
import { TextStyle } from "pixi.js";

interface Props {
  image: string;
  text: string;
  setShowDrawnActionAnimation: React.Dispatch<
    React.SetStateAction<DrawnActionAnimationInterface>
  >;
}

const SCALE_GROWTH_RATE = 0.015;
const INTERVAL_MS = 10;
const ANIMATION_DURATION_MS = 1500;

const DrawnActionAnimation: React.FC<Props> = ({
  image,
  text,
  setShowDrawnActionAnimation,
}) => {
  const [scale, setScale] = useState(1);
  const timeRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current += INTERVAL_MS;

      setScale((prevScale) =>
        timeRef.current < ANIMATION_DURATION_MS / 2
          ? prevScale + SCALE_GROWTH_RATE
          : prevScale - SCALE_GROWTH_RATE
      );
    }, INTERVAL_MS);

    const timeout = setTimeout(() => {
      setShowDrawnActionAnimation({ show: false, image: "", text: "" });
    }, ANIMATION_DURATION_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Container position={[400, 300]} scale={scale}>
      <Sprite image={image} x={0} y={0} anchor={0.5} />
      <Text
        text={text}
        x={0}
        y={50}
        anchor={0.5}
        style={
          new TextStyle({
            fontFamily: '"VT323", "monospace"',
            fontSize: 40,
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2,
          })
        }
      />
    </Container>
  );
};

export default DrawnActionAnimation;
