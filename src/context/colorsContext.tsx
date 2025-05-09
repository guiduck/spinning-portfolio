import { ReactNode, createContext, useState, useMemo, Dispatch } from "react";
import { ColorPicker } from "@/components/ColorPicker";
import KamisamaPlanetScene from "@/assets/3d/kamisamaPlanet.glb";
import { ObjectKeys } from "./types";

type ColorMap = Record<string, string>;

type ColorPickerProps = {
  setShowColorPicker: Dispatch<React.SetStateAction<boolean>>;
  showColorPicker: boolean;
  selectedObject: ObjectKeys;
  setSelectedObject: Dispatch<React.SetStateAction<ObjectKeys>>;
  colorMap: ColorMap;
  setColorMap: Dispatch<React.SetStateAction<ColorMap>>;
};

type ColorPickerContextProviderProps = {
  children:
    | JSX.Element[]
    | JSX.Element
    | (JSX.Element | JSX.Element[])[]
    | ReactNode;
};

const initialState: ColorPickerProps = {
  setShowColorPicker: () => {},
  showColorPicker: false,
  selectedObject: "KamisamaPlanet",
  setSelectedObject: () => {},
  colorMap: {},
  setColorMap: () => {},
};

const ColorPickerContext = createContext<ColorPickerProps>(initialState);

export const ObjectsMap: Record<ObjectKeys, any> = {
  KamisamaPlanet: KamisamaPlanetScene,
};

const ColorPickerContextProvider = ({
  children,
}: ColorPickerContextProviderProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedObject, setSelectedObject] =
    useState<ObjectKeys>("KamisamaPlanet");
  const [colorMap, setColorMap] = useState<ColorMap>({});

  const renderColorPicker = () => {
    if (!showColorPicker) {
      return null;
    }
    return <ColorPicker onClose={() => setShowColorPicker(false)} />;
  };

  const value = useMemo(
    () => ({
      setShowColorPicker,
      showColorPicker,
      selectedObject,
      setSelectedObject,
      colorMap,
      setColorMap,
    }),
    [showColorPicker, selectedObject, colorMap]
  );

  return (
    <ColorPickerContext.Provider value={value}>
      {children}
      {renderColorPicker()}
    </ColorPickerContext.Provider>
  );
};

export { ColorPickerContextProvider, ColorPickerContext };
