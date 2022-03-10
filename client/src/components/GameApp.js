import React, { useState } from "react";
import { RecoilRoot } from "recoil";
import io from "socket.io-client";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import PlayGround from "./GameResource/PlayGround";
import Player from "./GameResource/Player";
import OtherPlayers from "./GameResource/OtherPlayers";
import { useRecoilState } from "recoil";
import { isLoginState, myIdState } from "../atoms";

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
  const [playersArrayClient, setPlayersArrayClient] = useState([]);

  socket.on("init", ({ id, players }) => {
    console.log("my id is", id);
    console.log("players", players);
    setPlayersArrayClient(players);
    setIsLogin(true);
    setMyId(id);

    socket.on("move-otherPlayer", (playersArrayServer) => {
      console.log("playersArrayServer", playersArrayServer);
      setPlayersArrayClient(playersArrayServer);
    });
  });
  return (
    <Container>
      <Title>PlayGround</Title>
      <LoginMessage>{isLogin ? `Hello : ${myId}  connected` : ""}</LoginMessage>
      <CanvasContainer>
        <Canvas>
          <RecoilRoot>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Player id={myId} socket={socket} />
            {playersArrayClient.map((id, index) => (
              <OtherPlayers key={index} id={id} />
            ))}
            <PlayGround />
          </RecoilRoot>
        </Canvas>
      </CanvasContainer>
    </Container>
  );
}

export default GameApp;
