import React, { createRef, ReactElement, RefObject } from "react";
import styles from "../styles/components/Window.module.css";
import Draggable from "react-draggable";
import { Task } from "./Task";
import { UniversalProvider } from "./utils/UniversalProvider";

export interface WindowProps {
  title: string;
  icon: string;
  children?: ReactElement;
  taskRef?: RefObject<Task>;
  zIndex?: number;
  onWindowGrab?: (index: number) => void;
}

export interface WindowStates {
  open?: boolean;
  show?: boolean;
  fullscreen?: boolean;
  windowedWidth?: number | string;
  windowedHeight?: number | string;
  zIndex?: number;
}

export class Window extends React.Component<WindowProps, WindowStates> {
  private contentRef?: RefObject<ReactElement>;

  constructor(props: WindowProps) {
    super(props);
    this.state = {
      // Default values
      open: false,
      show: true,
      fullscreen: false,
      windowedWidth: 500,
      windowedHeight: 35,
      zIndex: this.props.zIndex,
    };
    this.contentRef = React.createRef();
  }

  toggleMinimiseWindow = () => {
    this.setState({
      show: !this.state.show,
    });
    this.props.taskRef?.current?.setState({
      show: true,
      isSelected: !this.props.taskRef.current.state.isSelected,
    });
  };

  toggleShow = () => {
    this.setState({
      open: !this.state.open,
      fullscreen: false,
    });
    this.props.taskRef?.current?.toggleShow();
    this.props.taskRef?.current?.setState({
      isSelected: true,
    });
  };

  toggleFullscreen = () => {
    this.setState({
      fullscreen: !this.state.fullscreen,
    });
  };

  decrementZIndex = () => {
    this.setState({
      zIndex: this.state.zIndex! - 1,
    });
  };

  setZIndex = (zIndex: number) => {
    this.setState({
      zIndex: zIndex,
    });
  };

  mainWindow = () => {
    return (
      <>
        <div
          className={styles.window_handle}
          style={{
            position: this.state.fullscreen ? "fixed" : "static",
            minWidth: this.state.fullscreen ? "100%" : this.state.windowedWidth,
            height: this.state.windowedHeight,
          }}
        >
          <img
            src={this.props.icon}
            style={{ maxHeight: (this.state.windowedHeight! as number) - 10 }}
            className={styles.icon}
          />
          <p className={styles.title}>{this.props.title}</p>
          <img
            src={"subtract.svg"}
            style={{ maxHeight: (this.state.windowedHeight! as number) - 15 }}
            className={styles.minimise}
            onClick={(_) => this.toggleMinimiseWindow()}
          />
          <span className={styles.title}></span>
          <img
            src={
              this.state.fullscreen ? "exit-full-screen.svg" : "full-screen.svg"
            }
            style={{ maxHeight: (this.state.windowedHeight! as number) - 15 }}
            className={styles.x}
            onClick={(_) => this.toggleFullscreen()}
          />
          <span className={styles.title}></span>
          <img
            src={"x-symbol.svg"}
            style={{ maxHeight: (this.state.windowedHeight! as number) - 15 }}
            className={styles.x}
            onClick={(_) => this.toggleShow()}
          />
        </div>
        <div
          className={
            this.state.fullscreen
              ? styles.window_content_background_fullscreen
              : styles.window_content_background
          }
          style={
            this.state.fullscreen
              ? {
                  top: this.state.windowedHeight + "px",
                  width: "100%",
                  position: "fixed",
                  height: "100%",
                }
              : { width: this.state.windowedWidth }
          }
        >
          <div className={styles.window_content}>{this.props.children!}</div>
        </div>
      </>
    );
  };

  render() {
    const windowRef = createRef<HTMLDivElement>();

    return this.state.open ? (
      <div
        className={styles.window}
        style={this.state.show ? {} : { display: "none" }}
      >
        <UniversalProvider>
          {this.state.fullscreen ? (
            <div
              style={{
                flex: 1,
                position: "fixed",
                zIndex: 10000,
                top: 0,
                left: 0,
              }}
            >
              {this.mainWindow()}
            </div>
          ) : (
            <Draggable
              defaultPosition={{
                x: 0,
                y: 0,
              }}
              handle={"." + styles.window_handle}
              onStart={(_) => {
                if (this.props.onWindowGrab)
                  this.props.onWindowGrab(this.props.zIndex! - 100);
              }}
            >
              <div
                ref={windowRef}
                style={{
                  position: "fixed",
                  top: 30 + "%",
                  left: 30 + "%",
                  zIndex: this.state.zIndex,
                }}
              >
                {this.mainWindow()}
              </div>
            </Draggable>
          )}
        </UniversalProvider>
      </div>
    ) : null;
  }
}
