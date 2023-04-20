import React from "react";
import ImageButton from "./ImageButton";
import { observer } from "mobx-react";
import { useBetStore } from "../../classes/store/BetStore";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
`;

const Title = styled.h2`
  color: white;
  margin-top: 0;
`;

const Text = styled.span`
  font-size: 2rem;
  color: white;
  padding: 1rem;
`;

const Image = styled.img`
  width: 25px;
  margin-right: 5px;
`;

const Bet = observer(function Bet() {
  const { betLess, betMore, bet } = useBetStore();
  return (
    <Container>
      <Title>Bet</Title>
      <ImageButton
        onClick={betLess}
        imgPath="/assets/minus.png"
        imgPressedPath="/assets/minus-pressed.png"
        width="2rem"
        height="2rem"
      />

      <Text>
        <Image src="/assets/coin.png" alt="Money" />
        {bet}
      </Text>
      <ImageButton
        onClick={betMore}
        imgPath="/assets/plus.png"
        imgPressedPath="/assets/plus-pressed.png"
        width="2rem"
        height="2rem"
      />
    </Container>
  );
});

export default Bet;
