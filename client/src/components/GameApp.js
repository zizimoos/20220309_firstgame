import React, { useState } from "react";
import { RecoilRoot } from "recoil";
import io from "socket.io-client";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import PlayGround from "./GameResource/PlayGround";
import Player from "./GameResource/Player";
import OtherPlayers from "./GameResource/OtherPlayers";
// import { useRecoilState } from "recoil";
// import { isLoginState, myIdState, playersArrayClientState } from "../atoms";

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
  const [PlayerArry, setPlayerArry] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [myId, setMyId] = useState("");

  socket.on("init", ({ id, playersArrayServer }) => {
    setPlayerArry(playersArrayServer);
    setIsLogin(true);
    setMyId(id);

    socket.on("move-otherPlayer", (playersArrayServer) => {
      console.log("playersArrayServer", playersArrayServer);
      setPlayerArry(playersArrayServer);
    });
  });
  console.log("PlayerArry", PlayerArry);
  return (
    <Container>
      <Title>PlayGround</Title>
      <LoginMessage>{isLogin ? `Hello : ${myId}  connected` : ""}</LoginMessage>
      <CanvasContainer>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Player id={myId} socket={socket} />
          {PlayerArry.map((id, index) => (
            <OtherPlayers key={index} id={id} />
          ))}
          <PlayGround />
        </Canvas>
      </CanvasContainer>
    </Container>
  );
}

export default GameApp;
