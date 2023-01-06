import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import { createDesktopElement } from "../utils/Element";
import styles from "../../styles/components/elements/Console.module.css";

const ConsoleWindowContent: React.FC = () => {
  const [command, setCommand] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCommand(event.target.value);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(command);
  };

  return (
    <div className={styles.console}>
      <p></p>
      <div className={styles.cmd}>
        <form
          onSubmit={(e) => {
            submitForm(e);
          }}
        >
          <span className={styles.unselectable}>{">"}</span>
          <input
            className={styles.console_input}
            type="text"
            name="command"
            value={command}
            autoFocus
            autoComplete="off"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input type="submit" hidden />
        </form>
      </div>
    </div>
  );
};

export const CmdElement = createDesktopElement(
  "Console",
  "cmd-icon.svg",
  <ConsoleWindowContent />
);

export default CmdElement;
