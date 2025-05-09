import * as THREE from "three";
import { useRef, useEffect, useState, FC, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh } from "three";

type VoxelParticle = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  age: number;
  sphere: THREE.Vector3[];
};

const generateVoxelShape = (
  size: [number, number, number],
  resolution: number,
  shape: "ellipsoid" | "box"
): THREE.Vector3[] => {
  const [sx, sy, sz] = size;
  const voxels: THREE.Vector3[] = [];

  for (let x = -sx; x <= sx; x++) {
    for (let y = -sy; y <= sy; y++) {
      for (let z = -sz; z <= sz; z++) {
        const nx = x / sx;
        const ny = y / sy;
        const nz = z / sz;

        let include = nx * nx + ny * ny + nz * nz <= 1;

        if (shape === "box") {
          include = true;
        }

        if (include && Math.random() < resolution) {
          voxels.push(new THREE.Vector3(x, y, z));
        }
      }
    }
  }

  return voxels;
};

interface CloudProps {
  count?: number;
  resolution?: number;
  position?: THREE.Vector3;
  emissionSize?: [number, number]; // width, depth
  voxelSize?: number;
  color?: string;
  floatStrength?: number;
  particleLifetime?: [number, number];
  particleSize?: [number, number, number]; // x, y, z size of each particle
  shape?: "ellipsoid" | "box";
}

export const Cloud: FC<CloudProps> = ({
  count = 100,
  resolution = 0.95,
  position = [0, 0, 0],
  emissionSize = [1.5, 0.75],
  voxelSize = 0.03,
  color = "#fff",
  floatStrength = 0.01, // default: gentle float
  particleLifetime = [3, 5], // default: 3–5 sec
  particleSize = [4, 2, 2],
  shape = "ellipsoid",
}) => {
  const [particles, setParticles] = useState<VoxelParticle[]>([]);
  const voxelGeometry = useMemo(
    () => new THREE.BoxGeometry(voxelSize, voxelSize, voxelSize),
    [voxelSize]
  );
  const voxelMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color }),
    [color]
  );

  const instancedRef = useRef<InstancedMesh>(null);
  const origin = useMemo(() => new THREE.Vector3(...position), [position]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    setParticles((prev) => {
      const updated = prev
        .map((p) => ({
          ...p,
          position: p.position
            .clone()
            .add(p.velocity.clone().multiplyScalar(delta)),
          age: p.age + delta,
        }))
        .filter((p) => p.age < p.life);

      while (updated.length < count) {
        const [emissionWidth, emissionDepth] = emissionSize;
        const x = (Math.random() - 0.5) * emissionWidth;
        const z = (Math.random() - 0.5) * emissionDepth;

        const newParticle: VoxelParticle = {
          position: origin.clone().add(new THREE.Vector3(x, 0, z)),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.015,
            (Math.random() - 0.5) * floatStrength,
            (Math.random() - 0.5) * 0.015
          ),
          life:
            particleLifetime[0] +
            Math.random() * (particleLifetime[1] - particleLifetime[0]),
          age: 0,
          sphere: generateVoxelShape(particleSize, resolution, shape),
        };

        updated.push(newParticle);
      }

      return updated;
    });
  });

  useEffect(() => {
    if (!instancedRef.current) return;

    let i = 0;
    for (const particle of particles) {
      for (const voxel of particle.sphere) {
        dummy.position.copy(
          particle.position.clone().add(voxel.clone().multiplyScalar(voxelSize))
        );
        dummy.updateMatrix();
        instancedRef.current.setMatrixAt(i++, dummy.matrix);
        if (i >= instancedRef.current.count) break;
      }
    }

    instancedRef.current.count = i;
    instancedRef.current.instanceMatrix.needsUpdate = true;
  }, [particles, voxelSize]);

  return (
    <instancedMesh
      ref={instancedRef}
      args={[voxelGeometry, voxelMaterial, 4000]}
      frustumCulled={false}
    />
  );
};
