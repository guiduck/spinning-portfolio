import { useGLTF } from "@react-three/drei";
import birdScene from "@/assets/3d/bird.glb";

export const Bird: React.FC = () => {
  const { scene, animations } = useGLTF(birdScene) as any;

  return (
    <mesh position={[-4, 1.2, 2]}>
      <primitive object={scene} scale={[0.002, 0.002, 0.002]} />
    </mesh>
  );
};

export default Bird;
