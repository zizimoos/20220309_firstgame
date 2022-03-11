import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { myMoveInfoState } from "../../atoms";

function Player({ id, socket, coinArry }) {
  const myMove = useRef(null);
  const [myMoveInfo, setMyMoveInfo] = useRecoilState(myMoveInfoState);

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
    console.log("myPlayInfo", myPlayInfo);
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
    console.log("target", target);
    if (target.length > 0) {
      socket.emit("coin-remove", target[0].id, myPlayInfo);
    }
  };

  return (
    <group ref={myMove}>
      <mesh>
        <boxGeometry attach="geometry" args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial attach="material" color="teal" />
        <axesHelper args={[1]} />
      </mesh>
    </group>
  );
}

export default Player;
