import React from "react";
import styles from "../styles/components/Window.module.css";
import Draggable from "react-draggable";

interface WindowProps {
  title?: string;
  icon?: string;
  show?: boolean;
  children?: React.ReactNode;
}

interface WindowStates {
  show?: boolean;
  handleWidth?: number;
  handleHeight?: number;
}

export class Window extends React.Component<WindowProps, WindowStates> {
  constructor(props: WindowStates) {
    super(props);
    this.state = {
      // Default values
      show: false,
      handleWidth: 500,
      handleHeight: 35,
    };
  }

  toggleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return this.state.show ? (
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
                width: this.state.handleWidth,
                height: this.state.handleHeight,
              }}
            >
              <img
                src={this.props.icon}
                style={{ maxHeight: this.state.handleHeight! - 10 }}
                className={styles.icon}
              />
              <p className={styles.title}>{this.props.title}</p>
              <img
                src={"x-symbol.svg"}
                style={{ maxHeight: this.state.handleHeight! - 15 }}
                className={styles.x}
                onClick={(e) => this.toggleShow()}
              />
            </div>
            <div
              className={styles.window_content_background}
              style={{
                width: this.state.handleWidth,
                minHeight: this.state.handleHeight,
              }}
            >
              <div className={styles.window_content}>{this.props.children}</div>
            </div>
          </div>
        </Draggable>
      </div>
    ) : null;
  }
}
