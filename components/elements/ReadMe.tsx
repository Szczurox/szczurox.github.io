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
            : this.context.windowedHeight - 10,
        }}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ipsum
          dolor, ultricies hendrerit dignissim in, pretium in orci. Mauris
          euismod lorem sit amet ipsum dapibus, vel euismod massa pulvinar.
          Vestibulum id ullamcorper nunc. Donec rhoncus ex mauris, ac
          consectetur felis hendrerit in. Vestibulum convallis finibus aliquet.
          Pellentesque rhoncus tortor eget neque commodo vehicula sed a velit.
          Suspendisse nec tristique libero. Sed malesuada dui vel sapien
          vestibulum vulputate. Nullam malesuada imperdiet nisi eget semper. Ut
          malesuada augue eu tristique laoreet. In metus metus, pulvinar vitae
          imperdiet quis, convallis quis sem.
        </p>
      </div>
    );
  }
}

export const ReadMeElement = createDesktopElement({
  fileName: "README",
  iconPath: "/txt-file-icon.svg",
  children: <ReadMeWindowContent />,
});

export default ReadMeElement;
