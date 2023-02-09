import React, { ChangeEvent, createRef, FormEvent, RefObject } from "react";
import { createDesktopElement } from "../utils/Element";
import styles from "../../styles/components/elements/Console.module.css";
import { UniversalContext } from "../utils/UniversalProvider";
import { commands } from "./console-commands/Commands";
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
  inputRef: RefObject<HTMLInputElement> = createRef();

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
    this.context.setChildState({ command: event.target.value });
    this.setState({ command: event.target.value });
  };

  submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    commands(this.state.command);
  };

  windowFocus = () => {
    this.inputRef.current!.focus();
  };

  render() {
    return (
      <div className={styles.console}>
        <p></p>
        <div className={styles.cmd} onClick={this.windowFocus}>
          <form
            onSubmit={(e) => {
              this.submitForm(e);
            }}
          >
            <span className={styles.unselectable}>{">"}</span>
            <input
              ref={this.inputRef}
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
