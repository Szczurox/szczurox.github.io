import { calc } from "./calc/Calc";

export class CommandResult {
  result: any = null;
  error: string = "";
  constructor(result?: any, error: string = "") {
    this.result = result;
    this.error = error;
  }
}

const echo = (command: string) => {
  if (command.indexOf(" ") == -1)
    return new CommandResult("", "You can't echo an empty string");
  return new CommandResult(command.substring(command.indexOf(" ") + 1));
};

const help = (command: string) => {
  if (command.indexOf(" ") == -1) {
    let commandsWithInfo: string[] = [];
    commandsMap.forEach((value: [Function, string[]], commandName: string) => {
      commandsWithInfo.push(commandName + " - " + value[1][0]);
    });
    return new CommandResult(commandsWithInfo.join("\n"));
  } else {
    const commandToFind = command.substring(command.indexOf(" ") + 1);
    const commandInfo = commandsMap.get(commandToFind);
    if (commandInfo)
      return new CommandResult(
        `${commandInfo[1][0]} \n\n  ${commandInfo[1][1]}`
      );
    else
      return new CommandResult(
        "",
        `Can't find information about a command "${commandToFind}"`
      );
  }
};

// Map with all the commands
// Function  - function that interprets a command
// string[0] - command info
// string[1] - command usage
const commandsMap: Map<string, [Function, string[]]> = new Map([
  [
    "help",
    [
      (command: string) => {
        return help(command);
      },
      [
        "Displays a list of commands or information about a specific command",
        "help [opt:](command name)",
      ],
    ],
  ],
  [
    "cls",
    [
      (_: string) => {
        return new CommandResult(2);
      },
      ["Clears the terminal", "cls"],
    ],
  ],
  [
    "echo",
    [
      (command: string) => {
        return echo(command);
      },
      ["Displays a message", "echo (message)"],
    ],
  ],
  [
    "calc",
    [
      (command: string) => {
        return calc(command.substring(command.indexOf(" ")));
      },
      [
        "Performs basic mathematical operations: +, -, *, /, ^, ( )",
        "calc {numbers; operations}",
      ],
    ],
  ],
]);

// Handle command
export const commandCheck = (command: string) => {
  if (!command) return "";
  // Get command's name (without arguments)
  let commandName = command.substring(0, command.indexOf(" ")).toLowerCase();
  if (commandName == "") commandName = command;
  commandName = commandName.replace(" ", "");
  console.log(commandName);
  // Check if command exists
  if (commandsMap.has(commandName)) {
    // If command exists get it from the commandsMap
    const commandFunction = commandsMap.get(commandName);
    // Run function that interprets the command and get any returned data
    let result: CommandResult = commandFunction?.[0](command);
    // Send result or error if it occured
    if (result.error) return "ERROR (" + commandName + "): " + result.error;
    else return result.result;
  } else return `"${command}" is not recognized as a command`; // If there is no result then the command was invalid
};
