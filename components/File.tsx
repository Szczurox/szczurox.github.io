import React, { RefObject } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import styles from "../styles/components/File.module.css";
import { Window } from "./Window";

export interface FileProps {
  name?: string;
  icon?: string;
  windowRef: RefObject<Window>;
}

export interface FileStates {
  xBef: number;
  yBef: number;
}

export class File extends React.Component<FileProps, FileStates> {
  constructor(props: FileProps) {
    super(props);
    this.state = {
      xBef: 0,
      yBef: 0,
    };
  }

  handleDragStart = (e: DraggableEvent, data: DraggableData) => {
    this.setState({
      xBef: data.x,
      yBef: data.y,
    });
  };

  handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    if (data.x == this.state.xBef && data.y == this.state.yBef)
      this.props.windowRef.current?.toggleShow();
  };

  render() {
    // Default values
    let { name, icon } = this.props;
    if (!name) name = "FILE";
    if (!icon) name = "txt-file-icon.svg";

    return (
      <Draggable onStart={this.handleDragStart} onStop={this.handleDragStop}>
        <div className={styles.file}>
          <img src={this.props.icon} className={styles.icon} />
          <div className={styles.file_name}>{this.props.name}</div>
        </div>
      </Draggable>
    );
  }
}
