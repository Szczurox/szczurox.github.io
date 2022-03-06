export function calc(command: string, commandResponse?: HTMLElement | null) {
  let calculation: RegExpMatchArray | null = command
    .replace(/\s/g, "")
    .match(/\d+|[^0-9]/g);
  let result: number = 0;
  if (calculation) {
    for (var i = 0; i < calculation.length; i++) {
      if (i == 0) {
        if (calculation[0] == "-") {
          result = -parseInt(calculation[1]);
          calculation.shift();
        } else {
          result = parseInt(calculation[0]);
        }
      } else {
        if (!isNaN(+calculation[i])) {
          switch (calculation[i - 1]) {
            case "-":
              if (/([-+*/^%])/g.test(calculation[i - 2])) {
                calculation[i] = calculation[i - 1] + calculation[i];
                calculation.splice(i - 1, 1);
                i -= 2;
              } else {
                result -= parseInt(calculation[i]);
              }
              break;
            case "+":
              result += parseInt(calculation[i]);
              break;
            case "*":
              result *= parseInt(calculation[i]);
              break;
            case "/":
              result /= parseInt(calculation[i]);
              break;
            case "^":
              result = Math.pow(result, +calculation[i]);
              break;
            case "%":
              result %= parseInt(calculation[i]);
              break;
          }
        }
      }
    }
    if (commandResponse) {
      commandResponse.innerText = result.toString();
      document.getElementById("cmd")!.before(commandResponse);
    }
    return result;
  }
  return -1;
}
