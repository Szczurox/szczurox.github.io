import React, { createRef, RefObject } from "react";
import Image from "next/image";
import styles from "../styles/components/Task.module.css";
import { Window } from "./Window";
import { ContextMenu } from "./ContextMenu";

export interface TaskProps {
  name: string;
  icon: string;
  windowRef: RefObject<Window>;
  position?: number;
  id?: number;
}

export interface TaskStates {
  isHovering: boolean;
  isSelected: boolean;
  show: boolean;
  menuOpen: boolean;
}

export class Task extends React.Component<TaskProps, TaskStates> {
  menuRef = createRef<ContextMenu>();
  elementRef = createRef<HTMLDivElement>();

  constructor(props: TaskProps) {
    super(props);
    this.state = {
      isHovering: false,
      isSelected: false,
      show: false,
      menuOpen: false,
    };
  }

  componentDidMount(): void {
    document.addEventListener("keydown", this.handleClick);
    document.addEventListener("click", this.handleClick);
    document.addEventListener("contextmenu", this.handleClick);
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.handleClick);
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener("contextmenu", this.handleClick);
  }

  handleClick = (e: Event): void => {
    if (
      ((e.type == "contextmenu" || e.type == "click") &&
        !this.elementRef.current?.contains(e.target as Node)) ||
      (e.type == "keydown" && (e as KeyboardEvent).key == "Escape")
    )
      this.menuRef.current?.handleClick();
  };

  toggleSelect = (): void => {
    this.props.windowRef.current?.toggleMinimiseWindow();
    this.setState({
      isSelected: !this.state.isSelected,
    });
  };

  toggleShow = (): void => {
    this.setState({
      show: !this.state.show,
    });
  };

  closeWindow = (): void => {
    this.props.windowRef.current?.toggleShow();
  };

  render() {
    return this.state.show ? (
      <>
        <ContextMenu ref={this.menuRef}>
          <>
            <li
              onClick={(_) =>
                !this.state.isSelected ? this.toggleSelect() : null
              }
            >
              <Image width={15} height={15} src={this.props.icon} alt="ICON" />
              <p>{this.props.name}</p>
            </li>
            <li onClick={(_) => this.closeWindow()}>
              <Image width={15} height={15} src={"/x-symbol.svg"} alt="ICON" />
              <p>Close Window</p>
            </li>
          </>
        </ContextMenu>
        <div
          className={this.state.isSelected ? styles.task_selected : styles.task}
          onContextMenu={this.menuRef.current?.handleContextMenu}
          ref={this.elementRef}
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
              width={30}
              height={30}
              src={this.props.icon}
              className={styles.icon}
              alt="ICON"
              style={{
                marginLeft: "0.5vw",
                marginRight: "0.5vw",
                marginTop: "0.25vh",
              }}
            />
          </div>
        </div>
      </>
    ) : null;
  }
}
