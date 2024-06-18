import * as THREE from "three";
import { a } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import planeScene from "@/assets/3d/plane.glb";

export const Plane: React.FC = () => {
  const plane = useGLTF(planeScene) as any;

  return (
    <mesh>
      <primitive object={plane.scene} />
    </mesh>
  );
};

export default Plane;
