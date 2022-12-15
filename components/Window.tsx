import React, { useRef, useState } from "react";
import styles from "../styles/components/Window.module.css";
import { Resizable, ResizeCallbackData } from "react-resizable";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

interface WindowProps {
  title?: String;
  icon?: String;
}

export const Window: React.FC<WindowProps> = ({ title = "Window" }) => {
  const [handleWidth, setHandleWidth] = useState<number>(500);
  const [handleHeight, setHandleHeight] = useState<number>(35);

  return (
    <div className={styles.window}>
      <Draggable
        defaultPosition={{
          x: 0,
          y: 0,
        }}
        handle={"." + styles.window_handle}
      >
        <div
          style={{
            position: "fixed",
            top: 30 + "%",
            left: 30 + "%",
          }}
        >
          <div
            className={styles.window_handle}
            style={{
              width: handleWidth,
              height: handleHeight,
            }}
          >
            <span>{title}</span>
          </div>
          <div
            className={styles.window_content_background}
            style={{
              width: handleWidth,
              minHeight: handleHeight,
            }}
          >
            <div className={styles.window_content}></div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};
