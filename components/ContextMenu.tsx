import React, { ReactElement } from "react";
import styles from "../styles/components/ContextMenu.module.css";

export interface ContextMenuProps {
  children?: ReactElement;
}

export interface ContextMenuStates {
  menuOpen: boolean;
  menuPoint: { x: number; y: number };
}

export class ContextMenu extends React.Component<
  ContextMenuProps,
  ContextMenuStates
> {
  constructor(props: ContextMenuProps) {
    super(props);
    this.state = {
      menuOpen: false,
      menuPoint: {
        x: 0,
        y: 0,
      },
    };
  }

  handleClick = (): void => {
    if (this.state.menuOpen) this.setState({ menuOpen: false });
  };

  handleContextMenu = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();

    this.setState({
      menuPoint: {
        x:
          event.pageX < window.innerWidth - (window.innerWidth / 100) * 10
            ? event.pageX
            : event.pageX - window.innerWidth / 10,
        y:
          event.pageY < window.innerHeight - (window.innerHeight / 100) * 10
            ? event.pageY
            : event.pageY - window.innerHeight / 20,
      },
    });

    this.setState({ menuOpen: true });
  };

  render() {
    return this.state.menuOpen ? (
      <ul
        className={styles.context_menu}
        style={{ top: this.state.menuPoint.y, left: this.state.menuPoint.x }}
      >
        {this.props.children}
      </ul>
    ) : null;
  }
}
