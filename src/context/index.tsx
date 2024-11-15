import { ReactNode } from "react";
import { ColorPickerContextProvider } from "./colorsContext";

type ProviderProps = {
  children:
    | JSX.Element[]
    | JSX.Element
    | (JSX.Element | JSX.Element[])[]
    | ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return <ColorPickerContextProvider>{children}</ColorPickerContextProvider>;
};

export default Provider;
