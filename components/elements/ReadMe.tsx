import React from "react";
import { createDesktopElement } from "../utils/Element";

const ReadMeWindowContent: React.FC = () => {
  return (
    <div>
      <p style={{ padding: "10px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ipsum
        dolor, ultricies hendrerit dignissim in, pretium in orci. Mauris euismod
        lorem sit amet ipsum dapibus, vel euismod massa pulvinar. Vestibulum id
        ullamcorper nunc. Donec rhoncus ex mauris, ac consectetur felis
        hendrerit in. Vestibulum convallis finibus aliquet. Pellentesque rhoncus
        tortor eget neque commodo vehicula sed a velit. Suspendisse nec
        tristique libero. Sed malesuada dui vel sapien vestibulum vulputate.
        Nullam malesuada imperdiet nisi eget semper. Ut malesuada augue eu
        tristique laoreet. In metus metus, pulvinar vitae imperdiet quis,
        convallis quis sem.
      </p>
    </div>
  );
};

export const ReadMeElement = createDesktopElement(
  "README",
  "txt-file-icon.svg",
  <ReadMeWindowContent />
);

export default ReadMeElement;
