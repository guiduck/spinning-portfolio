import * as THREE from "three";
import { a } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import planeScene from "@/assets/3d/plane.glb";
import { PlaneProps } from "./types";

export const Plane: React.FC<PlaneProps & JSX.IntrinsicElements["mesh"]> = ({
  isRotating,
  ...props
}) => {
  const { scene, animations } = useGLTF(planeScene) as any;

  return (
    <mesh position={[-3, 0.2, 2]} {...props}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Plane;
