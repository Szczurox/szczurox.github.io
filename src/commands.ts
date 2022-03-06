import { calc } from "./calc";

var lastCommand = [];
var lastCommandPointer = 0;
var variables: { [key: string]: string } = { "test": "123" };
const cmd: HTMLElement = document.getElementById("cmd")!;

function help(command: string[], commandResponse: HTMLElement) {
  var response: string;
  if (command.length == 1) {
    response = "List of commands:\n";
    commandList.forEach((e) => {
      response += e + "\n";
    });
  } else {
    response = commandsHelp[command[1]]!;
  }
  commandResponse.innerText = response;
  document.getElementById("cmd")!.before(commandResponse);
}

function echo(command: string, commandResponse: HTMLElement) {
  if (command.indexOf(" ") != -1)
    commandResponse.innerText = command.substr(command.indexOf(" "));
  else commandResponse.innerText = "you can't echo nothing";
  cmd.before(commandResponse);
}

function cls() {
  const cmd: HTMLElement | null = document.getElementById("cmd");
  const container: HTMLElement | null = document.querySelector(".container");
  if (cmd && container) {
    container.innerHTML = "";
    container.appendChild(cmd);
  }
}

function set(command: string[], commandResponse: HTMLElement) {
  var variable: string = command[3];
  if (
    ["+", "-", "*", "/", "%", "^"].some((v) => command.join("").includes(v))
  ) {
    console.log(command.slice(3, command.length).join(""));
    variable = calc(command.slice(3, command.length).join("")).toString();
  }
  variables[command[1]] = variable;
  commandResponse.innerText = `${command[1]} is set to ${variable}`;
  cmd.before(commandResponse);
}

export function commands(originalCommand: string) {
  var commandResponse: HTMLElement = document.createElement("p");
  var fixedCommand = originalCommand.replace(/\s\s+/g, " ");
  if (originalCommand.indexOf("%") != -1) {
    originalCommand.split("%").forEach((e) => {
      if (e.indexOf(" ") == -1 && e != "")
        fixedCommand = fixedCommand.split(`%${e}%`).join(variables[e]);
    });
  }
  commandResponse.className = "commandresp";
  const command: string[] = fixedCommand.split(" ");
  console.log(command, fixedCommand);
  switch (command[0].toLowerCase()) {
    case "help":
      help(command, commandResponse);
      break;
    case "set":
      set(command, commandResponse);
      break;
    case "echo":
      echo(fixedCommand, commandResponse);
      break;
    case "calc":
      calc(fixedCommand.substr(5), commandResponse);
      break;
    case "info":
      commandResponse.innerHTML = info;
      cmd.before(commandResponse);
      break;
    case "cls":
      cls();
      break;
    case "amogus":
      commandResponse.innerText = amogus;
      cmd.before(commandResponse);
      break;
    case "dupa123":
      commandResponse.innerText = "dupa\ndupa\ndupa\npieprzyć";
      cmd.before(commandResponse);
      break;
    case "example":
      commandResponse.innerHTML =
        "<a href='https://example.com/' target=_blank>example</a>";
      cmd.before(commandResponse);
      break;
    default:
      commandResponse.innerText =
        `"${command[0]}"` + " is not recognized as a command";
      cmd.before(commandResponse);
  }
  window.scrollTo(0, document.body.scrollHeight);
}
