import React from "react";

function PlayGround(props) {
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[7, 7, 7]} />
      <meshStandardMaterial attach="material" color="hotpink" />
      <axesHelper args={[10]} />
    </mesh>
  );
}

export default PlayGround;
