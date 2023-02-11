import { createContext, useState } from "react";

export interface UniversalContextProps {
  [key: string]: any;
  updateChildState: (newState: { [key: string]: any }) => void;
  clearChildState: () => void;
}

export const UniversalContext = createContext<UniversalContextProps>({
  updateChildState: (newState: { [key: string]: any }) => {},
  clearChildState: () => {},
});

type UniversalProviderProps = {
  children?: React.ReactNode;
};

export const UniversalProvider: React.FC<UniversalProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState({});

  const updateChildState = (newState: { [key: string]: any }) => {
    setState({ ...state, ...newState });
  };

  const clearChildState = () => {
    setState({});
  };

  return (
    <UniversalContext.Provider
      value={{ ...state, updateChildState, clearChildState }}
    >
      {children}
    </UniversalContext.Provider>
  );
};
