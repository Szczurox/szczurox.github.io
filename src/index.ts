import "./calc/calc.ts";
import { commands } from "./commands";
import "./constants.ts";

var lastCommand: string[] = [];
var lastCommandPointer = 0;

const form: HTMLFormElement = document.querySelector("form")!;

form.addEventListener(
  "submit",
  function (event: any) {
    event.preventDefault();
    submitForm();
  },
  false
);

function submitForm() {
  const formData = new FormData(form);
  form.reset();
  const command: string | undefined = formData.get("command")?.toString();
  if (command) {
    lastCommand.push(command);
    lastCommandPointer = lastCommand.length;
    var oldCommand = document.createElement("p");
    oldCommand.className = "oldcommand";
    oldCommand.innerHTML = `<span class="unselectable">> </span>${command}`;
    document.getElementById("cmd")!.before(oldCommand);
    commands(command);
  }
}

document.onkeydown = function (event) {
  var inputbox: HTMLInputElement | null = document.querySelector("input");
  if (inputbox) {
    inputbox.focus();
    if (event.key == "ArrowUp") {
      if (lastCommandPointer > 0) {
        lastCommandPointer -= 1;
        inputbox.value = lastCommand[lastCommandPointer];
      }
    }
    if (event.key == "ArrowDown") {
      if (lastCommandPointer < lastCommand.length - 1) {
        lastCommandPointer += 1;
        inputbox.value = lastCommand[lastCommandPointer];
      }
    }
  }
};

document.oncontextmenu = function (event) {
  if (event.shiftKey || event.ctrlKey) {
    return;
  }

  event.preventDefault();
  var inputbox: HTMLInputElement = document.querySelector("input")!;
  console.log(navigator.clipboard.readText());
  navigator.clipboard.readText().then((text) => {
    inputbox.value = inputbox.value + text;
  });
};
