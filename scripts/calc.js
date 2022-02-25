function calcM(num1, num2, operator, commandResponse) {
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    case "^":
      result = Math.pow(num1, num2);
      break;
    case "%":
      result = num1 % num2;
      break;
    default:
      result = "calc doesn't support this operator";
  }
  commandResponse.innerText = result;
  $("#cmd").before(commandResponse);
  return 0;
}

function calc2(command, commandResponse) {
  var num1, num2, operator;
  if (mathOperators.some((v) => command.includes(v))) {
    mathOperators.forEach((o) => {
      if (command.indexOf(o) != -1) {
        num1 = parseInt(command.substr(0, command.indexOf(o)));
        num2 = parseInt(command.substr(command.indexOf(o) + 1));
        operator = o;
      }
    });
    calcM(num1, num2, operator, commandResponse);
  } else {
    commandResponse.innerText =
      "an error occurred while calculating\npossible cause: not supported operator";
    $("#cmd").before(commandResponse);
  }
}

function calc(command, commandResponse) {
  num1 = parseInt(command[1]);
  num2 = parseInt(command[3]);
  operator = command[2];
  console.log(command, num1, num2, operator);
  if (mathOperators.includes(operator)) {
    calcM(num1, num2, operator, commandResponse);
  } else {
    commandResponse.innerText =
      "an error occurred while calculating\npossible cause: not supported operator";
    $("#cmd").before(commandResponse);
  }
}
