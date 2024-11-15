import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { ChromePicker } from "react-color";
import { ObjectsMap } from "@/context/colorsContext";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTFResult } from "@/context/types";
import { ColorPickerContext } from "@/context/colorsContext";

export interface ColorPickerProps {
  onClose: () => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ onClose }) => {
  const { selectedObject } = useContext(ColorPickerContext);
  const { nodes, materials } = useGLTF(
    ObjectsMap[selectedObject]
  ) as GLTFResult["KamisamaPlanet"];

  const [selectedMaterial, setSelectedMaterial] =
    useState<keyof typeof materials>("Material.002");
  const [color, setColor] = useState("#ff0000");

  const getMeshColor = (materialIndex: keyof typeof materials) => {
    return materials[materialIndex].color;
  };

  const setMeshColor = (
    color: string,
    materialIndex: keyof typeof materials
  ) => {
    const materialColor = new THREE.Color(color);
    materials[materialIndex].color = materialColor;
    materials[materialIndex].needsUpdate = true;
  };

  const nodesArray = Object.values(nodes);

  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMaterial(e.target.value as keyof typeof materials);
  };

  const handleColorChange = (color: { hex: string }) => {
    setColor(color.hex);
    setMeshColor(color.hex, selectedMaterial);
  };

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[100]">
      <button
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
        onClick={(event) => {
          event?.stopPropagation();
          onClose();
        }}
      />
      <div className="bg-white p-4 rounded-lg shadow-lg z-10">
        <button onClick={onClose}>Close</button>
        {/* {/* <select value={selectedMaterial} onChange={handleMaterialChange}>
          {Object.keys(materials).map((materialKey) => (
            <option key={materialKey} value={materialKey}>
              {materialKey}
            </option>
          ))}
        </select>
        <ChromePicker color={color} onChange={handleColorChange} /> */}
        {nodesArray.map((mesh) => (
          <div
            key={mesh.uuid}
            className="flex items-center justify-center my-2"
          >
            {/* <div
              className="w-10 h-10 rounded-full"
              style={{
                backgroundColor: (
                  mesh.material as THREE.MeshStandardMaterial
                ).color.getStyle(),
              }}
              onClick={() =>
                setSelectedMaterial(
                  (mesh.material as THREE.MeshStandardMaterial)
                    .name as keyof typeof materials
                )
              }
            /> */}
            <span className="ml-2">{mesh.name}</span>
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
};
