import React from "react";
import { createDesktopElement } from "../utils/Element";
import { UniversalContext } from "../utils/UniversalProvider";

export interface ReadMeProps {}

export interface ReadMeStates {}

export class ReadMeWindowContent extends React.Component {
  static contextType = UniversalContext;
  context!: React.ContextType<typeof UniversalContext>;

  componentDidMount() {
    this.setState({
      fullscreen: this.context.fullscreen,
      windowedWidth: this.context.windowedWidth,
      windowedHeight: this.context.windowedHeight,
    });
  }

  render() {
    return (
      <div
        style={
          this.context.fullscreen
            ? { maxHeight: "95vh" }
            : {
                maxHeight: this.context.windowedHeight - 35,
                whiteSpace: "pre-wrap",
                overflowY: "scroll",
              }
        }
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

export const ReadMeElement = createDesktopElement(
  "README",
  "/txt-file-icon.svg",
  <ReadMeWindowContent />
);

export default ReadMeElement;
