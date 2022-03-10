import React from "react";

function OtherPlayers(props) {
  return (
    <group>
      <mesh position={[1, 0, 0]} castShadow>
        <boxBufferGeometry attach="geometry" args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial attach="material" color="fuchsia" />
      </mesh>
    </group>
  );
}

export default OtherPlayers;
