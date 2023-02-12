import Image from "next/image";
import React, { RefObject } from "react";
import styles from "../styles/components/Task.module.css";
import { Window } from "./Window";

export interface TaskProps {
  name: string;
  icon: string;
  windowRef: RefObject<Window>;
}

export interface TaskStates {
  isHovering: boolean;
  isSelected: boolean;
  show: boolean;
}

export class Task extends React.Component<TaskProps, TaskStates> {
  constructor(props: TaskProps) {
    super(props);
    this.state = {
      isHovering: false,
      isSelected: false,
      show: false,
    };
  }

  toggleSelect = () => {
    this.props.windowRef.current?.toggleMinimiseWindow();
    this.setState({
      isSelected: !this.state.isSelected,
    });
  };

  toggleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return this.state.show ? (
      <div
        className={this.state.isSelected ? styles.task_selected : styles.task}
      >
        {this.state.isHovering ? (
          <div className={styles.name}>{this.props.name}</div>
        ) : null}
        <div
          onClick={() => this.toggleSelect()}
          onMouseOver={() =>
            this.setState({
              isHovering: true,
            })
          }
          onMouseLeave={() =>
            this.setState({
              isHovering: false,
            })
          }
        >
          <Image
            src={this.props.icon}
            className={this.state.isHovering ? styles.icon_hover : styles.icon}
            alt="ICON"
          />
        </div>
      </div>
    ) : null;
  }
}
