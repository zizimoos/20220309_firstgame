import React from "react";

function Coin({ id, x, y }) {
  return (
    <group>
      <mesh position={[x, y, 0]} castShadow>
        <sphereBufferGeometry attach="geometry" args={[0.1, 16, 16]} />
        <meshStandardMaterial attach="material" color="mediumBlue" />
      </mesh>
    </group>
  );
}

export default Coin;
