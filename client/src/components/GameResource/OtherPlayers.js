import React from "react";

function OtherPlayers({ id, x, y }) {
  return (
    <group>
      <mesh position={[x, y, 0]} castShadow>
        <boxBufferGeometry attach="geometry" args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial attach="material" color="fuchsia" />
      </mesh>
    </group>
  );
}

export default OtherPlayers;
