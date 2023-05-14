import React from "react";
import { createDesktopElement } from "../utils/Element";

export class FaicampContent extends React.Component {
  componentDidMount(): void {
    window.open("https://faicamp.vercel.app", "_blank");
  }

  render() {
    return (
      <div style={{ padding: "10px" }}>
        You got redirected to{" "}
        <a
          href={"https://faicamp.vercel.app"}
          style={{ color: "white", textDecoration: "underline" }}
        >
          Faicamp.
        </a>
      </div>
    );
  }
}

export const FaicampElement = createDesktopElement({
  fileName: "Faicamp",
  iconPath: "/world-wide-web.svg",
  children: <FaicampContent />,
});

export default FaicampElement;
