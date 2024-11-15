import { Loader } from "@/components";
import Bird from "@/models/Bird";
import { KamisamaPlanet } from "@/models/KamisamaPlanet";
import Plane from "@/models/Plane";
import Sky from "@/models/Sky";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import { Vector3 } from "three";

// const caioSamaPlanet = (
//   <Html>
//     <div className="">
//       {" "}
//       <iframe
//         title="Kaiosama Planet"
//         allowFullScreen
//         allow="autoplay; fullscreen; xr-spatial-tracking"
//         src="https://sketchfab.com/models/6511869882244ca3b3168b5184acf6e3/embed"
//       >
//         {" "}
//       </iframe>{" "}
//     </div>
//   </Html>
// );
type rotationType = [x: number, y: number, z: number];

const adjustPlanetForScreenSize: () => [
  Vector3,
  Vector3,
  rotationType
] = () => {
  let screenScale = new Vector3(1, 1, 1);
  let screenPosition = new Vector3(0, -0.5, 2.4);
  const rotation: rotationType = [0.52, 0, 0];

  if (window.innerWidth < 768) {
    screenScale = new Vector3(0.9, 0.9, 0.9);
  } else {
    screenPosition = new Vector3(0, -0.7, 2.7);
  }

  return [screenScale, screenPosition, rotation];
};

const adjustPlaneForScreenSize: () => [Vector3, Vector3] = () => {
  let screenScale = new Vector3(0.2, 0.2, 0.2);
  let screenPosition = new Vector3(-0.2, 0.2, 4);

  if (window.innerWidth < 768) {
    screenScale = new Vector3(0.15, 0.15, 0.15);
    screenPosition = new Vector3(-0.2, 0.2, 4);
  }

  return [screenScale, screenPosition];
};

export const Home: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number | null>(0);
  const [isRotating, setIsRotating] = useState(false);

  const [planetScale, planetPosition, planetRotation] =
    adjustPlanetForScreenSize();

  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      {/* <Dialog /> */}

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight
            position={
              new Vector3(
                planetPosition.x,
                planetPosition.y + 4,
                planetPosition.z + 1
              )
            }
            intensity={2}
          />
          <ambientLight intensity={0.5} />
          <hemisphereLight args={["#b1e1ff", "#000000", 1]} />
          <pointLight />
          <Sky />
          <Bird />
          <KamisamaPlanet
            scale={planetScale}
            position={planetPosition}
            rotation={planetRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            scale={planeScale}
            position={planePosition}
            isRotating={isRotating}
            rotation={[0, 20, 0]}
          />
          {/* {caioSamaPlanet} */}
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
