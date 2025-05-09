import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { ObjectsMap } from "@/context/colorsContext";
import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "@/context/types";
import { ColorPickerContext } from "@/context/colorsContext";

export interface ColorPickerProps {
  onClose: () => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ onClose }) => {
  const { selectedObject, colorMap, setColorMap } =
    useContext(ColorPickerContext);

  const { nodes } = useGLTF(
    ObjectsMap[selectedObject]
  ) as GLTFResult["KamisamaPlanet"];

  const nodesArray = Object.values(nodes).filter(
    (node) => node.type === "Mesh" && node.material
  );

  const handleColorChange = (meshName: string, newColor: string) => {
    setColorMap((prev) => ({
      ...prev,
      [meshName]: newColor,
    }));
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
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-h-[80vh] overflow-y-auto w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Edit Mesh Colors</h2>
          <button className="text-red-500 hover:underline" onClick={onClose}>
            Close
          </button>
        </div>

        {nodesArray.map((mesh) => (
          <div
            key={mesh.uuid}
            className="flex items-center justify-between my-2"
          >
            <span className="text-sm font-medium">{mesh.name}</span>
            <input
              type="color"
              value={colorMap[mesh.name] || "#ffffff"}
              onChange={(e) => handleColorChange(mesh.name, e.target.value)}
              className="ml-4 w-10 h-6 border rounded"
            />
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
};

export default ColorPicker;
