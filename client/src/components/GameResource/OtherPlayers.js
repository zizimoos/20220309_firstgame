import React from "react";
import { Html } from "@react-three/drei";
import styled from "styled-components";
import { chattingOnState } from "../../atoms";
import { useRecoilState } from "recoil";

const NameTag = styled.div`
  padding-top: 10px;
  transform: translate3d(-20%, -200%, 0);
  text-align: left;
  background: #202035;
  color: white;
  padding: 5px 5px;
  border-radius: 5px;
  font-size: 1rem;
`;

const ChattWindow = styled.div`
  padding: 5px;
  border-radius: 5px;
  background-color: white;
`;

function OtherPlayers({ id, x, y }) {
  const [chattOn, setChattOn] = useRecoilState(chattingOnState);

  return (
    <group>
      <mesh position={[x, y, 0]} castShadow>
        <boxBufferGeometry attach="geometry" args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial attach="material" color="fuchsia" />
        <Html distanceFactor={5}>
          <NameTag> {id.slice(0, 6)} </NameTag>
          {chattOn ? (
            <ChattWindow>
              chatting window chatting window chatting window
            </ChattWindow>
          ) : null}
        </Html>
      </mesh>
    </group>
  );
}

export default OtherPlayers;
