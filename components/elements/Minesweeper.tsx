import React from "react";
import { createDesktopElement } from "../utils/Element";
import { UniversalContext } from "../utils/UniversalProvider";
import styles from "../../styles/components/elements/Minesweeper.module.css";

// WORK IN PROGRESS

export interface MinesweeperProps {}

export interface MinesweeperStates {
  currentGameState: number;
}

export class MinesweeperContent extends React.Component<
  MinesweeperProps,
  MinesweeperStates
> {
  static contextType = UniversalContext;
  context!: React.ContextType<typeof UniversalContext>;

  constructor(props: MinesweeperProps) {
    super(props);
    this.state = {
      currentGameState: 0,
    };
  }

  render() {
    return (
      <div
        className={styles.readme}
        style={{
          maxHeight: this.context.fullsreen
            ? "95vh"
            : this.context.windowedHeight - 10,
          paddingLeft: "10px",
        }}
      >
        <p>Future Minesweeper minigame will be there.</p>
      </div>
    );
  }
}

export const MinesweeperElement = createDesktopElement(
  "Minesweeper",
  "/txt-file-icon.svg",
  <MinesweeperContent />
);

export default MinesweeperElement;
