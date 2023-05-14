import React from "react";
import { createDesktopElement } from "../utils/Element";
import { UniversalContext } from "../utils/UniversalProvider";
import styles from "../../styles/components/elements/ReadMe.module.css";

export class ReadMeWindowContent extends React.Component {
  static contextType = UniversalContext;
  context!: React.ContextType<typeof UniversalContext>;

  render() {
    return (
      <div
        className={styles.readme}
        style={{
          overflowY: "scroll",
          maxHeight: this.context.fullscreen
            ? "95vh"
            : this.context.windowedHeight
            ? this.context.windowedHeight
            : "280px",
        }}
      >
        <p>
          Hello World! Szczczurox here <br />
          Welcome to my website!
          <br />
          <br />
          I am a programmer from Poland who likes to work on projects in many
          different fields.
          <br />
          <br />
          I don't work professionally yet but if you like any of my projects and
          would want me to create something for you or would like to collab you
          can message me on Discord (SzczuroxPL#4611) or email
          plszczurox@gmail.com
          <br />
          <br />
          What you can find on this site:
          <br />- This file
          <br />- Console with some basic commands (use "help" for information
          on commands)
          <br />- Minesweeper minigame
          <br />- Link to my other project,{" "}
          <a
            href={"https://faicamp.vercel.app"}
            style={{ color: "white", textDecoration: "underline" }}
          >
            Faicamp
          </a>
          <br />
          <br />
          As you can see website''s UI tries to imitate desktop.
          <br />
          You can open, close, resize and minimise windows as well as open files
          in fullscreen mode.
          <br />
        </p>
      </div>
    );
  }
}

export const ReadMeElement = createDesktopElement({
  fileName: "README",
  iconPath: "/txt-file-icon.svg",
  children: <ReadMeWindowContent />,
  width: 620,
  height: 320,
});

export default ReadMeElement;
