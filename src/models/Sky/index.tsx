import * as THREE from "three";
import { a } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import skyScene from "@/assets/3d/sky.glb";

export const Sky: React.FC = () => {
  const sky = useGLTF(skyScene) as any;

  return (
    // <a.mesh
    //   name="Sky"
    //   scale={[1000, 1000, 1000]}
    //   rotation={[-Math.PI / 2, 0, 0]}
    // >
    //   <sphereGeometry />
    //   <meshBasicMaterial color={"#b1e1ff"} side={THREE.BackSide} />
    // </a.mesh>

    <mesh>
      <primitive object={sky.scene} />
    </mesh>
  );
};

export default Sky;
