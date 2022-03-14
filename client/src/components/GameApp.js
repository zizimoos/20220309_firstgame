import React from "react";
import { RecoilRoot } from "recoil";
import io from "socket.io-client";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import PlayGround from "./GameResource/PlayGround";
import Player from "./GameResource/Player";
import OtherPlayers from "./GameResource/OtherPlayers";
import Coin from "./GameResource/Coin";
import { useRecoilState } from "recoil";
import {
  isLoginState,
  myIdState,
  playersArrayClientState,
  coinsArrayClientState,
} from "../atoms";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: black;
`;
const LoginMessage = styled.div`
  font-size: 1rem;
`;
const CanvasContainer = styled.div`
  width: 800px;
  height: 800px;
  background-color: black;
`;

const socket = io("http://localhost:3003");

function GameApp(props) {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [myId, setMyId] = useRecoilState(myIdState);
  const [PlayerArry, setPlayerArry] = useRecoilState(playersArrayClientState);
  const [coinArry, setCoinArry] = useRecoilState(coinsArrayClientState);

  socket.on("init", ({ id, playersArrayServer, coinsArrayServer }) => {
    setPlayerArry(playersArrayServer);
    setCoinArry(coinsArrayServer);
    setIsLogin(true);
    setMyId(id);

    socket.on("move-otherPlayer", (playersArrayServer) => {
      console.log("playersArrayServer", playersArrayServer);
      setPlayerArry(playersArrayServer);
    });

    socket.on("remove-coin", (coinsArrayServer) => {
      // console.log("new_coinsArrayServer", coinsArrayServer);
      setCoinArry(coinsArrayServer);
    });
  });
  console.log("PlayerArry", PlayerArry);
  return (
    <Container>
      <Title>PlayGround</Title>
      <LoginMessage>
        {isLogin ? `PlayerId : ${myId}  connected` : ""}
      </LoginMessage>
      <CanvasContainer>
        <Canvas>
          <RecoilRoot>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Player
              id={myId}
              socket={socket}
              coinArry={coinArry}
              playerArray={PlayerArry}
            />
            {PlayerArry.map((otherPlayer, index) => (
              <OtherPlayers
                key={index}
                id={otherPlayer.id}
                x={otherPlayer.x}
                y={otherPlayer.y}
              />
            ))}
            {coinArry.map((coin, index) => (
              <Coin key={index} id={coin.id} x={coin.x} y={coin.y} />
            ))}
            <PlayGround />
          </RecoilRoot>
        </Canvas>
      </CanvasContainer>
    </Container>
  );
}

export default GameApp;
