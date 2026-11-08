const Background = ({ color, y, x = 0, z = -100, width, height }: any) => {
  return (
    <mesh position={[x, y, z]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Background;
