import React, { ChangeEvent, FormEvent } from "react";
import { createDesktopElement } from "../utils/Element";
import styles from "../../styles/components/elements/Console.module.css";
import { UniversalContext } from "../utils/UniversalProvider";

export interface ConsoleWindowProps {
  command?: string;
  id: string;
}

export interface ConsoleWindowStates {
  command: string;
}

export class ConsoleWindowContent extends React.Component<
  ConsoleWindowProps,
  ConsoleWindowStates
> {
  static contextType = UniversalContext;
  context!: React.ContextType<typeof UniversalContext>;

  constructor(props: ConsoleWindowProps) {
    super(props);
    this.state = {
      command: "",
    };
  }

  componentDidMount() {
    const value: any = this.context;
    if (value) this.setState(value);
    else this.context.setChildState(this.state);
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.setState({ command: event.target.value });
    this.context.setChildState(this.state);
    console.log(this.context);
  };

  submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(this.state.command);
  };

  render() {
    return (
      <div className={styles.console}>
        <p></p>
        <div className={styles.cmd}>
          <form
            onSubmit={(e) => {
              this.submitForm(e);
            }}
          >
            <span className={styles.unselectable}>{">"}</span>
            <input
              className={styles.console_input}
              type="text"
              name="command"
              value={this.state.command}
              autoFocus
              autoComplete="off"
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <input type="submit" hidden />
          </form>
        </div>
      </div>
    );
  }
}

export const CmdElement = createDesktopElement(
  "Console",
  "cmd-icon.svg",
  <ConsoleWindowContent id="1" />
);

export default CmdElement;
