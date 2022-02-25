var lastCommand = [];
var lastCommandPointer = 0;

$("#command").on("submit", function (event) {
  event.preventDefault();
  submitForm(this);
});

function submitForm(myForm) {
  const formData = new FormData(myForm);
  myForm.reset();
  const command = formData.get("command");
  lastCommand.push(command);
  lastCommandPointer = lastCommand.length;
  var oldCommand = document.createElement("p");
  oldCommand.className = "oldcommand";
  oldCommand.innerHTML = `<span class="unselectable">> </span>${command}`;
  $("#cmd").before(oldCommand);
  commands(command);
}

document.onkeydown = function (event) {
  var inputbox = document.querySelector("input");
  inputbox.focus();
  if (event.keyCode == 38) {
    if (lastCommandPointer > 0) {
      lastCommandPointer -= 1;
      inputbox.value = lastCommand[lastCommandPointer];
    }
  }
  if (event.keyCode == 40) {
    if (lastCommandPointer < lastCommand.length - 1) {
      lastCommandPointer += 1;
      inputbox.value = lastCommand[lastCommandPointer];
    }
  }
};
