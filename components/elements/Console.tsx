import React, { ChangeEvent, createRef, FormEvent, RefObject } from "react";
import { createDesktopElement } from "../utils/Element";
import styles from "../../styles/components/elements/Console.module.css";
import { UniversalContext } from "../utils/UniversalProvider";
import { commandCheck } from "./console-commands/Commands";
export interface ConsoleWindowProps {
  command?: string;
  id: string;
}

export interface ConsoleWindowStates {
  command: string;
  previousCommandPointer: number;
  previousCommands: [string, string[]][];
  fullscreen: boolean;
}

export class ConsoleWindowContent extends React.Component<
  ConsoleWindowProps,
  ConsoleWindowStates
> {
  static contextType = UniversalContext;
  context!: React.ContextType<typeof UniversalContext>;
  inputRef: RefObject<HTMLInputElement> = createRef();
  bottomRef: RefObject<HTMLDivElement> = createRef();

  constructor(props: ConsoleWindowProps) {
    super(props);
    this.state = {
      command: "",
      previousCommandPointer: 0,
      previousCommands: [],
      fullscreen: false,
    };
  }

  componentDidMount() {
    const value: any = this.context;
    if (value) this.setState(value);
    else this.context.updateChildState(this.state);
    this.setState({ fullscreen: this.context.fullscreen });
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  updateStates = (newState: { [key: string]: any }) => {
    this.context.updateChildState(newState);
    this.setState({ ...this.state, ...newState });
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.updateStates({
      command: event.target.value,
    });
  };

  submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Entire command + all results
    let commandFull: [string, string[]] = [this.state.command, []];
    // "|" splits command into few commands run one after another
    let commands: string[] = this.state.command.split("| ");
    // Iterates through all commands
    commands.forEach((command) => {
      // Get a result of a command
      let result: string = commandCheck(command);
      // If there is no result then the command was invalid
      if (!result) result = `"${command}" is not recognized as a command`;
      // Push the result into the results array
      commandFull[1].push(result);
    });
    this.updateStates({
      command: "",
      previousCommands: [...this.state.previousCommands, commandFull],
      previousCommandPointer: this.state.previousCommands.length,
    });
  };

  windowFocus = () => {
    this.inputRef.current!.focus();
  };

  scrollToBottom = () => {
    this.bottomRef.current?.scrollIntoView();
  };

  handleKeyboardEvents = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key == "ArrowUp") {
      if (this.state.previousCommandPointer >= 0) {
        this.updateStates({
          command:
            this.state.previousCommands[this.state.previousCommandPointer][0],
          previousCommandPointer: this.state.previousCommandPointer - 1,
        });
      }
    }
    if (event.key == "ArrowDown") {
      if (
        this.state.previousCommandPointer <
        this.state.previousCommands.length - 1
      ) {
        this.updateStates({
          command:
            this.state.previousCommands[
              this.state.previousCommandPointer + 1
            ][0],
          previousCommandPointer: this.state.previousCommandPointer + 1,
        });
      } else {
        this.updateStates({
          command: "",
        });
      }
    }
  };

  render() {
    return (
      <div
        onKeyDown={(e) => this.handleKeyboardEvents(e)}
        className={styles.console}
        style={
          this.state.fullscreen ? { margin: "none" } : { marginTop: "15px" }
        }
      >
        <div
          className={styles.cmd}
          onClick={this.windowFocus}
          style={this.state.fullscreen ? { maxHeight: "95vh" } : {}}
        >
          {this.state.previousCommands
            ? this.state.previousCommands!.map((command) => (
                <div className={styles.prev_command}>
                  <span
                    className={`${styles.unselectable} ${styles.input_pointer}`}
                  >
                    {"> "}
                  </span>
                  {command[0]}
                  <div>
                    {command[1].map((result) => {
                      if (result) return result + "\n";
                    })}
                  </div>
                </div>
              ))
            : null}
          <form
            onSubmit={(e) => {
              this.submitForm(e);
            }}
          >
            <span className={`${styles.unselectable} ${styles.input_pointer}`}>
              {">"}
            </span>
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
          <div ref={this.bottomRef} />
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
