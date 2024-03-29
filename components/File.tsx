import Image from "next/image";
import React, { RefObject } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import styles from "../styles/components/File.module.css";
import { Window } from "./Window";

export interface FileProps {
  name: string;
  icon: string;
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

  componentDidMount(): void {
    // Default values
    let { name, icon } = this.props;
    if (!name) name = "FILE";
    if (!icon) name = "/txt-file-icon.svg";
  }

  handleDragStart = (_: DraggableEvent, data: DraggableData): void => {
    this.setState({
      xBef: data.x,
      yBef: data.y,
    });
  };

  handleDragStop = (_: DraggableEvent, data: DraggableData): void => {
    if (data.x == this.state.xBef && data.y == this.state.yBef)
      if (this.props.windowRef.current?.props.taskRef?.current?.state.show)
        this.props.windowRef.current?.toggleMinimiseWindow();
      else this.props.windowRef.current?.toggleShow();
  };

  render() {
    return (
      <Draggable onStart={this.handleDragStart} onStop={this.handleDragStop}>
        <div className={styles.file}>
          <Image
            src={this.props.icon}
            className={styles.icon}
            alt="ICON"
            width={75}
            height={75}
          />
          <div className={styles.file_name}>{this.props.name}</div>
        </div>
      </Draggable>
    );
  }
}
