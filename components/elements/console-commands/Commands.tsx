import { calc } from "./calc/Calc";

const echo = (command: string) => {
  return command.substring(command.indexOf(" ") + 1);
};

// Map with all the commands
// Function  - function that interprets a command
// string[0] - command info
// string[1] - command usage
const commandsMap: Map<string, [Function, string[]]> = new Map([
  [
    "echo",
    [
      (command: string) => {
        return echo(command);
      },
      ["displays message", "echo (message)"],
    ],
  ],
  [
    "calc",
    [
      (command: string) => {
        return calc(command.substring(command.indexOf(" ")));
      },
      [
        `performs basic mathematical operations: +, -, *, /, ^
      supports order of operations, parentheses and rational numbers`,
        "calc (numbers; oprations; paretheses)",
      ],
    ],
  ],
]);

// Handle commands
export const commands = (command: string) => {
  // "||" splits command into few commands run one after another
  let commands: string[] = command.split("|| ");
  commands.forEach((command) => {
    // Get command's name (without arguments)
    let commandName = command.substring(0, command.indexOf(" ")).toLowerCase();
    // Check if command exists
    if (commandsMap.has(commandName)) {
      // If command exists get it from the commandsMap
      const commandFunction = commandsMap.get(commandName);
      // Run function that interprets the command and get any returned data
      let result = commandFunction?.[0](command);
      console.log(result);
    }
  });
};
