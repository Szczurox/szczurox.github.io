import { createContext, useState } from "react";

export interface UniversalContextProps {
  [key: string]: any;
  setChildState: (newState: { [key: string]: any }) => void;
}

export const UniversalContext = createContext<UniversalContextProps>({
  setChildState: (newState: { [key: string]: any }) => {},
});

type UniversalProviderProps = {
  children?: React.ReactNode;
};

export const UniversalProvider: React.FC<UniversalProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState({});

  const setChildState = (newState: { [key: string]: any }) => {
    setState({ ...newState });
  };

  return (
    <UniversalContext.Provider value={{ ...state, setChildState }}>
      {children}
    </UniversalContext.Provider>
  );
};
