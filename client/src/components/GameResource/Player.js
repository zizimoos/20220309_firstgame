import React, { useRef } from "react";
import { Html } from "@react-three/drei";
import { useRecoilState } from "recoil";
import { myMoveInfoState, chattingOnState } from "../../atoms";
import styled from "styled-components";

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

function Player({ id, socket, coinArry, playerArray }) {
  const myMove = useRef(null);
  const [myMoveInfo, setMyMoveInfo] = useRecoilState(myMoveInfoState);
  const [chattOn, setChattOn] = useRecoilState(chattingOnState);

  document.onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        myMove.current.position.x = myMove.current.position.x -= 0.2;
        break;
      case 39:
        myMove.current.position.x = myMove.current.position.x += 0.2;
        break;
      case 38:
        myMove.current.position.y = myMove.current.position.y += 0.2;
        break;
      case 40:
        myMove.current.position.y = myMove.current.position.y -= 0.2;
        break;
      default:
    }
    const myPlayInfo = {
      id: id,
      x: myMove.current.position.x,
      y: myMove.current.position.y,
      point: 0,
    };
    // console.log("myPlayInfo", myPlayInfo);
    setMyMoveInfo(myPlayInfo);
    socket.emit("player-move", myMoveInfo);

    let target = coinArry.filter((coin) => {
      return (
        coin.x <= myPlayInfo.x + 0.2 &&
        coin.x >= myPlayInfo.x - 0.2 &&
        coin.y <= myPlayInfo.y + 0.2 &&
        coin.y >= myPlayInfo.y - 0.2
      );
    });
    // console.log("target", target);
    if (target.length > 0) {
      socket.emit("coin-remove", target[0].id, myPlayInfo);
    }

    //다른 플레이어어레이 중에 나를 제외하고
    //자신의 위치와 같은 위치의 코인이 있는지 확인
    //있으면 ... 채팅 혹은 화상채팅 할 것인지 물어보고
    console.log("playerArray", playerArray[0].x);
    console.log("myPlayInfo", myPlayInfo.x);

    if (
      playerArray[0].x === myPlayInfo.x &&
      playerArray[0].y === myPlayInfo.y
    ) {
      setChattOn(true);
    }
  };

  return (
    <group ref={myMove}>
      <mesh>
        <boxGeometry attach="geometry" args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial attach="material" color="teal" />
        <Html distanceFactor={5}>
          <NameTag> {id.slice(0, 6)} </NameTag>
          {chattOn ? (
            <ChattWindow>
              chatting window chatting window chatting window
            </ChattWindow>
          ) : null}
        </Html>
        <axesHelper args={[1]} />
      </mesh>
    </group>
  );
}

export default Player;
