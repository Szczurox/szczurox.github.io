var lastCommand = [];
var lastCommandPointer = 0;

function help(commandResponse) {
  var response = "List of commands:\n";
  commandList.forEach((e) => {
    response += e + "\n";
  });
  commandResponse.innerText = response;
  commandResponse.className = "commandresp";
  $("#cmd").before(commandResponse);
}

function echo(command, commandResponse) {
  if (command.indexOf(" ") != -1)
    commandResponse.innerText = command.substr(command.indexOf(" "));
  else commandResponse.innerText = "you can't echo nothing";
  $("#cmd").before(commandResponse);
}

function cls() {
  const cmd = document.getElementById("cmd");
  const container = document.querySelector(".container");
  container.innerHTML = "";
  container.appendChild(cmd);
}

function commands(originalCommand) {
  var commandResponse = document.createElement("p");
  commandResponse.className = "commandresp";
  command = originalCommand.replace(/\s\s+/g, " ");
  command = command.split(" ");
  console.log(command);
  switch (command[0].toLowerCase()) {
    case "help":
      help(commandResponse);
      break;
    case "echo":
      echo(originalCommand, commandResponse);
      break;
    case "calc":
      if (command.length == 4) calc(command, commandResponse);
      else calc2(originalCommand.substr(5), commandResponse);
      break;
    case "info":
      commandResponse.innerText = "created by Szczurox";
      $("#cmd").before(commandResponse);
      break;
    case "cls":
      cls();
      break;
    default:
      commandResponse.innerText =
        `"${command[0]}"` + " is not recognized as a command";
      $("#cmd").before(commandResponse);
  }
  window.scrollTo(0, document.body.scrollHeight);
}
