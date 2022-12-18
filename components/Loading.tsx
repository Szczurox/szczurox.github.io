import React from "react";

export interface LoadingProps {
  loading: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ loading }) => {
  return loading ? <div></div> : null;
};

export default Loading;
