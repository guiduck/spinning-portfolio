import { useAnimations, useGLTF } from "@react-three/drei";
import planeScene from "@/assets/3d/plane.glb";
import { PlaneProps } from "./types";
import { useEffect, useRef } from "react";

export const Plane: React.FC<PlaneProps & JSX.IntrinsicElements["mesh"]> = ({
  isRotating,
  ...props
}) => {
  const planeRef = useRef(null);

  const { scene, animations } = useGLTF(planeScene) as any;
  const { actions } = useAnimations(animations, planeRef);

  useEffect(() => {
    if (isRotating) {
      actions["Take 001"]?.play();
    } else {
      actions["Take 001"]?.stop();
    }

    planeRef.current.rotation.x = 0.1 * Math.PI;
  }, [actions, isRotating]);

  return (
    <mesh ref={planeRef} position={[-3, 0.2, 2]} {...props}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Plane;
