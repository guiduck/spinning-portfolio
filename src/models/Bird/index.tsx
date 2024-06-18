import * as THREE from "three";
import { a } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import birdScene from "@/assets/3d/bird.glb";

export const Bird: React.FC = () => {
  const bird = useGLTF(birdScene) as any;

  return (
    <mesh>
      <primitive object={bird.scene} />
    </mesh>
  );
};

export default Bird;
