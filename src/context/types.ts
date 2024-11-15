import { KamisamaPlanetGLTFResult } from "@/models/KamisamaPlanet/types";
import { GLTF } from "three-stdlib";

export type GLTFResult = GLTF & {
  KamisamaPlanet: KamisamaPlanetGLTFResult;
};

export type ObjectKeys = "KamisamaPlanet";
