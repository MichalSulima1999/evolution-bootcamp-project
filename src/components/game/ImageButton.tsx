import React from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick: () => void;
  imgPath: string;
  imgPressedPath: string;
  width: string;
  height: string;
}

type StyledButtonProps = Omit<ButtonProps, "OnClick">;

const Button = styled.button<StyledButtonProps>`
  background: url(${(props) => props.imgPath}) no-repeat 0 0 transparent;
  background-size: cover;
  image-rendering: auto;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
  border: 0;
  color: #000000;
  cursor: pointer;
  font-weight: bold;
  height: ${(props) => props.height};
  padding-bottom: 2px;
  width: ${(props) => props.width};

  &:hover {
    background: url(${(props) => props.imgPressedPath}) no-repeat 0 0
      transparent;
    background-size: cover;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    border: 0;
    color: #000000;
    cursor: pointer;
    font-weight: bold;
    height: ${(props) => props.height};
    padding-bottom: 2px;
    width: ${(props) => props.width};
  }
`;

const ImageButton: React.FC<ButtonProps> = ({
  onClick,
  imgPath,
  imgPressedPath,
  width,
  height,
}) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <Button
      onClick={handleClick}
      imgPath={imgPath}
      imgPressedPath={imgPressedPath}
      width={width}
      height={height}
    ></Button>
  );
};

export default ImageButton;
