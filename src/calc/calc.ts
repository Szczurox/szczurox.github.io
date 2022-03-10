import { lexer } from "./lexer";
import { Token } from "./token";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";

export function calc(command: string, commandResponse?: HTMLElement | null) {
  var tokens: Token[] | number = lexer(command, commandResponse);
  if (typeof tokens === "number") return -1;
  var mathTree = new Parser(tokens, commandResponse).parse();
  console.log(mathTree);
  var result = new Interpreter(commandResponse).visit(mathTree);
  console.log(result);
  if (commandResponse)
    if (commandResponse.innerText == "") {
      commandResponse.innerText = result;
      document.getElementById("cmd")!.before(commandResponse);
    }

  return result;
}
