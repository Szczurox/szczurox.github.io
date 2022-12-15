import React, { useRef, useState } from "react";
import styles from "../styles/components/Window.module.css";
import { Resizable, ResizeCallbackData } from "react-resizable";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

interface WindowProps {
  title?: string;
  icon?: string;
  children?: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  title = "Window",
  icon = "txt-file-icon.svg",
  children,
}) => {
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
            <img
              src={icon}
              style={{ maxHeight: handleHeight - 10 }}
              className={styles.icon}
            />
            <p className={styles.title}>{title}</p>
          </div>
          <div
            className={styles.window_content_background}
            style={{
              width: handleWidth,
              minHeight: handleHeight,
            }}
          >
            <div className={styles.window_content}>{children}</div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};
