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
  consoleElements: [string, boolean][]; // line in console, isCommand
  commandsCache: string[];
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
      consoleElements: [],
      commandsCache: [],
      fullscreen: false,
    };
  }

  componentDidMount() {
    const value: any = this.context;
    if (value) this.setState(value);
    else this.context.updateChildState(this.state);
    this.setState({
      fullscreen: value.fullscreen,
    });
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  // Updates both local state and child state
  updateStates = (newState: { [key: string]: any }) => {
    this.context.updateChildState(newState);
    this.setState({ ...this.state, ...newState });
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.updateStates({
      command: event.target.value,
    });
  };

  submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Entire command + all results
    let commandFull: [string | number, boolean][] = [
      [this.state.command, true],
    ];

    if (this.state.command) {
      // "&&" splits command into few commands run one after another
      let commands: string[] = this.state.command.split("&& ");
      // Iterate through all the commands
      commands.forEach((command) => {
        // Get a result of a command
        let result = commandCheck(command);
        // Push the result into the results array
        commandFull.push([result, false]);
      });

      // Stores console codes that the command sends
      let consoleCodes: number[] = [];

      // Traverse command results looking for the console codes
      for (var i = 0; i < commandFull.length; i++) {
        // 2 - clear screen
        if (commandFull[i][0] == 2) {
          // Add console code intro console codes array if it was not added yet
          if (consoleCodes.indexOf(2) == -1) consoleCodes.push(2);
          // Remove all commands and results previous to the CLS so that they don't render
          commandFull = commandFull.slice(i + 1);
        }
      }

      // If there was a console code 2 (clear screen) overwrite all previous console elements
      if (consoleCodes.indexOf(2) != -1)
        this.updateStates({
          command: "",
          consoleElements: [...commandFull],
          commandsCache: [...this.state.commandsCache, this.state.command],
          previousCommandPointer: this.state.commandsCache.length,
        });
      else
        this.updateStates({
          command: "",
          consoleElements: [
            ...this.state.consoleElements,
            ...commandFull,
            [" ", false],
          ],
          commandsCache: [...this.state.commandsCache, this.state.command],
          previousCommandPointer: this.state.commandsCache.length,
        });
    } else
      this.updateStates({
        consoleElements: [...this.state.consoleElements, ["", true]],
      });
  };

  windowFocus = () => {
    this.inputRef.current!.focus();
  };

  scrollToBottom = () => {
    this.bottomRef.current?.scrollIntoView();
  };

  handleKeyboardEvents = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Switch between previous and next commands
    // Previous
    if (event.key == "ArrowUp") {
      // Checks if the current command pointer is not out of bounds
      if (this.state.previousCommandPointer >= 0) {
        this.updateStates({
          command: this.state.commandsCache[this.state.previousCommandPointer],
          previousCommandPointer: this.state.previousCommandPointer - 1,
        });
      }
    }
    // Next
    if (event.key == "ArrowDown") {
      // Checks if the current command pointer is not out of bounds
      if (
        this.state.previousCommandPointer <
        this.state.commandsCache.length - 1
      ) {
        this.updateStates({
          command:
            this.state.commandsCache[this.state.previousCommandPointer + 1][0],
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
          this.state.fullscreen ? { margin: "none" } : { marginTop: "none" }
        }
      >
        <div
          className={styles.cmd}
          onClick={this.windowFocus}
          style={
            this.state.fullscreen
              ? { maxHeight: "95vh" }
              : {
                  maxHeight: this.context.windowedHeight
                    ? this.context.windowedHeight - 5
                    : "275px",
                }
          }
        >
          {this.state.consoleElements
            ? this.state.consoleElements!.map((element) => (
                <div key={1}>
                  {element[1] ? (
                    <div className={styles.prev_command}>
                      <span
                        className={`${styles.unselectable} ${styles.input_pointer}`}
                      >
                        {"> "}
                      </span>
                      {element[0]}
                    </div>
                  ) : (
                    <div className={styles.prev_command}>{element[0]}</div>
                  )}
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
                this.handleInputChange(e);
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
  "/cmd-icon.svg",
  <ConsoleWindowContent id="1" />
);

export default CmdElement;
