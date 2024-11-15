import { useContext } from "react";
import { ColorPickerContext } from "@/context/colorsContext";

export const useColorPicker = () => {
  const {
    setShowColorPicker,
    showColorPicker,
    selectedObject,
    setSelectedObject,
  } = useContext(ColorPickerContext);
  // if (context === undefined) {
  //   throw new Error(
  //     "useColorPicker must be used within a ColorPickerContextProvider"
  //   );
  // }

  // const  = context;
  // console.log(setShowColorPicker);

  return {
    setShowColorPicker,
    showColorPicker,
    selectedObject,
    setSelectedObject,
  };
};
