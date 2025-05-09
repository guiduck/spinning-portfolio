import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, GodRays } from "@react-three/postprocessing";

const getSunColorByTime = (hour: number): string => {
  if (hour < 6 || hour > 18) return "#ff8b5c";
  if (hour < 10) return "#ffd580";
  if (hour < 16) return "#fff8b5";
  return "#ffba80";
};

export const Sky: React.FC = () => {
  const [sunPosition, setSunPosition] = useState(
    new THREE.Vector3(0, 100, -170)
  );
  const [moonPosition, setMoonPosition] = useState(new THREE.Vector3(0, 0, 0));
  const sunRef = useRef<THREE.Mesh>(null!);
  const moonRef = useRef<THREE.Mesh>(null!);
  const skyRef = useRef<THREE.Mesh>(null);
  const { clock, scene } = useThree();

  const skyUniforms = useRef({
    timeOfDay: { value: 0 },
  }).current;

  const ambientRef = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    const now = new Date();
    const time =
      (now.getHours() + now.getMinutes() / 60 + clock.getElapsedTime() / 60) %
      24;
    const t = time / 24;
    const angle = t * Math.PI * 2;

    const radius = 200;
    const y = Math.sin(angle) * 100;
    const z = Math.cos(angle) * -radius;

    // const newSun = new THREE.Vector3(0, y, z);
    const newSun = new THREE.Vector3(0, 100, -170);
    const newMoon = newSun.clone().multiplyScalar(-1);
    setSunPosition(newSun);
    setMoonPosition(newMoon);

    skyUniforms.timeOfDay.value = t;
    if (skyRef.current && skyRef.current.material) {
      (skyRef.current.material as THREE.ShaderMaterial).uniformsNeedUpdate =
        true;
    }

    if (sunRef.current) {
      const intensity = THREE.MathUtils.clamp(Math.sin(angle) * 0.8, 0.1, 0.8);
      const sunColor = new THREE.Color(getSunColorByTime(now.getHours()));
      const material = sunRef.current.material as THREE.MeshStandardMaterial;
      material.emissive.copy(sunColor);
      material.color.copy(sunColor);
      material.emissiveIntensity = intensity;
    }

    if (ambientRef.current) {
      // Dim ambient light at night
      const nightFactor = Math.max(0.1, Math.sin(angle));
      ambientRef.current.intensity = nightFactor;
    }

    if (skyRef.current) {
      skyRef.current.rotation.y += 0.001;
    }
  });

  const initialSunColor = new THREE.Color(
    getSunColorByTime(new Date().getHours())
  );

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.5} />

      <mesh ref={skyRef} scale={500}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          side={THREE.BackSide}
          uniforms={skyUniforms}
          vertexShader={`
            varying vec3 vWorldPosition;
            void main() {
              vec4 worldPosition = modelMatrix * vec4(position, 1.0);
              vWorldPosition = worldPosition.xyz;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vWorldPosition;
            uniform float timeOfDay;

            void main() {
              float h = normalize(vWorldPosition).y;
              vec3 nightColor = vec3(0.02, 0.02, 0.07);
              vec3 dayColor = vec3(0.5, 0.8, 1.0);
              vec3 dawnDuskColor = vec3(1.0, 0.4, 0.3);

              vec3 topColor = mix(nightColor, dayColor, smoothstep(0.25, 0.75, timeOfDay));
              vec3 bottomColor = mix(nightColor, dawnDuskColor, 1.0 - abs(h));

              gl_FragColor = vec4(mix(bottomColor, topColor, h * 0.5 + 0.5), 1.0);
            }
          `}
        />
      </mesh>

      <mesh ref={sunRef} position={sunPosition}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial
          emissive={initialSunColor}
          emissiveIntensity={0.1}
          color={initialSunColor}
        />
      </mesh>

      <mesh ref={moonRef} position={moonPosition}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshStandardMaterial emissive={"#8888ff"} emissiveIntensity={0.1} />
      </mesh>

      <EffectComposer>
        <Bloom intensity={0.2} luminanceThreshold={0.1} />
        <GodRays
          sun={sunRef.current}
          samples={60}
          density={1.97}
          decay={0.98}
          weight={0.9}
          exposure={0.3}
          clampMax={1.0}
          blur
        />
      </EffectComposer>
    </>
  );
};

export default Sky;
