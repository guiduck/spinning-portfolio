import * as THREE from "three";
import { GLTF } from "three-stdlib";

export interface KamisamaPlanetProps {
  isRotating: boolean;
  setIsRotating: React.Dispatch<React.SetStateAction<boolean>>;
}

export type GLTFResult = GLTF & {
  nodes: {
    Icosphere_1: THREE.Mesh;
    Icosphere_2: THREE.Mesh;
    Icosphere001_1: THREE.Mesh;
    Cylinder_1: THREE.Mesh;
    Sphere_1: THREE.Mesh;
    Sphere_2: THREE.Mesh;
    Sphere001_1: THREE.Mesh;
    Sphere001_2: THREE.Mesh;
    Cylinder001_1: THREE.Mesh;
    Cylinder002_1: THREE.Mesh;
    Sphere002_1: THREE.Mesh;
    Sphere002_2: THREE.Mesh;
    Sphere003_1: THREE.Mesh;
    Sphere003_2: THREE.Mesh;
    Cylinder003_1: THREE.Mesh;
    Icosphere002_1: THREE.Mesh;
    Icosphere002_2: THREE.Mesh;
    Cylinder004_1: THREE.Mesh;
    Cube_1: THREE.Mesh;
    Sphere004_1: THREE.Mesh;
    Sphere004_2: THREE.Mesh;
    Sphere004_3: THREE.Mesh;
    Cylinder005_1: THREE.Mesh;
    Cylinder005_2: THREE.Mesh;
    Cylinder006_1: THREE.Mesh;
    Cylinder006_2: THREE.Mesh;
    Cylinder007_1: THREE.Mesh;
    Cylinder007_2: THREE.Mesh;
    Sphere005_1: THREE.Mesh;
    Sphere005_2: THREE.Mesh;
    Sphere005_3: THREE.Mesh;
    Sphere006_1: THREE.Mesh;
    Sphere006_2: THREE.Mesh;
    Sphere006_3: THREE.Mesh;
    Plane_1: THREE.Mesh;
    Plane001_1: THREE.Mesh;
    Plane002_1: THREE.Mesh;
    Plane003_1: THREE.Mesh;
    Plane003_2: THREE.Mesh;
    Cube001_1: THREE.Mesh;
    Plane004_1: THREE.Mesh;
    Cube002_1: THREE.Mesh;
    Icosphere003_1: THREE.Mesh;
    Icosphere004_1: THREE.Mesh;
    Icosphere005_1: THREE.Mesh;
    Icosphere006_1: THREE.Mesh;
    Icosphere007_1: THREE.Mesh;
    Icosphere008_1: THREE.Mesh;
  };
  materials: {
    ["Material.002"]: THREE.MeshStandardMaterial;
    ["Material.013"]: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Icosphere.007"]: THREE.MeshStandardMaterial;
    ["Material.015"]: THREE.MeshStandardMaterial;
    ["Material.012"]: THREE.MeshStandardMaterial;
    ["Material.014"]: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshStandardMaterial;
    ["Material.006"]: THREE.MeshStandardMaterial;
    ["Material.005"]: THREE.MeshStandardMaterial;
    ["Material.011"]: THREE.MeshStandardMaterial;
    ["Material.010"]: THREE.MeshStandardMaterial;
    ["Material.009"]: THREE.MeshStandardMaterial;
    ["Material.007"]: THREE.MeshStandardMaterial;
    ["Material.008"]: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
    ["Material.004"]: THREE.MeshStandardMaterial;
  };
};
